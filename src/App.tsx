/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import {
  BUSINESS_INFO,
  CLIENT_REVIEWS,
  HERO_MEDIA,
  PROCESS_STAGES,
  PROJECTS,
  ProjectCaseStudy,
  SERVICES,
  ServiceId,
  ServiceItem,
  TRUST_METRICS,
} from './data/eluxData';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { ServiceModal } from './components/ServiceModal';
import { ProjectLightbox } from './components/ProjectLightbox';
import { EstimatedScopePayload, ScopeEstimator } from './components/ScopeEstimator';
import { ContactSection } from './components/ContactSection';

type FilterCategory = 'all' | ServiceId;

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'kitchens', label: 'Kitchens' },
  { id: 'bathrooms', label: 'Bathrooms' },
  { id: 'laundries', label: 'Laundries' },
  { id: 'joinery', label: 'Custom Joinery' },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [preselectedService, setPreselectedService] = useState<ServiceId | null>(null);
  const [attachedScope, setAttachedScope] = useState<EstimatedScopePayload | null>(null);
  const [attachedNote, setAttachedNote] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    setActiveService(null);
    setPreselectedService(service.id);
    setAttachedScope(null);
    setAttachedNote(
      `Enquiring regarding ${service.title} (${service.typicalTimeline}). Please contact me to arrange a site measure.`,
    );
    setTimeout(scrollToContact, 80);
  };

  const handleInquireSimilarProject = (project: ProjectCaseStudy) => {
    setActiveProject(null);
    setPreselectedService(project.category);
    setAttachedScope(null);
    setAttachedNote(
      `Interested in a similar renovation scope to "${project.title}" (${project.suburb}).`,
    );
    setTimeout(scrollToContact, 80);
  };

  const handleAttachEstimate = (payload: EstimatedScopePayload) => {
    setPreselectedService(payload.serviceId);
    setAttachedScope(payload);
    const addonText =
      payload.addons.length > 0 ? payload.addons.join(', ') : 'Standard Layout';
    setAttachedNote(
      `Estimated Scope Attached:\n- Space: ${payload.roomLabel}\n- Specification: ${payload.tierLabel}\n- Inclusions: ${addonText}\n- Indicative Range: $${payload.minBudget.toLocaleString('en-AU')} – $${payload.maxBudget.toLocaleString('en-AU')} AUD (${payload.weeksLabel})`,
    );
    setTimeout(scrollToContact, 80);
  };

  const handleClearAttached = () => {
    setAttachedScope(null);
    setAttachedNote(null);
  };

  return (
    <div id="top" className="min-h-screen bg-[#FAF9F7] text-[#141413]">
      <Header onRequestQuote={scrollToContact} />

      <main>
        {/* 1. Split Architectural Hero + Full-Width Proof Strip */}
        <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Editorial Proposition */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4">
                <div>
                  <p className="text-xs font-medium text-[#57544E] tracking-wide mb-5">
                    Sydney &amp; Greater Western Sydney · Ingleburn Workshop
                  </p>

                  <h1 className="font-serif text-[clamp(2.5rem,4.3vw,4.15rem)] font-medium text-[#141413] leading-[1.06] tracking-[-0.015em] mb-6">
                    Bespoke kitchens, bathrooms, and custom joinery built to endure.
                  </h1>

                  <p className="text-base sm:text-[17px] leading-[1.65] text-[#57544E] max-w-[54ch] mb-8">
                    Elux Renovations designs, fabricates, and delivers complete wet-area and kitchen transformations across Sydney—pairing precision joinery with licensed trades, certified waterproofing, and fixed-timeline scheduling.
                  </p>

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="min-h-[48px] px-7 py-3.5 bg-[#141413] hover:bg-[#7C5F35] text-[#FAF9F7] text-sm font-medium inline-flex items-center gap-2.5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Book Free Site Measure</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#projects"
                      className="min-h-[48px] px-2 py-3 text-sm font-medium text-[#141413] hover:text-[#7C5F35] inline-flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <span>Explore Recent Projects</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57544E]">
                  <span>{BUSINESS_INFO.address}</span>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="font-medium text-[#141413] hover:text-[#7C5F35] transition-colors tabular-nums"
                  >
                    Direct: {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Right Dominant Architectural Focal Media */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[340px] lg:min-h-[540px] bg-[#EBE7E0] overflow-hidden">
                  <ResilientImage
                    src={HERO_MEDIA.image}
                    alt={HERO_MEDIA.alt}
                    fallbackTitle="Elux Bespoke Kitchen Joinery"
                    className="w-full h-full lg:h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end p-6">
                    <p className="text-xs text-[#FAF9F7]/95 tracking-wide">
                      Oran Park Residence · Fluted Tasmanian Oak &amp; Honed Taj Mahal Quartzite
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Full-Width Proof Strip Below Hero Split */}
            <div className="mt-12 lg:mt-16 pt-8 border-t border-[#E5E2DC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TRUST_METRICS.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <p className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] tabular-nums">
                    {item.value}
                  </p>
                  <p className="text-xs leading-relaxed text-[#57544E]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Core Services — Asymmetric Bento Grid */}
        <section
          id="services"
          className="py-20 lg:py-28 border-t border-[#E5E2DC] bg-[#FAF9F7]"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C5F35] mb-3">
                  Core Capabilities
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] leading-[1.1]">
                  One Integrated Team from Strip-Out to Custom Joinery
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-[#57544E] max-w-md">
                Select any discipline below to inspect standard inclusions, waterproofing certifications, and typical Sydney build timeframes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {SERVICES.map((service, idx) => {
                const isWide = idx === 0 || idx === 3;
                return (
                  <article
                    key={service.id}
                    className={`group bg-[#F2F0EC] border border-[#E5E2DC] hover:border-[#7C5F35] transition-colors duration-200 flex flex-col ${
                      isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#EBE7E0]">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt}
                        fallbackTitle={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#57544E] mb-3">
                          <span className="font-mono tabular-nums text-[#7C5F35] font-medium">
                            {service.number}.
                          </span>
                          <span>{service.subtitle}</span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] leading-snug mb-3">
                          {service.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[#57544E]">
                          {service.summary}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-xs text-[#57544E] tabular-nums">
                          <span>{service.typicalTimeline}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#141413]">
                            {service.startingGuide}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveService(service)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] group-hover:text-[#7C5F35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>View Specifications</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Selected Sydney Projects — Filterable Editorial Showcase */}
        <section
          id="projects"
          className="py-20 lg:py-28 border-t border-[#E5E2DC] bg-[#FAF9F7]"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C5F35] mb-3">
                  Completed Sydney Commissions
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] leading-[1.1]">
                  Recent Transformations &amp; Material Schedules
                </h2>
              </div>

              {/* Interactive Segmented Filter Bar */}
              <div
                role="tablist"
                aria-label="Filter projects by room type"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F0EC] border border-[#E5E2DC] self-start lg:self-auto"
              >
                {FILTER_TABS.map((tab) => {
                  const active = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-[#FAF9F7]'
                          : 'text-[#57544E] hover:text-[#141413]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {filteredProjects.map((project, index) => {
                const isLead =
                  activeFilter === 'all' && index === 0;
                return (
                  <article
                    key={project.id}
                    className={`group flex flex-col border-b border-[#E5E2DC] pb-8 ${
                      isLead ? 'md:col-span-2 lg:col-span-8' : 'lg:col-span-4'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="text-left block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5F35]"
                    >
                      <div
                        className={`w-full overflow-hidden bg-[#EBE7E0] mb-5 ${
                          isLead ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ResilientImage
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#57544E] mb-2">
                        <span>{project.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.suburb}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.duration}</span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-2xl font-medium text-[#141413] group-hover:text-[#7C5F35] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-[#57544E] group-hover:text-[#7C5F35] shrink-0 mt-1 transition-colors" />
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#57544E] line-clamp-2">
                        {project.summary}
                      </p>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Interactive Sydney Scope & Investment Estimator */}
        <ScopeEstimator onAttachEstimate={handleAttachEstimate} />

        {/* 5. High-Contrast Charcoal Architectural Process Section */}
        <section id="process" className="py-20 lg:py-28 bg-[#141413] text-[#FAF9F7]">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C4A474] mb-3">
                How We Deliver
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] leading-[1.1] mb-4">
                Structured Four-Stage Execution Without Guesswork
              </h2>
              <p className="text-[15px] leading-relaxed text-[#C7C3BC]">
                Every renovation follows a documented schedule—eliminating trade delays, surprise variations, and disjointed subcontractor handoffs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.number}
                  className="pt-8 pb-6 md:pr-8 lg:border-r lg:last:border-r-0 border-white/15 lg:pl-8 lg:first:pl-0 flex flex-col justify-between gap-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5 text-xs">
                      <span className="font-mono text-[#C4A474] tabular-nums">
                        {stage.number}
                      </span>
                      <span className="text-[#C7C3BC] tabular-nums">
                        {stage.duration}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#FAF9F7] mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#C7C3BC]">
                      {stage.description}
                    </p>
                  </div>

                  <p className="pt-4 border-t border-white/10 text-xs text-[#C4A474]">
                    Deliverable: {stage.deliverable}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Attributable Sydney Client Reviews */}
        <section
          id="reviews"
          className="py-20 lg:py-28 bg-[#FAF9F7] border-t border-[#E5E2DC]"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C5F35] mb-3">
                  Verified Client Outcomes
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] leading-[1.1]">
                  5.0-Star Craftsmanship Across Greater Sydney
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#141413]">
                <div className="flex items-center text-[#9A7B4F]" aria-hidden="true">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="tabular-nums">5.0 Rating · Google &amp; hipages</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CLIENT_REVIEWS.map((review) => (
                <blockquote
                  key={review.id}
                  className="bg-[#F2F0EC] border border-[#E5E2DC] p-7 sm:p-8 flex flex-col justify-between gap-8"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#57544E] mb-4">
                      <span>{review.projectType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{review.source}</span>
                    </div>
                    <p className="font-serif text-xl sm:text-2xl leading-snug text-[#141413]">
                      “{review.quote}”
                    </p>
                  </div>

                  <footer className="pt-5 border-t border-[#E5E2DC]">
                    <p className="text-sm font-semibold text-[#141413]">
                      {review.clientName}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#57544E] mt-1">
                      <span>{review.suburb}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#7C5F35] font-medium">
                        {review.outcome}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Consultation & Ingleburn Studio Contact */}
        <ContactSection
          preselectedService={preselectedService}
          attachedScope={attachedScope}
          attachedNote={attachedNote}
          onClearAttached={handleClearAttached}
        />
      </main>

      {/* 8. Quiet Architectural Footer */}
      <footer className="bg-[#141413] text-[#C7C3BC] border-t border-white/10 py-14">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <p className="font-serif text-xl font-semibold tracking-[0.06em] text-[#FAF9F7]">
                {BUSINESS_INFO.brandName}
              </p>
              <p className="text-sm leading-relaxed max-w-sm">
                Bespoke kitchen, bathroom, laundry, and architectural joinery specialists servicing Sydney and the Macarthur region.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C4A474] mb-3">
                Navigation
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-[#FAF9F7] transition-colors">
                    Services &amp; Inclusions
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#FAF9F7] transition-colors">
                    Sydney Projects
                  </a>
                </li>
                <li>
                  <a href="#estimator" className="hover:text-[#FAF9F7] transition-colors">
                    Scope Estimator
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[#FAF9F7] transition-colors">
                    4-Stage Process
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C4A474] mb-3">
                Ingleburn Studio
              </p>
              <p>{BUSINESS_INFO.address}</p>
              <p className="tabular-nums">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="hover:text-[#FAF9F7] transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-[#FAF9F7] transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="text-xs text-[#8E8980] pt-1">{BUSINESS_INFO.hours}</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8E8980]">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.</p>
            <p>Servicing Sydney, Macarthur &amp; Greater Western Sydney, NSW</p>
          </div>
        </div>
      </footer>

      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onSelectForQuote={handleSelectServiceForQuote}
      />

      <ProjectLightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquireSimilar={handleInquireSimilarProject}
      />
    </div>
  );
}
