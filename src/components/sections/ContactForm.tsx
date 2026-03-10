'use client';

import { useState } from 'react';
import type { ContactPayload, ContactTag } from '@/app/api/contact/route';

type Tags = {
  css: string;
  gmc: string;
  webDev: string;
  geo: string;
};

type FormTranslations = {
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  whatsapp: string;
  whatsappPlaceholder: string;
  tagLabel: string;
  tagHint: string;
  tags: Tags;
  // CSS
  cssMerchantIdLabel: string;
  cssMerchantIdPlaceholder: string;
  cssMerchantIdError: string;
  // GMC
  collaboratorCodeLabel: string;
  collaboratorCodePlaceholder: string;
  collaboratorCodeError: string;
  // Shared URL
  siteUrlLabelRequired: string;
  siteUrlLabelOptional: string;
  siteUrlPlaceholder: string;
  // GEO
  geoServiceLabel: string;
  geoServicePlaceholder: string;
  geoCityLabel: string;
  geoCityPlaceholder: string;
  // Common
  message: string;
  messagePlaceholder: string;
  gdpr: string;
  submit: string;
  successHeadline: string;
  successBody: string;
  // Validation
  fieldRequired: string;
  emailFormatError: string;
  gdprError: string;
};

interface Props {
  form: FormTranslations;
  contactEmail: string;
  responseTime: string;
  alternativeHeadline: string;
  availabilityLabel: string;
  availabilityBody: string;
}

const inputBase =
  'w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-colors';
const inputClass = `${inputBase} border-zinc-100 focus:border-emerald-500 focus:ring-emerald-500/20`;
const inputErrorClass = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-400/20`;

// URL-needing tags — drives the shared siteUrl field
const URL_TAGS: ContactTag[] = ['gmc', 'webDev', 'geo'];

// Fields to clear (errors) when a tag is deselected
const TAG_FIELDS: Record<ContactTag, string[]> = {
  css: ['cssMerchantId'],
  gmc: ['collaboratorCode'],
  webDev: [],
  geo: ['geoService', 'geoCity'],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ form }: Props) {
  const [selectedTags, setSelectedTags] = useState<ContactTag[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function toggleTag(tag: ContactTag) {
    setSelectedTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      setFieldErrors((errors) => {
        const updated = { ...errors };
        for (const field of TAG_FIELDS[tag]) delete updated[field];
        // Clear siteUrl error if no URL-needing tag remains
        if (!next.some((t) => URL_TAGS.includes(t))) delete updated.siteUrl;
        return updated;
      });
      return next;
    });
  }

  function clearError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  // Derived URL field state
  const showSiteUrl = selectedTags.some((t) => URL_TAGS.includes(t));
  const siteUrlRequired = selectedTags.includes('gmc') || selectedTags.includes('geo');
  const siteUrlLabel = siteUrlRequired ? form.siteUrlLabelRequired : form.siteUrlLabelOptional;

  function validateForm(fd: FormData): Record<string, string> {
    const errors: Record<string, string> = {};
    const get = (key: string) => ((fd.get(key) as string) ?? '').trim();

    // Base fields
    if (!get('name')) errors.name = form.fieldRequired;

    const email = get('email');
    if (!email) errors.email = form.fieldRequired;
    else if (!EMAIL_RE.test(email)) errors.email = form.emailFormatError;

    if (!get('message')) errors.message = form.fieldRequired;
    if (fd.get('gdpr') !== 'on') errors.gdpr = form.gdprError;

    // CSS: Merchant Center ID required, exactly 10 digits
    if (selectedTags.includes('css')) {
      const val = get('cssMerchantId');
      if (!val) errors.cssMerchantId = form.fieldRequired;
      else if (!/^[0-9]{10}$/.test(val)) errors.cssMerchantId = form.cssMerchantIdError;
    }

    // GMC: Collaborator Code required, exactly 4 digits
    if (selectedTags.includes('gmc')) {
      const code = get('collaboratorCode');
      if (!code) errors.collaboratorCode = form.fieldRequired;
      else if (!/^[0-9]{4}$/.test(code)) errors.collaboratorCode = form.collaboratorCodeError;
    }

    // Shared URL: required if GMC or GEO selected
    if (showSiteUrl && siteUrlRequired && !get('siteUrl')) {
      errors.siteUrl = form.fieldRequired;
    }

    // GEO: Branche + Zielregion required
    if (selectedTags.includes('geo')) {
      if (!get('geoService')) errors.geoService = form.fieldRequired;
      if (!get('geoCity')) errors.geoCity = form.fieldRequired;
    }

    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const errors = validateForm(fd);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus('loading');

    const get = (key: string) => (fd.get(key) as string | null) ?? '';

    const payload: ContactPayload = {
      name: get('name'),
      company: get('company') || undefined,
      email: get('email'),
      whatsapp: get('whatsapp') || undefined,
      tags: selectedTags,
      cssMerchantId: get('cssMerchantId') || undefined,
      collaboratorCode: get('collaboratorCode') || undefined,
      siteUrl: get('siteUrl') || undefined,
      geoService: get('geoService') || undefined,
      geoCity: get('geoCity') || undefined,
      message: get('message'),
      gdpr: fd.get('gdpr') === 'on',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Submission failed');
      }
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700">{form.successHeadline}</span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{form.successBody}</p>
      </div>
    );
  }

  const isLoading = status === 'loading';
  const cls = (field: string) => (fieldErrors[field] ? inputErrorClass : inputClass);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700">
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          disabled={isLoading}
          placeholder={form.namePlaceholder}
          className={cls('name')}
          onChange={() => clearError('name')}
        />
        {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-sm font-medium text-zinc-700">
          {form.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          disabled={isLoading}
          placeholder={form.companyPlaceholder}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          {form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          disabled={isLoading}
          placeholder={form.emailPlaceholder}
          className={cls('email')}
          onChange={() => clearError('email')}
        />
        {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col gap-2">
        <label htmlFor="whatsapp" className="text-sm font-medium text-zinc-700">
          {form.whatsapp}
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          disabled={isLoading}
          placeholder={form.whatsappPlaceholder}
          className={inputClass}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium text-zinc-700">{form.tagLabel}</p>
          <p className="text-xs text-zinc-400">{form.tagHint}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(form.tags) as ContactTag[]).map((tag) => (
            <button
              key={tag}
              type="button"
              disabled={isLoading}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
              }`}
            >
              {form.tags[tag]}
            </button>
          ))}
        </div>
      </div>

      {/* CSS: Merchant Center ID — required, exactly 10 digits */}
      {selectedTags.includes('css') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="cssMerchantId" className="text-sm font-medium text-zinc-700">
            {form.cssMerchantIdLabel}
            <span className="ml-1 text-red-400" aria-hidden>*</span>
          </label>
          <input
            id="cssMerchantId"
            name="cssMerchantId"
            type="text"
            inputMode="numeric"
            maxLength={10}
            disabled={isLoading}
            placeholder={form.cssMerchantIdPlaceholder}
            className={cls('cssMerchantId')}
            onChange={() => clearError('cssMerchantId')}
          />
          {fieldErrors.cssMerchantId && (
            <p className="text-xs text-red-500">{fieldErrors.cssMerchantId}</p>
          )}
        </div>
      )}

      {/* Shared URL field — shown when any of GMC / WebDev / GEO is selected */}
      {showSiteUrl && (
        <div className="flex flex-col gap-2">
          <label htmlFor="siteUrl" className="text-sm font-medium text-zinc-700">
            {siteUrlLabel}
            {siteUrlRequired && <span className="ml-1 text-red-400" aria-hidden>*</span>}
          </label>
          <input
            id="siteUrl"
            name="siteUrl"
            type="url"
            disabled={isLoading}
            placeholder={form.siteUrlPlaceholder}
            className={cls('siteUrl')}
            onChange={() => clearError('siteUrl')}
          />
          {fieldErrors.siteUrl && (
            <p className="text-xs text-red-500">{fieldErrors.siteUrl}</p>
          )}
        </div>
      )}

      {/* GMC: Shopify Collaborator Code — required, exactly 4 digits */}
      {selectedTags.includes('gmc') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="collaboratorCode" className="text-sm font-medium text-zinc-700">
            {form.collaboratorCodeLabel}
            <span className="ml-1 text-red-400" aria-hidden>*</span>
          </label>
          <input
            id="collaboratorCode"
            name="collaboratorCode"
            type="text"
            inputMode="numeric"
            maxLength={4}
            disabled={isLoading}
            placeholder={form.collaboratorCodePlaceholder}
            className={cls('collaboratorCode')}
            onChange={() => clearError('collaboratorCode')}
          />
          {fieldErrors.collaboratorCode && (
            <p className="text-xs text-red-500">{fieldErrors.collaboratorCode}</p>
          )}
        </div>
      )}

      {/* GEO: Branche + Zielregion — required */}
      {selectedTags.includes('geo') && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="geoService" className="text-sm font-medium text-zinc-700">
              {form.geoServiceLabel}
              <span className="ml-1 text-red-400" aria-hidden>*</span>
            </label>
            <input
              id="geoService"
              name="geoService"
              type="text"
              disabled={isLoading}
              placeholder={form.geoServicePlaceholder}
              className={cls('geoService')}
              onChange={() => clearError('geoService')}
            />
            {fieldErrors.geoService && (
              <p className="text-xs text-red-500">{fieldErrors.geoService}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="geoCity" className="text-sm font-medium text-zinc-700">
              {form.geoCityLabel}
              <span className="ml-1 text-red-400" aria-hidden>*</span>
            </label>
            <input
              id="geoCity"
              name="geoCity"
              type="text"
              disabled={isLoading}
              placeholder={form.geoCityPlaceholder}
              className={cls('geoCity')}
              onChange={() => clearError('geoCity')}
            />
            {fieldErrors.geoCity && (
              <p className="text-xs text-red-500">{fieldErrors.geoCity}</p>
            )}
          </div>
        </>
      )}

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-700">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={isLoading}
          placeholder={form.messagePlaceholder}
          className={`w-full resize-none rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-colors ${
            fieldErrors.message
              ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
              : 'border-zinc-100 focus:border-emerald-500 focus:ring-emerald-500/20'
          }`}
          onChange={() => clearError('message')}
        />
        {fieldErrors.message && <p className="text-xs text-red-500">{fieldErrors.message}</p>}
      </div>

      {/* GDPR */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            id="gdpr"
            name="gdpr"
            type="checkbox"
            disabled={isLoading}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-emerald-500 focus:ring-emerald-500"
            onChange={() => clearError('gdpr')}
          />
          <label htmlFor="gdpr" className="text-xs leading-relaxed text-zinc-500">
            {form.gdpr}
          </label>
        </div>
        {fieldErrors.gdpr && <p className="text-xs text-red-500">{fieldErrors.gdpr}</p>}
      </div>

      {/* API-level error */}
      {status === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {form.submit}
      </button>
    </form>
  );
}
