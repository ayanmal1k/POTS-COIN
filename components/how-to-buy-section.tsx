'use client'

import React, { useState } from 'react'
import {
  Check,
  Copy,
  ExternalLink,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Send,
  Zap,
} from 'lucide-react'
import { useContent } from '@/context/content-context'
import { EditableText, EditableButton } from '@/components/visual-editor/editable'
import { EditableIcon } from '@/components/visual-editor/icon-library'
import { CustomPawPrint, PawPrint3DWatermark } from '@/components/why-pot-icons'

export function HowToBuySection() {
  const { content } = useContent()
  const [copied, setCopied] = useState(false)

  const h = content.howToBuy
  const contractAddress = content.global.solanaContractAddress

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const defaultStepIcons = ['Wallet', 'Coins', 'Compass', 'Rocket']

  return (
    <section
      id="how-to-buy"
      className="how-to-buy-section relative w-full overflow-hidden py-20 sm:py-24 lg:py-32 text-white"
      style={{
        background: `
          radial-gradient(ellipse 85% 65% at 50% -10%, rgba(168, 85, 247, 0.42) 0%, transparent 65%),
          radial-gradient(circle at 85% 35%, rgba(192, 132, 252, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 15% 75%, rgba(147, 51, 234, 0.28) 0%, transparent 50%),
          linear-gradient(145deg, #180538 0%, #290a60 45%, #150330 100%)
        `,
      }}
    >
      {/* Ambient background glow flares matching Hero and Mission */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[650px] sm:size-[800px] bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-[450px] bg-[radial-gradient(circle,rgba(192,132,252,0.18)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Floating Purple Paw Prints in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CustomPawPrint className="absolute top-[12%] left-[6%] size-14 text-[#c084fc]/18 rotate-[-22deg]" />
        <CustomPawPrint className="absolute top-[18%] right-[8%] size-16 text-[#c084fc]/22 rotate-[18deg]" />
        <CustomPawPrint className="absolute bottom-[16%] left-[12%] size-13 text-[#c084fc]/15 rotate-[32deg]" />
        <CustomPawPrint className="absolute bottom-[22%] right-[14%] size-15 text-[#c084fc]/20 rotate-[-16deg]" />
      </div>

      {/* Giant 3D Sculpted Paw Watermark in background */}
      <div className="absolute -top-12 -left-12 sm:-top-8 sm:-left-8 w-[320px] sm:w-[420px] aspect-square pointer-events-none select-none opacity-20 sm:opacity-30 z-0">
        <PawPrint3DWatermark className="w-full h-full drop-shadow-[0_20px_45px_rgba(20,3,45,0.75)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 xl:px-18">
        
        {/* ================= 1. SECTION HEADER (Centered & Editorial) ================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 text-[#ffe066]" />
            <EditableText
              as="span"
              value={h.eyebrow}
              path="howToBuy.eyebrow"
              className="text-[10.5px] sm:text-xs font-black tracking-[0.24em] uppercase text-[#e9d5ff]"
            />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-[54px] font-black tracking-[-0.035em] text-white leading-[1.08]">
            <EditableText
              value={h.heading}
              path="howToBuy.heading"
            />{' '}
            <EditableText
              value={h.headingHighlight}
              path="howToBuy.headingHighlight"
              className="bg-gradient-to-r from-[#ffe066] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent drop-shadow-[0_4px_22px_rgba(245,158,11,0.45)] inline-block"
            />
          </h2>

          {/* Subtitle */}
          <EditableText
            as="p"
            value={h.description}
            path="howToBuy.description"
            multiline
            className="text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#f3e8ff]/85 max-w-2xl"
          />

        </div>

        {/* ================= 2. SEAMLESS FLOATING CONTRACT & ACTION BAR ================= */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-[#b56fff]/50 bg-gradient-to-r from-[#1b0838]/90 via-[#260b4e]/85 to-[#170630]/90 p-3.5 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_32px_rgba(168,85,247,0.3)] backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Left: Solana Logo & Contract Address with Click-to-Copy */}
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 w-full">
                <div className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl bg-black/70 border border-white/15 shadow-inner">
                  <img src="/solana-logo.svg" alt="Solana" className="size-6 sm:size-7" />
                </div>
                
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-purple-200/70">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <EditableText
                      value={h.contractLabel}
                      path="howToBuy.contractLabel"
                    />
                  </div>
                  <span className="block truncate font-mono text-xs sm:text-[13.5px] font-bold tracking-tight text-white select-all mt-0.5">
                    {contractAddress}
                  </span>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyAddress}
                  title={copied ? 'Copied to clipboard!' : 'Copy contract address'}
                  className={`grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl border transition-all active:scale-90 ${
                    copied
                      ? 'border-emerald-500/70 bg-emerald-500/25 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                      : 'border-white/15 bg-white/10 text-white hover:bg-white/20 hover:border-white/30'
                  }`}
                  aria-label="Copy contract address"
                >
                  {copied ? <Check size={18} /> : <Copy size={17} />}
                </button>
              </div>

              {/* Right: Direct CTA Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0 justify-center">
                <EditableButton
                  text={h.buyButtonText}
                  textPath="howToBuy.buyButtonText"
                  link={h.buyButtonLink}
                  linkPath="howToBuy.buyButtonLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9c3eff] via-[#b24eff] to-[#cb7dff] px-6 py-3 text-xs sm:text-sm font-black text-white shadow-[0_0_24px_rgba(168,62,255,0.6)] transition-all hover:scale-105 active:scale-95"
                  icon={<ExternalLink size={14} className="text-white" />}
                />

                <EditableButton
                  text={h.chartButtonText}
                  textPath="howToBuy.chartButtonText"
                  link={h.chartButtonLink}
                  linkPath="howToBuy.chartButtonLink"
                  className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 px-5 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                  icon={<TrendingUp size={15} className="text-emerald-400" />}
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 3. 4-STEP GUIDE (FADING VIEW, NO CARDS, WITH ICONS) ================= */}
        
        {/* DESKTOP (lg+) 4-COLUMN HORIZONTAL FADING VIEW */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          
          {/* Luminous horizontal connecting beam running behind icons */}
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#c084fc]/50 to-transparent pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 xl:gap-10 items-start">
            {h.steps.map((step, idx) => {
              const defIcon = defaultStepIcons[idx % defaultStepIcons.length]
              return (
                <div
                  key={step.stepNumber + idx}
                  className="relative flex flex-col items-center lg:items-start text-center lg:text-left group pt-2"
                >
                  {/* Faded Giant Watermark Number in background */}
                  <span className="font-mono font-black text-7xl xl:text-8xl text-white/[0.04] select-none pointer-events-none absolute -top-8 right-2 lg:-right-1 tracking-tighter transition-all duration-300 group-hover:text-purple-300/[0.08]">
                    {step.stepNumber}
                  </span>

                  {/* Ambient radial glow behind the icon orb */}
                  <div className="absolute top-0 size-24 rounded-full bg-[#c084fc]/15 blur-2xl pointer-events-none group-hover:bg-[#c084fc]/25 transition-all duration-300" />

                  {/* Glowing 3D Glass Icon Node */}
                  <div className="relative z-10 size-16 sm:size-18 shrink-0 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_28px_rgba(192,132,252,0.65),inset_0_2px_4px_rgba(255,255,255,0.6)] ring-1 ring-white/35 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(216,180,254,0.9)]">
                    <EditableIcon
                      name={step.icon}
                      namePath={`howToBuy.steps.${idx}.icon`}
                      filled={step.iconFilled}
                      fillPath={`howToBuy.steps.${idx}.iconFilled`}
                      defaultIcon={defIcon}
                      defaultFilled={true}
                      className="size-7 sm:size-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Step Pill / Number */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#c084fc] shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                    <EditableText
                      as="span"
                      value={step.stepBadge}
                      path={`howToBuy.steps.${idx}.stepBadge`}
                      className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c084fc]"
                    />
                  </div>

                  {/* Step Title */}
                  <EditableText
                    as="h3"
                    value={step.title}
                    path={`howToBuy.steps.${idx}.title`}
                    className="mt-2 text-xl sm:text-2xl font-black text-white tracking-tight leading-snug"
                  />

                  {/* Step Description with fading view typography */}
                  <EditableText
                    as="p"
                    value={step.description}
                    path={`howToBuy.steps.${idx}.description`}
                    multiline
                    className="mt-3 text-xs sm:text-sm lg:text-[13.5px] leading-relaxed text-[#f3e8ff]/80 font-normal"
                  />

                  {/* Delicate fading accent beam under step */}
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[#c084fc]/50 via-purple-400/20 to-transparent mt-6 group-hover:w-28 transition-all duration-300" />

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

