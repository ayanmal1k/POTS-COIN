'use client'

import React from 'react'
import { Flag, Target, Rocket, Star } from 'lucide-react'

interface Phase {
  phaseNumber: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: string[]
}

const PHASES: Phase[] = [
  {
    phaseNumber: 'Phase 1',
    title: 'Build the Foundation',
    icon: Flag,
    items: [
      'Launch token & ecosystem',
      'DexScreener profile',
      'Charity process',
      'Organic community',
    ],
  },
  {
    phaseNumber: 'Phase 2',
    title: 'The $100K Milestone',
    icon: Target,
    items: [
      '$100K market cap',
      '12 SOL donation',
      'Publish receipt on X',
      'Community growth',
    ],
  },
  {
    phaseNumber: 'Phase 3',
    title: 'Expand Our Impact',
    icon: Rocket,
    items: [
      '$1M target',
      'Larger donations',
      'More utilities',
      'Ecosystem expansion',
    ],
  },
  {
    phaseNumber: 'Phase 4',
    title: 'Long-Term Recognition',
    icon: Star,
    items: [
      'DEX listings',
      'Binance Square coverage',
      'CEX opportunities',
      'Global community',
    ],
  },
]

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative w-full overflow-hidden text-white py-20 sm:py-24 lg:py-28"
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

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="roadmap-header mb-12 sm:mb-16 text-left">
          <p className="text-[11px] sm:text-xs font-black tracking-[0.22em] uppercase text-[#e9d5ff]">
            ROADMAP
          </p>
          <h2 className="mt-2 text-3xl min-[420px]:text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Our Journey
          </h2>
        </div>

        {/* 4 Columns Roadmap Grid */}
        <div className="roadmap-phases-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
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

                {/* Bullet Points List */}
                <ul className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-[13px] leading-relaxed text-[#f3e8ff]/85">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 transition-colors duration-200 group-hover:text-white"
                    >
                      <span className="text-white/60 select-none text-sm leading-4 font-bold">•</span>
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

