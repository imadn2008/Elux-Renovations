/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/eluxData';

interface HeaderProps {
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
];

export function Header({ onRequestQuote }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#E5E2DC]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 h-16 lg:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-serif text-lg lg:text-xl font-semibold tracking-[0.06em] text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5F35]"
        >
          {BUSINESS_INFO.brandName}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#57544E]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#7C5F35] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5F35]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#FAF9F7] bg-[#141413] hover:bg-[#7C5F35] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5F35]"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#141413] border border-[#E5E2DC] bg-[#FAF9F7] hover:bg-[#F2F0EC] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E2DC] bg-[#FAF9F7] px-6 py-5">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav(link.href);
                }}
                className="min-h-[44px] flex items-center text-base font-medium text-[#141413] border-b border-[#E5E2DC]/60 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onRequestQuote();
              }}
              className="mt-4 w-full min-h-[44px] px-5 py-3 text-sm font-medium text-[#FAF9F7] bg-[#141413] hover:bg-[#7C5F35] transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
