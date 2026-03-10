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
  cssMerchantIdLabel: string;
  cssMerchantIdPlaceholder: string;
  cssMerchantIdError: string;
  merchantIdLabel: string;
  merchantIdPlaceholder: string;
  domainLabel: string;
  domainPlaceholder: string;
  collaboratorCodeLabel: string;
  collaboratorCodePlaceholder: string;
  websiteUrlLabel: string;
  websiteUrlPlaceholder: string;
  geoUrlLabel: string;
  geoUrlPlaceholder: string;
  geoServiceLabel: string;
  geoServicePlaceholder: string;
  geoCityLabel: string;
  geoCityPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  gdpr: string;
  submit: string;
  successHeadline: string;
  successBody: string;
};

interface Props {
  form: FormTranslations;
  contactEmail: string;
  responseTime: string;
  alternativeHeadline: string;
  availabilityLabel: string;
  availabilityBody: string;
}

const inputClass =
  'w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ form }: Props) {
  const [selectedTags, setSelectedTags] = useState<ContactTag[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function toggleTag(tag: ContactTag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const get = (key: string) => (fd.get(key) as string | null) ?? '';

    const payload: ContactPayload = {
      name: get('name'),
      company: get('company') || undefined,
      email: get('email'),
      whatsapp: get('whatsapp') || undefined,
      tags: selectedTags,
      cssMerchantId: get('cssMerchantId') || undefined,
      merchantId: get('merchantId') || undefined,
      domain: get('domain') || undefined,
      collaboratorCode: get('collaboratorCode') || undefined,
      websiteUrl: get('websiteUrl') || undefined,
      geoUrl: get('geoUrl') || undefined,
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700">
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={isLoading}
          placeholder={form.namePlaceholder}
          className={inputClass}
        />
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
          required
          disabled={isLoading}
          placeholder={form.emailPlaceholder}
          className={inputClass}
        />
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

      {/* CSS-specific: Merchant Center ID (10 digits) */}
      {selectedTags.includes('css') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="cssMerchantId" className="text-sm font-medium text-zinc-700">
            {form.cssMerchantIdLabel}
          </label>
          <input
            id="cssMerchantId"
            name="cssMerchantId"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            disabled={isLoading}
            placeholder={form.cssMerchantIdPlaceholder}
            title={form.cssMerchantIdError}
            className={inputClass}
          />
        </div>
      )}

      {/* GMC-specific: Domain + Collaborator Code */}
      {selectedTags.includes('gmc') && (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="domain" className="text-sm font-medium text-zinc-700">
              {form.domainLabel}
            </label>
            <input
              id="domain"
              name="domain"
              type="text"
              disabled={isLoading}
              placeholder={form.domainPlaceholder}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="collaboratorCode" className="text-sm font-medium text-zinc-700">
              {form.collaboratorCodeLabel}
            </label>
            <input
              id="collaboratorCode"
              name="collaboratorCode"
              type="text"
              disabled={isLoading}
              placeholder={form.collaboratorCodePlaceholder}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Web Dev-specific: Website URL */}
      {selectedTags.includes('webDev') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="websiteUrl" className="text-sm font-medium text-zinc-700">
            {form.websiteUrlLabel}
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            disabled={isLoading}
            placeholder={form.websiteUrlPlaceholder}
            className={inputClass}
          />
        </div>
      )}

      {/* GEO-specific fields */}
      {selectedTags.includes('geo') && (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="geoUrl" className="text-sm font-medium text-zinc-700">
              {form.geoUrlLabel}
            </label>
            <input
              id="geoUrl"
              name="geoUrl"
              type="url"
              disabled={isLoading}
              placeholder={form.geoUrlPlaceholder}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="geoService" className="text-sm font-medium text-zinc-700">
              {form.geoServiceLabel}
            </label>
            <input
              id="geoService"
              name="geoService"
              type="text"
              disabled={isLoading}
              placeholder={form.geoServicePlaceholder}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="geoCity" className="text-sm font-medium text-zinc-700">
              {form.geoCityLabel}
            </label>
            <input
              id="geoCity"
              name="geoCity"
              type="text"
              disabled={isLoading}
              placeholder={form.geoCityPlaceholder}
              className={inputClass}
            />
          </div>
        </div>
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
          required
          disabled={isLoading}
          placeholder={form.messagePlaceholder}
          className="w-full resize-none rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
        />
      </div>

      {/* GDPR */}
      <div className="flex items-start gap-3">
        <input
          id="gdpr"
          name="gdpr"
          type="checkbox"
          required
          disabled={isLoading}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-emerald-500 focus:ring-emerald-500"
        />
        <label htmlFor="gdpr" className="text-xs leading-relaxed text-zinc-500">
          {form.gdpr}
        </label>
      </div>

      {/* Error */}
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
