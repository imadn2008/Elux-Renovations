/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { ProjectCaseStudy } from '../data/eluxData';
import { ResilientImage } from './ResilientImage';

interface ProjectLightboxProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onInquireSimilar: (project: ProjectCaseStudy) => void;
}

export function ProjectLightbox({
  project,
  onClose,
  onInquireSimilar,
}: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/80 backdrop-blur-xs p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FAF9F7] border border-[#E5E2DC] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project case study"
          className="sticky top-4 float-right mr-4 z-10 w-10 h-10 flex items-center justify-center bg-[#FAF9F7] border border-[#E5E2DC] text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F7] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="aspect-[16/9] max-h-[460px] w-full bg-[#F2F0EC] overflow-hidden">
          <ResilientImage
            src={project.image}
            alt={project.imageAlt}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E2DC]">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57544E] mb-2">
                <span>{project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{project.suburb}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>
              <h3
                id="project-modal-title"
                className="font-serif text-3xl md:text-4xl font-medium text-[#141413] leading-tight"
              >
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-8 shrink-0">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs text-[#57544E] mb-0.5">{metric.label}</p>
                  <p className="text-base font-semibold text-[#141413] tabular-nums">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C5F35] mb-2">
                  The Brief & Challenge
                </h4>
                <p className="text-[15px] leading-relaxed text-[#57544E]">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C5F35] mb-2">
                  Architectural Execution
                </h4>
                <p className="text-[15px] leading-relaxed text-[#141413]">
                  {project.outcome}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F2F0EC] border border-[#E5E2DC] p-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7C5F35] mb-4">
                Specified Material Schedule
              </h4>
              <dl className="divide-y divide-[#E5E2DC]">
                {project.materials.map((mat) => (
                  <div
                    key={mat.element}
                    className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 text-sm"
                  >
                    <dt className="font-medium text-[#57544E] shrink-0">
                      {mat.element}
                    </dt>
                    <dd className="text-[#141413] sm:text-right">
                      {mat.specification}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5E2DC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#57544E] hover:text-[#141413] transition-colors cursor-pointer"
            >
              Return to Portfolio
            </button>
            <button
              type="button"
              onClick={() => onInquireSimilar(project)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FAF9F7] bg-[#141413] hover:bg-[#7C5F35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Request a Similar Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
