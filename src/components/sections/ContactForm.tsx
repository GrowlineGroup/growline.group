'use client';

import { useState } from 'react';

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

export function ContactForm({
  form,
  contactEmail,
  responseTime,
  alternativeHeadline,
  availabilityLabel,
  availabilityBody,
}: Props) {
  const [selectedTags, setSelectedTags] = useState<(keyof Tags)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleTag(tag: keyof Tags) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-emerald-600">{form.successHeadline}</span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{form.successBody}</p>
      </div>
    );
  }

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
          {(Object.keys(form.tags) as (keyof Tags)[]).map((tag) => (
            <button
              key={tag}
              type="button"
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

      {/* GMC-specific fields */}
      {selectedTags.includes('gmc') && (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="merchantId" className="text-sm font-medium text-zinc-700">
              {form.merchantIdLabel}
            </label>
            <input
              id="merchantId"
              name="merchantId"
              type="text"
              placeholder={form.merchantIdPlaceholder}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="domain" className="text-sm font-medium text-zinc-700">
              {form.domainLabel}
            </label>
            <input
              id="domain"
              name="domain"
              type="text"
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
              placeholder={form.collaboratorCodePlaceholder}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* CSS / Web Dev-specific fields */}
      {(selectedTags.includes('css') || selectedTags.includes('webDev')) && (
        <div className="flex flex-col gap-2">
          <label htmlFor="websiteUrl" className="text-sm font-medium text-zinc-700">
            {form.websiteUrlLabel}
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
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
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-emerald-500 focus:ring-emerald-500"
        />
        <label htmlFor="gdpr" className="text-xs leading-relaxed text-zinc-500">
          {form.gdpr}
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
      >
        {form.submit}
      </button>
    </form>
  );
}
