'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { CustomPawPrint, StackedCoinsIcon, OrganicLeafIcon, PawPrint3DWatermark } from './why-pot-icons'

export function WhyPotSection() {
  return (
    <section
      id="ecosystem"
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
      {/* Ambient purple backlight matching hero section image */}
      <div className="absolute top-0 right-1/4 size-[550px] bg-[radial-gradient(circle,rgba(168,85,247,0.28)_0%,transparent_65%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-10 size-[450px] bg-[radial-gradient(circle,rgba(192,132,252,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Giant 3D Sculpted Purple Paw Print in the Upper Right Background */}
      <div className="absolute -top-10 -right-6 sm:-top-6 sm:right-4 md:right-10 lg:right-16 xl:right-24 w-[320px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] aspect-square pointer-events-none select-none opacity-60 sm:opacity-75 lg:opacity-90 z-0 transition-opacity">
        <PawPrint3DWatermark className="w-full h-full drop-shadow-[0_20px_45px_rgba(20,3,45,0.75)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl text-left">
          <p className="text-[11px] sm:text-xs font-black tracking-[0.22em] uppercase text-[#e9d5ff]">
            WHY $POT LUCK
          </p>
          <h2 className="mt-2.5 text-3xl min-[420px]:text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.12]">
            Two Utilities. One Mission.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 font-normal leading-relaxed">
            $POT Luck combines holder rewards with charitable impact.
          </p>
        </div>

        {/* Content Layout: 2 Glass Cards on the Left + Vertical Flow on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
          
          {/* Card 1: Financial Utility */}
          <div className="lg:col-span-4 rounded-[26px] sm:rounded-[30px] border border-white/20 bg-gradient-to-b from-[#48178a]/60 to-[#270b55]/85 p-6 sm:p-7 md:p-8 backdrop-blur-xl shadow-[0_16px_45px_rgba(20,4,48,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 hover:border-[#e9d5ff]/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] flex flex-col justify-between min-h-[260px] sm:min-h-[290px]">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Glowing Purple Orb Badge */}
              <div className="relative size-14 sm:size-16 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_30px_rgba(192,132,252,0.8),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center ring-1 ring-white/35">
                <StackedCoinsIcon className="size-7 sm:size-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
              </div>

              {/* Title & Subtitle */}
              <div className="pt-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Financial Utility
                </h3>
                <h4 className="mt-0.5 text-xs sm:text-sm font-semibold text-white/95">
                  SOL Reflection Rewards
                </h4>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5 space-y-4">
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#f3e8ff]/90 font-normal">
                3% of trading activity in SOL distributed to holders.
              </p>
              <p className="text-[10.5px] sm:text-[11px] leading-relaxed text-[#e9d5ff]/65">
                Rewards depend on volume, fees and project rules.
              </p>
            </div>
          </div>

          {/* Card 2: Impact Utility */}
          <div className="lg:col-span-4 rounded-[26px] sm:rounded-[30px] border border-white/20 bg-gradient-to-b from-[#48178a]/60 to-[#270b55]/85 p-6 sm:p-7 md:p-8 backdrop-blur-xl shadow-[0_16px_45px_rgba(20,4,48,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 hover:border-[#e9d5ff]/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] flex flex-col justify-between min-h-[260px] sm:min-h-[290px]">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Glowing Purple Orb Badge */}
              <div className="relative size-14 sm:size-16 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_30px_rgba(192,132,252,0.8),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center ring-1 ring-white/35">
                <Heart className="size-6 sm:size-7 text-white fill-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
              </div>

              {/* Title & Subtitle */}
              <div className="pt-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Impact Utility
                </h3>
                <h4 className="mt-0.5 text-xs sm:text-sm font-semibold text-white/95">
                  Community-Powered Charity
                </h4>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5 space-y-4">
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#f3e8ff]/90 font-normal">
                Reach $100K market cap and donate 12 SOL to St. Jude.
              </p>
              <p className="text-[10.5px] sm:text-[11px] leading-relaxed text-[#e9d5ff]/65">
                Your hold helps us grow and give back.
              </p>
            </div>
          </div>

          {/* Right Column: Organic Growth & Together We Grow */}
          <div className="lg:col-span-4 relative flex flex-col justify-center space-y-7 sm:space-y-8 pl-1 sm:pl-3 lg:pl-6 py-2">
            
            {/* Subtle Glowing Vertical Line connecting the badges */}
            <div className="absolute left-[31px] sm:left-[35px] lg:left-[47px] top-9 bottom-9 w-[1.5px] bg-gradient-to-b from-[#e9d5ff]/60 via-[#c084fc]/40 to-[#e9d5ff]/60 shadow-[0_0_10px_rgba(233,213,255,0.5)] pointer-events-none" />

            {/* Item 1: Organic Growth */}
            <div className="relative flex items-start gap-4 sm:gap-5 group">
              <div className="relative z-10 size-13 sm:size-14 shrink-0 rounded-full bg-gradient-to-br from-[#3c126d] to-[#1c0638] border border-[#c084fc]/60 shadow-[0_0_24px_rgba(192,132,252,0.6),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <OrganicLeafIcon className="size-6 text-white" />
              </div>
              <div className="pt-1">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Organic Growth
                </h3>
                <p className="mt-1 text-xs sm:text-[12.5px] leading-relaxed text-white/85 max-w-[280px]">
                  No artificial hype. No paid pumps. Only real people, real activity, real community.
                </p>
              </div>
            </div>

            {/* Item 2: Together We Grow / Give (with Custom Paw Print) */}
            <div className="relative flex items-start gap-4 sm:gap-5 group">
              <div className="relative z-10 size-13 sm:size-14 shrink-0 rounded-full bg-gradient-to-br from-[#3c126d] to-[#1c0638] border border-[#c084fc]/60 shadow-[0_0_24px_rgba(192,132,252,0.6),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <CustomPawPrint className="size-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]" />
              </div>
              <div className="pt-1.5 sm:pt-2">
                <p className="text-xs sm:text-[14px] font-semibold text-white/95 leading-snug">
                  Together we grow.
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-white/95 leading-snug">
                  Together we give.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

