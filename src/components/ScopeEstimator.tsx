/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ServiceId } from '../data/eluxData';

export interface EstimatedScopePayload {
  serviceId: ServiceId;
  roomLabel: string;
  tierLabel: string;
  addons: string[];
  minBudget: number;
  maxBudget: number;
  weeksLabel: string;
}

interface ScopeEstimatorProps {
  onAttachEstimate: (payload: EstimatedScopePayload) => void;
}

const ROOM_OPTIONS: {
  id: ServiceId;
  label: string;
  baseMin: number;
  baseMax: number;
  baseWeeks: [number, number];
}[] = [
  {
    id: 'kitchens',
    label: 'Kitchen Renovation',
    baseMin: 28000,
    baseMax: 38000,
    baseWeeks: [4, 5],
  },
  {
    id: 'bathrooms',
    label: 'Bathroom / Ensuite',
    baseMin: 22000,
    baseMax: 30000,
    baseWeeks: [3, 4],
  },
  {
    id: 'laundries',
    label: 'Laundry & Mudroom',
    baseMin: 12500,
    baseMax: 18500,
    baseWeeks: [2, 3],
  },
  {
    id: 'joinery',
    label: 'Multi-Room / Custom Joinery',
    baseMin: 35000,
    baseMax: 52000,
    baseWeeks: [5, 7],
  },
];

const TIER_OPTIONS = [
  {
    id: 'essential',
    label: 'Essential Craft',
    detail: '2-Pac satin or melamine joinery, 20mm engineered stone, brushed chrome or matte black fixtures.',
    multiplier: 1,
  },
  {
    id: 'signature',
    label: 'Architectural Signature',
    detail: 'Fluted timber or shaker 2-Pac cabinetry, mitred porcelain or veined stone, brushed brass tapware.',
    multiplier: 1.28,
  },
  {
    id: 'bespoke',
    label: 'Bespoke Luxury',
    detail: 'Natural Taj Mahal quartzite slabs, curved timber veneer, integrated appliances, full-height stone splashbacks.',
    multiplier: 1.55,
  },
];

const ADDONS = [
  { id: 'butlers', label: 'Walk-In Butler’s Pantry / Scullery', addMin: 11000, addMax: 16000, addWeeks: 1 },
  { id: 'structural', label: 'Structural Wall Removal & Beam', addMin: 6500, addMax: 11000, addWeeks: 1 },
  { id: 'underfloor', label: 'Hydronic / Electric Underfloor Heating', addMin: 2800, addMax: 4200, addWeeks: 0 },
  { id: 'plumbing-move', label: 'Plumbing & Drainage Relocation', addMin: 3200, addMax: 5500, addWeeks: 1 },
];

function formatAUD(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ScopeEstimator({ onAttachEstimate }: ScopeEstimatorProps) {
  const [selectedRoom, setSelectedRoom] = useState<ServiceId>('kitchens');
  const [selectedTier, setSelectedTier] = useState<string>('signature');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['butlers']);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const calculation = useMemo(() => {
    const room = ROOM_OPTIONS.find((r) => r.id === selectedRoom) ?? ROOM_OPTIONS[0];
    const tier = TIER_OPTIONS.find((t) => t.id === selectedTier) ?? TIER_OPTIONS[1];
    const activeAddons = ADDONS.filter((a) => selectedAddons.includes(a.id));

    const addonMin = activeAddons.reduce((sum, a) => sum + a.addMin, 0);
    const addonMax = activeAddons.reduce((sum, a) => sum + a.addMax, 0);
    const extraWeeks = activeAddons.reduce((sum, a) => sum + a.addWeeks, 0);

    const minBudget = Math.round((room.baseMin * tier.multiplier + addonMin) / 500) * 500;
    const maxBudget = Math.round((room.baseMax * tier.multiplier + addonMax) / 500) * 500;
    const minWeeks = room.baseWeeks[0] + extraWeeks;
    const maxWeeks = room.baseWeeks[1] + extraWeeks;

    return {
      room,
      tier,
      activeAddons,
      minBudget,
      maxBudget,
      weeksLabel: `${minWeeks} – ${maxWeeks} Weeks On-Site`,
    };
  }, [selectedRoom, selectedTier, selectedAddons]);

  const handleAttach = () => {
    onAttachEstimate({
      serviceId: calculation.room.id,
      roomLabel: calculation.room.label,
      tierLabel: calculation.tier.label,
      addons: calculation.activeAddons.map((a) => a.label),
      minBudget: calculation.minBudget,
      maxBudget: calculation.maxBudget,
      weeksLabel: calculation.weeksLabel,
    });
  };

  return (
    <section
      id="estimator"
      className="py-20 lg:py-28 border-t border-[#E5E2DC] bg-[#F2F0EC]"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C5F35] mb-3">
            Transparent Planning Guide
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] leading-[1.1] mb-4">
            Interactive Sydney Renovation Scope Estimator
          </h2>
          <p className="text-[15px] leading-relaxed text-[#57544E]">
            Configure your space, finish specification, and structural inclusions for an indicative Sydney build budget and schedule before booking an on-site measure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 bg-[#FAF9F7] border border-[#E5E2DC] p-6 sm:p-8 space-y-8">
            {/* Step 1: Room */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#57544E] mb-3">
                01. Primary Renovation Space
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROOM_OPTIONS.map((room) => {
                  const active = selectedRoom === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoom(room.id)}
                      className={`min-h-[44px] px-4 py-3 text-left text-sm font-medium border transition-colors duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-[#FAF9F7] border-[#141413]'
                          : 'bg-[#FAF9F7] text-[#141413] border-[#E5E2DC] hover:border-[#7C5F35]'
                      }`}
                    >
                      {room.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Finish Tier */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#57544E] mb-3">
                02. Joinery & Material Specification
              </p>
              <div className="grid grid-cols-1 gap-3">
                {TIER_OPTIONS.map((tier) => {
                  const active = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-4 text-left border transition-colors duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#F2F0EC] border-[#7C5F35]'
                          : 'bg-[#FAF9F7] border-[#E5E2DC] hover:border-[#7C5F35]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="text-sm font-semibold text-[#141413]">
                          {tier.label}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            active ? 'text-[#7C5F35]' : 'text-[#57544E]'
                          }`}
                        >
                          {active ? 'Selected' : 'Select'}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#57544E]">
                        {tier.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Scope */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#57544E] mb-3">
                03. Structural & Architectural Inclusions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      aria-pressed={checked}
                      className={`min-h-[44px] px-4 py-3 text-left text-xs sm:text-sm border flex items-center justify-between gap-3 transition-colors duration-150 cursor-pointer ${
                        checked
                          ? 'bg-[#F2F0EC] border-[#7C5F35] text-[#141413] font-medium'
                          : 'bg-[#FAF9F7] border-[#E5E2DC] text-[#57544E] hover:border-[#7C5F35]/60'
                      }`}
                    >
                      <span>{addon.label}</span>
                      <span
                        className={`w-5 h-5 flex items-center justify-center border shrink-0 ${
                          checked
                            ? 'bg-[#7C5F35] border-[#7C5F35] text-[#FAF9F7]'
                            : 'border-[#C8C3B9]'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-[#141413] text-[#FAF9F7] p-6 sm:p-8 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C4A474] mb-6">
              Indicative Investment Summary
            </p>

            <div className="pb-6 border-b border-white/15 mb-6">
              <p className="text-xs text-[#C7C3BC] mb-2">
                Estimated Sydney Build Range (Incl. GST & Licensed Trades)
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-medium text-[#FAF9F7] tabular-nums">
                {formatAUD(calculation.minBudget)} – {formatAUD(calculation.maxBudget)}
              </p>
            </div>

            <dl className="space-y-4 text-sm pb-6 border-b border-white/15 mb-6">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#C7C3BC]">Primary Space</dt>
                <dd className="font-medium text-right">{calculation.room.label}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#C7C3BC]">Finish Tier</dt>
                <dd className="font-medium text-right">{calculation.tier.label}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#C7C3BC]">On-Site Duration</dt>
                <dd className="font-medium tabular-nums text-right">
                  {calculation.weeksLabel}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[#C7C3BC] shrink-0">Added Scope</dt>
                <dd className="font-medium text-right">
                  {calculation.activeAddons.length > 0
                    ? calculation.activeAddons.map((a) => a.label).join(', ')
                    : 'Standard Layout Replacement'}
                </dd>
              </div>
            </dl>

            <p className="text-xs leading-relaxed text-[#C7C3BC] mb-6">
              All final quotations are fixed-price following an in-person laser measure at your property and material selection at our Ingleburn studio.
            </p>

            <button
              type="button"
              onClick={handleAttach}
              className="w-full min-h-[48px] px-6 py-3.5 bg-[#C4A474] hover:bg-[#FAF9F7] text-[#141413] text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              <span>Attach Scope to Consultation Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
