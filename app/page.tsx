'use client'

import { ArrowRight, Check, Copy, Heart, Menu, PawPrint, Send, ShieldCheck, Users, Wallet, X } from 'lucide-react'
import { useState } from 'react'

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
  const address = 'GUtUrPOwfJDj3WTb2dEe289UnLtG1GGdBMreFtDXJaEw'

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

      {/* Hero Content - Edge-to-edge layout, text aligned to left */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-6 sm:pt-10 lg:pt-14 pb-[420px] sm:pb-[480px] lg:pb-28 xl:pb-36">
        <div className="w-full max-w-[540px] xl:max-w-[590px] space-y-5 sm:space-y-6">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#dcadff]">
            $POT Luck Community (PLC)
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black leading-[1.04] tracking-[-0.035em] text-white">
            The EpiCoin<br />
            <span className="bg-gradient-to-r from-[#e3b8ff] via-[#a852ff] to-[#df9aff] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(168,82,255,0.65)] inline-block">
              Ecosystem
            </span>
          </h1>

          {/* 100% Verified Transparency Badge */}
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#b56fff]/55 bg-[#7526de]/30 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-[0_0_25px_rgba(160,65,255,0.45)] backdrop-blur-md">
              <ShieldCheck className="size-4 sm:size-5 text-white shrink-0" />
              <span>100% Verified Transparency</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-white/85 max-w-[470px]">
            Welcome to the $POT Luck Community (PLC), a community-driven Solana meme coin built on transparency, organic growth, and real-world charitable impact.
          </p>

          {/* Contract Address Card */}
          <div className="flex w-full max-w-[480px] items-center justify-between gap-3 rounded-2xl border border-[#9d4eff]/45 bg-[#170932]/75 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_22px_rgba(150,65,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-[#bf7bff]/75 hover:shadow-[0_0_30px_rgba(168,82,255,0.4)]">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-black/60 border border-white/10 shadow-inner">
                <img src="/solana-logo.svg" alt="Solana Logo" className="size-5.5 sm:size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-medium tracking-wide text-white/55">
                  Contract Address
                </span>
                <span className="block truncate font-mono text-[11px] sm:text-xs font-semibold text-white/95 select-all">
                  {address}
                </span>
              </div>
            </div>
            <button
              onClick={copyAddress}
              title={copied ? "Copied!" : "Copy address"}
              className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/75 transition-all hover:bg-white/15 hover:text-white active:scale-90"
              aria-label="Copy contract address"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={15} />}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#utilities"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9c3eff] via-[#ad4eff] to-[#cb7dff] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_26px_rgba(168,62,255,0.55),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(174,79,255,0.75)] active:scale-[0.98]"
            >
              <span>Join the Community</span>
              <Send size={13} className="fill-white" />
            </a>
            <a
              href="#utilities"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ab5cf2]/60 bg-white/[0.04] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_18px_rgba(156,67,255,0.18)] backdrop-blur-md transition-all duration-200 hover:border-[#bf7bff] hover:bg-white/[0.12] hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(170,91,240,0.4)] active:scale-[0.98]"
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
    { icon: Heart, title: 'Reach $100K Market Cap', text: "Donate 12 SOL to St. Jude Children's Research Hospital." },
    { icon: ShieldCheck, title: 'Full Transparency', text: 'Public charity wallet on-chain. Track our progress.' },
    { icon: Users, title: 'Real Community', text: 'No insider groups. No artificial hype. Just people with a purpose.' }
  ]

  return (
    <section id="mission" className="mission-section relative overflow-hidden">
      <div className="absolute -right-16 top-5 text-[130px] text-[#d6a1ff]/25 select-none pointer-events-none">✦</div>
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="eyebrow">OUR MISSION</p>
          <h2 className="section-title">More Than a Meme Coin</h2>
          <p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[#312052]">
            We’re building a transparent, organic, peer-to-peer community focused on sustainable growth and meaningful impact. PLC represents the philanthropic heart of the EpiCoin ecosystem.
          </p>
          <div className="mt-7 space-y-5">
            {points.map(({ icon: Icon, title, text }) => (
              <div className="flex items-center gap-4" key={title}>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#bd5cff] to-[#6e26de] text-white shadow-lg">
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="text-xs font-extrabold text-[#25113f]">{title}</h3>
                  <p className="mt-0.5 text-[10px] leading-snug text-[#584b6b]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[430px] rotate-[-7deg] rounded-[22px] border-[10px] border-white bg-[#f2d7ff] p-3 shadow-[0_20px_35px_#57278c26]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#f6e7ff] to-[#d6a8f5] pt-5">
            <img src="/dog.png" alt="EpiCoin mascot holding a heart" className="mx-auto w-[75%]" />
            <div className="absolute bottom-5 left-0 right-0 text-center text-2xl font-black leading-[.95] text-white drop-shadow-md">
              Together<br />We Make A<br />Difference <span className="text-[#d649ff]">♥</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function UtilitiesSection() {
  const cards = [
    { icon: Wallet, title: 'Financial Utility', heading: '$OL Reflection Rewards', text: '3% of trading activity in $OL distributed to holders.', foot: 'Rewards depend on volume, fees and project needs.' },
    { icon: Heart, title: 'Impact Utility', heading: 'Community-Powered Charity', text: 'Reach $100K market cap and donate 12 SOL to St. Jude.', foot: 'Your hold helps us grow and give back.' },
    { icon: PawPrint, title: 'Organic Growth', heading: 'No paid pumps.', text: 'No artificial hype. No paid pumps. Only real people, real activity, real community.', foot: 'Together we grow. Together we give.' }
  ]

  return (
    <section id="ecosystem" className="utilities-section relative overflow-hidden text-white">
      <div className="absolute -right-20 top-8 size-72 rounded-full bg-[#a239ff]/20 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-20">
        <p className="eyebrow text-[#d2a5ff]">WHY $POT LUCK</p>
        <h2 className="section-title text-white">Two Utilities. One Mission.</h2>
        <p className="mt-3 text-sm text-white/80">$POT Luck combines holder rewards with charitable impact.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, heading, text, foot }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[.08] p-5 shadow-[inset_0_1px_0_#fff2] backdrop-blur transition hover:-translate-y-1 hover:bg-white/[.12]">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#c969ff] to-[#7027d7] shadow-[0_0_22px_#af43ff88]">
                  <Icon size={21} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold">{title}</h3>
                  <h4 className="mt-1 text-xs font-bold text-[#d7aaff]">{heading}</h4>
                  <p className="mt-3 text-xs leading-relaxed text-white/80">{text}</p>
                  <p className="mt-4 text-[10px] leading-relaxed text-white/50">{foot}</p>
                </div>
              </div>
            </article>
          ))}
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
      <UtilitiesSection />
    </main>
  )
}
