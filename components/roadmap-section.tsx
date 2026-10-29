'use client'

import React from 'react'
import { Flag, Target, Rocket, Star, Sparkles } from 'lucide-react'

interface Phase {
  phaseNumber: string
  title: string
  tag: string
  icon: React.ComponentType<{ className?: string }>
  items: string[]
}

const PHASES: Phase[] = [
  {
    phaseNumber: 'Phase 1',
    title: 'Build the Foundation',
    tag: 'Active Now',
    icon: Flag,
    items: [
      'Launch token & ecosystem',
      'DexScreener profile & verification',
      'Automated charity process',
      'Organic holder community',
    ],
  },
  {
    phaseNumber: 'Phase 2',
    title: 'The $100K Milestone',
    tag: 'Next Goal',
    icon: Target,
    items: [
      '$100K market cap target',
      '12 SOL official donation',
      'Publish on-chain receipt on X',
      'Community expansion initiatives',
    ],
  },
  {
    phaseNumber: 'Phase 3',
    title: 'Expand Our Impact',
    tag: 'Planned',
    icon: Rocket,
    items: [
      '$1M market cap milestone',
      'Larger charitable donations',
      'Additional holder utilities',
      'Broader ecosystem partnerships',
    ],
  },
  {
    phaseNumber: 'Phase 4',
    title: 'Long-Term Recognition',
    tag: 'Vision',
    icon: Star,
    items: [
      'Top DEX verified listings',
      'Binance Square media coverage',
      'Strategic CEX opportunities',
      'Global philanthropic brand',
    ],
  },
]

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative w-full overflow-hidden text-white py-16 sm:py-20 lg:py-28"
      style={{
        background: `
          radial-gradient(circle at 80% 25%, rgba(192, 132, 252, 0.35) 0%, transparent 45%),
          radial-gradient(circle at 18% 60%, rgba(168, 85, 247, 0.3) 0%, transparent 45%),
          radial-gradient(ellipse 90% 65% at 50% -10%, rgba(147, 51, 234, 0.4) 0%, transparent 60%),
          linear-gradient(135deg, #2a0a6b 0%, #3e1284 45%, #230752 100%)
        `,
      }}
    >
      {/* Ambient background flares */}
      <div className="absolute top-1/3 left-10 size-[450px] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-[500px] bg-[radial-gradient(circle,rgba(192,132,252,0.22)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="roadmap-header mb-10 sm:mb-14 lg:mb-16 text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md mb-2">
            <Sparkles className="size-3 text-[#c084fc]" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-[#e9d5ff]">
              ROADMAP
            </span>
          </div>
          <h2 className="mt-1 text-3xl min-[420px]:text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Our Journey
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-purple-200/80 max-w-lg">
            A transparent four-phase roadmap taking $POT from organic launch to global charitable recognition.
          </p>
        </div>

        {/* ----------------- MOBILE / TABLET VIEW (< lg): CONNECTED VERTICAL TIMELINE ----------------- */}
        <div className="relative lg:hidden">
          {/* Vertical Glowing Timeline Line */}
          <div className="absolute left-[23px] sm:left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#c084fc] via-[#a855f7] to-[#7c2ae8]/30 pointer-events-none" />

          <div className="space-y-6 sm:space-y-8">
            {PHASES.map(({ phaseNumber, title, tag, icon: Icon, items }, index) => {
              const isActive = index === 0

              return (
                <div key={phaseNumber} className="relative flex items-start gap-3.5 sm:gap-6">
                  {/* Glowing Node on Timeline */}
                  <div className="relative z-10 size-12 sm:size-14 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] ring-4 ring-[#2a0a6b] shadow-[0_0_24px_rgba(192,132,252,0.65)] flex items-center justify-center">
                    <Icon className="size-5 sm:size-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  </div>

                  {/* Frosted Glass Phase Card */}
                  <div
                    className={`flex-1 rounded-2xl sm:rounded-3xl border p-4 sm:p-5 backdrop-blur-md transition-all duration-300 ${
                      isActive
                        ? 'border-[#c084fc]/50 bg-gradient-to-br from-white/[0.12] to-white/[0.04] shadow-[0_10px_30px_rgba(192,132,252,0.18)]'
                        : 'border-white/12 bg-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    {/* Header: Phase Number & Status Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#c084fc]">
                        {phaseNumber}
                      </span>
                      <span
                        className={`text-[9.5px] sm:text-[10.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                            : index === 1
                            ? 'bg-[#c084fc]/20 text-[#e9d5ff] border border-[#c084fc]/35'
                            : 'bg-white/10 text-white/70 border border-white/10'
                        }`}
                      >
                        {tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-1 text-base sm:text-lg font-black text-white leading-snug">
                      {title}
                    </h3>

                    {/* Checklist Items with luminous bullet pips */}
                    <ul className="mt-3 sm:mt-3.5 space-y-2 text-xs sm:text-[13px] leading-relaxed text-[#f3e8ff]/85">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="size-1.5 rounded-full bg-[#c084fc] shrink-0 mt-1.5 shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ----------------- DESKTOP VIEW (>= lg): 4 COLUMNS EDITORIAL GRID ----------------- */}
        <div className="hidden lg:grid roadmap-phases-grid lg:grid-cols-4 gap-0">
          {PHASES.map(({ phaseNumber, title, icon: Icon, items }, index) => {
            const hasLeftDivider = index > 0

            return (
              <div
                key={phaseNumber}
                className={`roadmap-phase-col group relative flex flex-col justify-start transition-all duration-300 ${
                  hasLeftDivider
                    ? 'lg:border-l lg:border-white/15 lg:pl-8 xl:pl-10'
                    : 'lg:pr-8 xl:pr-10'
                } ${index > 0 && index < 3 ? 'lg:pr-8 xl:pr-10' : ''}`}
              >
                {/* Glowing Purple Orb Badge */}
                <div className="relative size-14 sm:size-15 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_28px_rgba(192,132,252,0.7),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center ring-1 ring-white/35 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_36px_rgba(216,180,254,0.9)]">
                  <Icon className="size-6 sm:size-6.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Phase Number & Title */}
                <div className="mt-6 sm:mt-7">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight transition-colors duration-200 group-hover:text-[#f3e8ff]">
                    {phaseNumber}
                  </h3>
                  <h4 className="mt-0.5 text-sm sm:text-[15px] font-semibold text-white/95">
                    {title}
                  </h4>
                </div>

                {/* Bullet Points List with glowing pips */}
                <ul className="mt-4 sm:mt-5 space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-[#f3e8ff]/85">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 transition-colors duration-200 group-hover:text-white"
                    >
                      <span className="size-1.5 rounded-full bg-[#c084fc] shrink-0 mt-1.5 shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Subtle Hover Glow Backdrop */}
                <div className="absolute -inset-4 rounded-3xl bg-white/[0.03] opacity-0 blur-xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
