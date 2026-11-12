/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { ServiceItem } from '../data/eluxData';
import { ResilientImage } from './ResilientImage';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForQuote: (service: ServiceItem) => void;
}

export function ServiceModal({
  service,
  onClose,
  onSelectForQuote,
}: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/75 backdrop-blur-xs p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF9F7] border border-[#E5E2DC] shadow-2xl grid grid-cols-1 lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service specifications"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#FAF9F7] border border-[#E5E2DC] text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F7] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="lg:col-span-5 bg-[#F2F0EC] min-h-[260px] lg:min-h-full">
          <ResilientImage
            src={service.image}
            alt={service.imageAlt}
            fallbackTitle={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57544E] mb-3">
              <span className="font-mono tabular-nums text-[#7C5F35]">
                {service.number}
              </span>
              <span aria-hidden="true">·</span>
              <span>{service.subtitle}</span>
            </div>

            <h3
              id="service-modal-title"
              className="font-serif text-3xl md:text-4xl font-medium text-[#141413] leading-tight mb-4"
            >
              {service.title}
            </h3>

            <p className="text-[15px] leading-relaxed text-[#57544E] mb-6">
              {service.summary}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E5E2DC] mb-6">
              <div>
                <p className="text-xs text-[#57544E] mb-1">Typical Turnaround</p>
                <p className="text-sm font-semibold text-[#141413] tabular-nums">
                  {service.typicalTimeline}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#57544E] mb-1">Investment Guide</p>
                <p className="text-sm font-semibold text-[#141413] tabular-nums">
                  {service.startingGuide}
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold tracking-wider uppercase text-[#7C5F35] mb-3">
              Standard Elux Inclusions
            </p>
            <ul className="space-y-2.5 mb-6">
              {service.inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#141413]"
                >
                  <Check className="w-4 h-4 text-[#7C5F35] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs leading-relaxed text-[#57544E] bg-[#F2F0EC] p-4 border border-[#E5E2DC]">
              {service.craftsmanshipNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E2DC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#57544E] hover:text-[#141413] transition-colors cursor-pointer"
            >
              Back to Services
            </button>
            <button
              type="button"
              onClick={() => onSelectForQuote(service)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FAF9F7] bg-[#141413] hover:bg-[#7C5F35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book Measure for {service.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
