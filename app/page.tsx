'use client'

import { ArrowRight, Check, Copy, Heart, Menu, PawPrint, Send, Shield, ShieldCheck, Users, Wallet, X } from 'lucide-react'
import { useState } from 'react'
import { WhyPotSection } from '@/components/why-pot-section'

function Brand() {
  return (
    <a href="#home" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white group">
      <span className="grid size-8 sm:size-9 place-items-center rounded-full border-2 border-[#b87aff] bg-[#4b1e9d] text-lg sm:text-xl font-black text-white shadow-[0_0_18px_#a747ff] transition-transform duration-200 group-hover:scale-105">
        e
      </span>
      <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">EpiCoin</span>
    </a>
  )
}

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const address = 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw'

  const copyAddress = async () => {
    try {
      await navigator.clipboard?.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="home" className="hero-section relative w-full overflow-hidden text-white">
      {/* Top Header / Navigation */}
      <header className="relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16 xl:px-20">
        <Brand />
        <nav
          className={`${
            mobileOpen
              ? 'absolute left-4 right-4 top-20 flex flex-col gap-5 rounded-2xl border border-white/15 bg-[#1b083c]/95 p-6 shadow-2xl backdrop-blur-xl'
              : 'hidden'
          } z-30 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 text-xs font-semibold tracking-wide text-white/80`}
        >
          {['Home', 'Mission', 'Ecosystem', 'Roadmap', 'Token', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={index === 0 ? '#home' : `#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`transition-colors duration-200 hover:text-white ${
                index === 0 ? 'border-b-2 border-white pb-1 text-white' : ''
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#utilities"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#9c3eff] to-[#c67aff] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_20px_rgba(156,62,255,0.45)] transition duration-200 hover:scale-105 active:scale-95 lg:flex"
          >
            Join Community <Send size={13} className="fill-white" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Hero Content - Centered on mobile, left-aligned on desktop */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-center lg:justify-start px-5 sm:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-10 lg:pt-14 pb-[420px] sm:pb-[480px] lg:pb-28 xl:pb-36">
        <div className="flex w-full max-w-[540px] xl:max-w-[590px] flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b87aff]/35 bg-[#3c146e]/50 px-3.5 py-1 text-[11px] sm:text-xs font-semibold tracking-wide text-[#e3beff] backdrop-blur-md shadow-[0_0_16px_rgba(184,122,255,0.25)]">
            <span className="size-1.5 rounded-full bg-[#d08bff] animate-pulse" />
            <span>$POT Luck Community (PLC)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black leading-[1.05] tracking-[-0.035em] text-white">
            The EpiCoin<br />
            <span className="bg-gradient-to-r from-[#e3b8ff] via-[#b366ff] to-[#df9aff] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(168,82,255,0.65)] inline-block">
              Ecosystem
            </span>
          </h1>

          {/* 100% Verified Transparency Badge */}
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b56fff]/55 bg-[#7526de]/30 px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-bold text-white shadow-[0_0_25px_rgba(160,65,255,0.45)] backdrop-blur-md">
              <ShieldCheck className="size-4 sm:size-4.5 text-[#3df586] shrink-0" />
              <span>100% Verified Transparency</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-white/85 max-w-[470px]">
            Welcome to the $POT Luck Community (PLC), a community-driven Solana meme coin built on transparency, organic growth, and real-world charitable impact.
          </p>

          {/* Contract Address Card */}
          <div className="w-full max-w-[460px] rounded-2xl border border-[#9d4eff]/45 bg-[#170932]/85 p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_24px_rgba(150,65,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-[#bf7bff]/80 hover:shadow-[0_0_32px_rgba(168,82,255,0.45)] text-left">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                <div className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-black/60 border border-white/10 shadow-inner">
                  <img src="/solana-logo.svg" alt="Solana Logo" className="size-5 sm:size-5.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-medium tracking-wider uppercase text-white/55">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Contract Address (SPL)</span>
                  </div>
                  <span className="block truncate font-mono text-[11px] min-[400px]:text-[11.5px] sm:text-xs font-semibold tracking-tight text-white/95 select-all">
                    {address}
                  </span>
                </div>
              </div>
              <button
                onClick={copyAddress}
                title={copied ? "Copied!" : "Copy address"}
                className={`grid size-9 shrink-0 place-items-center rounded-xl border transition-all active:scale-90 ${
                  copied
                    ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                    : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
                }`}
                aria-label="Copy contract address"
              >
                {copied ? <Check size={16} /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full max-w-[460px] flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="#mission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9c3eff] via-[#ad4eff] to-[#cb7dff] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_26px_rgba(168,62,255,0.55),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(174,79,255,0.75)] active:scale-[0.98]"
            >
              <span>Join the Community</span>
              <Send size={13} className="fill-white" />
            </a>
            <a
              href="#ecosystem"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#ab5cf2]/60 bg-white/[0.04] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_18px_rgba(156,67,255,0.18)] backdrop-blur-md transition-all duration-200 hover:border-[#bf7bff] hover:bg-white/[0.12] hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(170,91,240,0.4)] active:scale-[0.98]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MissionSection() {
  const points = [
    {
      icon: Heart,
      title: 'Reach $100K Market Cap',
      text: "Donate 12 SOL to St. Jude Children's Research Hospital.",
    },
    {
      icon: Shield,
      title: 'Full Transparency',
      text: 'Public charity wallet on-chain. Track our progress.',
    },
    {
      icon: Users,
      title: 'Real Community',
      text: 'No insider groups. No artificial hype. Just people with a purpose.',
    },
  ]

  return (
    <section id="mission" className="mission-section relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background ambient decorative elements */}
      <div className="absolute -right-24 top-10 size-96 rounded-full bg-[#e8c8ff]/40 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-10 size-80 rounded-full bg-[#f1ddff]/50 blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-12 sm:gap-14 px-6 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20 lg:px-16 xl:px-20">
        {/* Left Column: Text & Features */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#7c2ae8]">
            OUR MISSION
          </p>
          <h2 className="mt-3 text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-black tracking-[-0.035em] text-[#1c0836] leading-[1.08]">
            More Than a Meme Coin
          </h2>
          <p className="mt-4 sm:mt-5 max-w-[540px] text-base sm:text-lg lg:text-[17px] leading-relaxed text-[#432d5e]">
            We’re building a transparent, organic, peer-to-peer community focused on sustainable growth and meaningful impact. PLC represents the philanthropic heart of the EpiCoin ecosystem.
          </p>

          <div className="mt-9 sm:mt-11 w-full space-y-6 sm:space-y-8 max-w-[560px]">
            {points.map(({ icon: Icon, title, text }) => (
              <div className="flex items-start gap-4 sm:gap-5 text-left" key={title}>
                <span className="grid size-12 sm:size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#a855f7] via-[#8638ea] to-[#6819d4] shadow-[0_8px_22px_rgba(134,56,234,0.36)] transition-transform duration-200 hover:scale-105">
                  <Icon className="size-6 sm:size-6.5 text-white fill-white" />
                </span>
                <div className="pt-0.5 sm:pt-1">
                  <h3 className="text-base sm:text-lg lg:text-[19px] font-black text-[#1c0836] tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-[#594772]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Polaroid Image & Accents */}
        <div className="relative mx-auto flex w-full max-w-[520px] lg:max-w-[580px] items-center justify-center pt-4 lg:pt-0">
          {/* Soft floating decorative petals / sparkles */}
          <span className="absolute top-1/3 -left-2 size-3.5 rounded-full bg-[#b87aff]/35 blur-[1px] pointer-events-none" />
          <span className="absolute bottom-1/4 -right-1 size-3 rounded-full bg-[#8638ea]/30 blur-[1px] pointer-events-none" />

          {/* Subtle paw print watermark */}
          <PawPrint className="absolute -bottom-4 left-6 size-20 sm:size-28 text-[#8638ea]/12 rotate-[-22deg] pointer-events-none select-none" />

          {/* Polaroid Image from public */}
          <div className="relative z-[1] w-full filter drop-shadow-[0_20px_40px_rgba(40,10,70,0.18)] transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/mission-polaroid.webp"
              alt="Together We Make A Difference - Golden Retriever holding purple heart"
              className="w-full h-auto object-contain select-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <WhyPotSection />
    </main>
  )
}
