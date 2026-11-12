/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, ServiceId } from '../data/eluxData';
import { EstimatedScopePayload } from './ScopeEstimator';

interface ContactSectionProps {
  preselectedService: ServiceId | null;
  attachedScope: EstimatedScopePayload | null;
  attachedNote: string | null;
  onClearAttached: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  service: ServiceId;
  notes: string;
}

const SERVICE_OPTIONS: { value: ServiceId; label: string }[] = [
  { value: 'kitchens', label: 'Kitchen Renovation / Butler’s Pantry' },
  { value: 'bathrooms', label: 'Bathroom & Ensuite Remodel' },
  { value: 'laundries', label: 'Laundry & Mudroom Renovation' },
  { value: 'joinery', label: 'Custom Joinery / Multi-Room' },
];

export function ContactSection({
  preselectedService,
  attachedScope,
  attachedNote,
  onClearAttached,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    suburb: '',
    service: 'kitchens',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
      setSubmitted(false);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (attachedNote) {
      setForm((prev) => ({
        ...prev,
        notes: attachedNote,
      }));
      setSubmitted(false);
    }
  }, [attachedNote]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = form.phone.replace(/[\s()-]/g, '');
    if (!/^(\+?61|0)[2-9]\d{8}$/.test(cleanPhone) && cleanPhone.length < 8) {
      nextErrors.phone = 'Enter a valid Australian phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (form.suburb.trim().length < 2) {
      nextErrors.suburb = 'Please specify your Sydney suburb.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    onClearAttached();
    setForm({
      fullName: '',
      phone: '',
      email: '',
      suburb: '',
      service: 'kitchens',
      notes: '',
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF9F7] border-t border-[#E5E2DC]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Studio Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C5F35] mb-3">
                Book an On-Site Measure
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] leading-[1.1] mb-4">
                Start Your Sydney Renovation Brief
              </h2>
              <p className="text-[15px] leading-relaxed text-[#57544E]">
                Speak directly with our project team—not an automated call centre. Visit our Ingleburn studio by appointment or book an obligation-free site measure across Greater Sydney.
              </p>
            </div>

            <div className="border-t border-[#E5E2DC] pt-6 space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#7C5F35] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#141413]">Ingleburn Office & Workshop</p>
                  <p className="text-[#57544E]">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#7C5F35] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#141413]">Direct Line</p>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="text-[#57544E] hover:text-[#7C5F35] transition-colors tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#7C5F35] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#141413]">Project Enquiries</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[#57544E] hover:text-[#7C5F35] transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#7C5F35] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#141413]">Studio & Site Hours</p>
                  <p className="text-[#57544E]">{BUSINESS_INFO.hours}</p>
                  <p className="text-xs text-[#57544E] mt-0.5">
                    {BUSINESS_INFO.saturdayNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F2F0EC] border border-[#E5E2DC] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7C5F35] mb-2">
                Service Coverage
              </p>
              <p className="text-xs leading-relaxed text-[#57544E]">
                {BUSINESS_INFO.serviceRegions.join(' · ')}
              </p>
            </div>
          </div>

          {/* Right Validated Form */}
          <div className="lg:col-span-7 bg-[#F2F0EC] border border-[#E5E2DC] p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 text-left space-y-5">
                <div className="inline-flex items-center gap-2 text-[#2E5E42] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Consultation Request Logged</span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-[#141413]">
                  Thank you, {form.fullName}.
                </h3>
                <p className="text-[15px] leading-relaxed text-[#57544E] max-w-xl">
                  We have prepared your consultation brief for{' '}
                  <strong className="font-semibold text-[#141413]">
                    {SERVICE_OPTIONS.find((s) => s.value === form.service)?.label}
                  </strong>{' '}
                  in <strong className="font-semibold text-[#141413]">{form.suburb}</strong>. Our project coordinator will contact you on{' '}
                  <span className="tabular-nums font-medium text-[#141413]">{form.phone}</span>{' '}
                  within one business day to schedule your site measure.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                      `Renovation Consultation - ${form.suburb} (${form.fullName})`,
                    )}&body=${encodeURIComponent(
                      `Name: ${form.fullName}\nPhone: ${form.phone}\nSuburb: ${form.suburb}\nService: ${form.service}\n\nNotes:\n${form.notes}`,
                    )}`}
                    className="px-5 py-3 text-sm font-medium bg-[#141413] text-[#FAF9F7] hover:bg-[#7C5F35] transition-colors"
                  >
                    Send Copy via Email App
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3 text-sm font-medium border border-[#E5E2DC] bg-[#FAF9F7] text-[#141413] hover:border-[#141413] transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {attachedScope && (
                  <div className="bg-[#FAF9F7] border border-[#7C5F35]/40 p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#7C5F35]">
                        Attached Estimator Scope
                      </p>
                      <p className="text-sm font-medium text-[#141413] mt-1 tabular-nums">
                        {attachedScope.roomLabel} · {attachedScope.tierLabel} · $
                        {attachedScope.minBudget.toLocaleString('en-AU')}–$
                        {attachedScope.maxBudget.toLocaleString('en-AU')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearAttached}
                      className="text-xs text-[#57544E] hover:text-[#141413] underline shrink-0 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Sarah Mitchell"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] placeholder:text-[#8E8980] focus:outline-none focus:border-[#7C5F35]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-[#9E2A2B]">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 0420 871 372"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] placeholder:text-[#8E8980] focus:outline-none focus:border-[#7C5F35] tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#9E2A2B]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com.au"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] placeholder:text-[#8E8980] focus:outline-none focus:border-[#7C5F35]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-[#9E2A2B]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="suburb"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                    >
                      Sydney Suburb *
                    </label>
                    <input
                      id="suburb"
                      type="text"
                      value={form.suburb}
                      onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                      placeholder="e.g. Camden South, Oran Park"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] placeholder:text-[#8E8980] focus:outline-none focus:border-[#7C5F35]"
                    />
                    {errors.suburb && (
                      <p className="mt-1.5 text-xs text-[#9E2A2B]">{errors.suburb}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                  >
                    Project Category
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value as ServiceId })
                    }
                    className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] focus:outline-none focus:border-[#7C5F35]"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#141413] mb-2"
                  >
                    Project Scope & Preferred Timing
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Tell us about your room layout, desired finishes, or ideal start month..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#D7D2C8] text-sm text-[#141413] placeholder:text-[#8E8980] focus:outline-none focus:border-[#7C5F35]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#57544E]">
                    Obligation-free site measure · Fixed-price written quote
                  </p>
                  <button
                    type="submit"
                    className="min-h-[48px] px-7 py-3 bg-[#141413] hover:bg-[#7C5F35] text-[#FAF9F7] text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book Free Site Measure
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
