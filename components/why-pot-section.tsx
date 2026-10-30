'use client'

import React from 'react'
import { Heart } from 'lucide-react'
import { useContent } from '@/context/content-context'
import { EditableText, EditableButton } from '@/components/visual-editor/editable'
import { EditableIcon } from '@/components/visual-editor/icon-library'

// Stacked Coin Discs icon exactly matching the image
function CoinStackIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="7" ry="2.2" fill="currentColor" fillOpacity="0.25" />
      <path d="M5 5v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V5" />
      <path d="M5 10.5v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2v-3.5" />
      <path d="M5 16v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V16" />
    </svg>
  )
}

export function WhyPotSection() {
  const { content } = useContent()
  const u = content.utilities

  // Handle newlines in heading
  const headingLines = u.heading.split('\n')

  return (
    <section
      id="ecosystem"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-28 text-[#1c0836]"
      style={{
        background: `
          radial-gradient(ellipse 75% 55% at 85% 10%, rgba(232, 200, 255, 0.4) 0%, transparent 65%),
          radial-gradient(ellipse 70% 50% at 10% 85%, rgba(241, 221, 255, 0.45) 0%, transparent 60%),
          #ffffff
        `,
      }}
    >
      {/* Background ambient decorative elements (matching mission section) */}
      <div className="absolute -right-24 top-10 size-96 rounded-full bg-[#e8c8ff]/35 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-10 size-80 rounded-full bg-[#f1ddff]/45 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* 3-Column Layout: Left Text Block + 2 White Feature Cards (exactly matching the design image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Heading, Subtitle & Button */}
          <div className="flex flex-col justify-center text-left md:col-span-2 lg:col-span-1 pr-0 lg:pr-4 py-2">
            <EditableText
              as="p"
              value={u.eyebrow}
              path="utilities.eyebrow"
              className="text-xs sm:text-[13px] font-black tracking-[0.2em] uppercase text-[#6929d9]"
            />

            <EditableText
              as="h2"
              value={u.heading}
              path="utilities.heading"
              multiline
              className="mt-3 text-3xl min-[400px]:text-4xl sm:text-[42px] lg:text-[44px] font-black tracking-tight text-[#1c0836] leading-[1.08] whitespace-pre-line"
            />

            <EditableText
              as="p"
              value={u.description}
              path="utilities.description"
              multiline
              className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-relaxed text-[#543b74] font-normal max-w-sm"
            />

            <div className="mt-6 sm:mt-8">
              <EditableButton
                text={u.buttonText}
                textPath="utilities.buttonText"
                link={u.buttonLink}
                linkPath="utilities.buttonLink"
                className="inline-flex items-center justify-center rounded-full bg-[#6929d9] hover:bg-[#581c87] text-white px-7 py-3.5 text-sm font-bold shadow-[0_8px_22px_rgba(105,41,217,0.32)] transition-all duration-200 hover:scale-[1.02] active:scale-95"
              />
            </div>
          </div>

          {/* Card 1: Holder Rewards */}
          <div className="group rounded-[28px] sm:rounded-[32px] border border-[#e8ddfb] bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(110,40,185,0.06)] flex flex-col justify-start transition-all duration-300 hover:shadow-[0_18px_45px_rgba(110,40,185,0.12)] hover:border-[#c084fc]/60">
            {/* Circular Purple Icon Badge */}
            <div className="size-13 sm:size-14 rounded-full bg-[#6929d9] flex items-center justify-center text-white shadow-[0_6px_20px_rgba(105,41,217,0.3)] transition-transform duration-300 group-hover:scale-105">
              <EditableIcon
                name={u.card1Icon}
                namePath="utilities.card1Icon"
                filled={u.card1IconFilled}
                fillPath="utilities.card1IconFilled"
                defaultIcon="CoinStack"
                defaultFilled={false}
                className="size-6 sm:size-6.5 text-white"
              />
            </div>

            {/* Title & Subtitle */}
            <EditableText
              as="h3"
              value={u.card1Title}
              path="utilities.card1Title"
              className="mt-6 text-xl sm:text-[22px] font-black text-[#1c0836] tracking-tight"
            />
            <EditableText
              as="p"
              value={u.card1Badge}
              path="utilities.card1Badge"
              className="mt-1 text-sm sm:text-[15px] font-bold text-[#6929d9]"
            />

            {/* Description */}
            <EditableText
              as="p"
              value={u.card1Desc}
              path="utilities.card1Desc"
              multiline
              className="mt-5 text-xs sm:text-[13.5px] leading-relaxed text-[#594772]"
            />
          </div>

          {/* Card 2: Real Impact */}
          <div className="group rounded-[28px] sm:rounded-[32px] border border-[#d1fae5]/80 bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(16,185,129,0.06)] flex flex-col justify-start transition-all duration-300 hover:shadow-[0_18px_45px_rgba(16,185,129,0.12)] hover:border-[#10b981]/50">
            {/* Circular Green Icon Badge with Yellow Heart */}
            <div className="size-13 sm:size-14 rounded-full bg-[#10b981] flex items-center justify-center shadow-[0_6px_20px_rgba(160,185,129,0.3)] transition-transform duration-300 group-hover:scale-105">
              <EditableIcon
                name={u.card2Icon}
                namePath="utilities.card2Icon"
                filled={u.card2IconFilled}
                fillPath="utilities.card2IconFilled"
                defaultIcon="Heart"
                defaultFilled={true}
                className="size-6 sm:size-6.5 text-[#facc15]"
              />
            </div>

            {/* Title & Subtitle */}
            <EditableText
              as="h3"
              value={u.card2Title}
              path="utilities.card2Title"
              className="mt-6 text-xl sm:text-[22px] font-black text-[#1c0836] tracking-tight"
            />
            <EditableText
              as="p"
              value={u.card2Badge}
              path="utilities.card2Badge"
              className="mt-1 text-sm sm:text-[15px] font-bold text-[#059669]"
            />

            {/* Description */}
            <EditableText
              as="p"
              value={u.card2Desc}
              path="utilities.card2Desc"
              multiline
              className="mt-5 text-xs sm:text-[13.5px] leading-relaxed text-[#594772]"
            />
          </div>

        </div>

      </div>
    </section>
  )
}
