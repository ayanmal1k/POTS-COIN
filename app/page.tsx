'use client'

import { ArrowRight, Check, Copy, Heart, Menu, PawPrint, Send, Shield, ShieldCheck, TrendingUp, Users, Wallet, X } from 'lucide-react'
import { useState } from 'react'
import { WhyPotSection } from '@/components/why-pot-section'
import { PawPrint3DWatermark, CustomPawPrint } from '@/components/why-pot-icons'
import { StJudePartnershipSection } from '@/components/st-jude-partnership'
import { RoadmapSection } from '@/components/roadmap-section'
import { TokenInfoSection } from '@/components/token-info-section'
import { ContactFooterSection } from '@/components/contact-footer-section'

function Brand() {
  return (
    <a href="#home" className="flex items-center gap-2.5 sm:gap-3 text-lg font-extrabold tracking-tight text-white group transition-transform duration-200 hover:scale-105">
      <div className="grid size-10 sm:size-11 md:size-12 shrink-0 place-items-center rounded-full bg-white p-1 shadow-[0_0_18px_rgba(255,255,255,0.4)] border border-white/80 overflow-hidden">
        <img
          src="/logo.png"
          alt="EpiCoin Logo"
          className="size-full object-contain"
        />
      </div>
      <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#e9d5ff]">
        EpiCoin
      </span>
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
    <section
      id="home"
      className="hero-section relative w-full overflow-hidden text-white min-h-[640px] sm:min-h-[680px] lg:min-h-[760px] xl:min-h-[850px] flex flex-col justify-between"
      style={{
        background: `
          radial-gradient(ellipse 85% 65% at 50% -12%, rgba(168, 85, 247, 0.48) 0%, transparent 65%),
          radial-gradient(circle at 85% 30%, rgba(192, 132, 252, 0.32) 0%, transparent 45%),
          radial-gradient(circle at 15% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
          linear-gradient(145deg, #180538 0%, #290a60 40%, #150330 100%)
        `,
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] sm:size-[800px] bg-[radial-gradient(circle,rgba(168,85,247,0.32)_0%,transparent_60%)] blur-3xl pointer-events-none" />

      {/* Floating Purple Paw Prints scattered in Background (exact match to reference image) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CustomPawPrint className="absolute top-[20%] left-[44%] size-13 sm:size-15 text-[#c084fc]/28 rotate-[-18deg]" />
        <CustomPawPrint className="absolute top-[17%] right-[32%] size-15 sm:size-17 text-[#c084fc]/32 rotate-[22deg]" />
        <CustomPawPrint className="absolute top-[48%] left-[38%] size-12 sm:size-14 text-[#c084fc]/22 rotate-[35deg]" />
        <CustomPawPrint className="absolute top-[40%] right-[27%] size-15 sm:size-17 text-[#c084fc]/30 rotate-[-12deg]" />
        <CustomPawPrint className="absolute top-[12%] right-[10%] size-14 text-[#c084fc]/20 rotate-[15deg]" />
        <CustomPawPrint className="absolute top-[32%] left-[6%] size-13 text-[#c084fc]/15 rotate-[-28deg]" />
      </div>

      {/* Top Header / Navigation */}
      <header className="relative z-30 mx-auto flex w-full max-w-none items-center justify-between px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-24 py-3.5">
        <Brand />
        <nav
          className={`${mobileOpen
              ? 'absolute left-4 right-4 top-20 flex flex-col gap-5 rounded-2xl border border-white/15 bg-[#1b083c]/95 p-6 shadow-2xl backdrop-blur-xl'
              : 'hidden'
            } z-30 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 text-xs font-semibold tracking-wide text-white/80`}
        >
          {['Home', 'Ecosystem', 'Mission', 'Partnership', 'Roadmap', 'Token', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={index === 0 ? '#home' : `#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`transition-colors duration-200 hover:text-white ${index === 0 ? 'border-b-2 border-white pb-1 text-white' : ''
                }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/epicoins"
            target="_blank"
            rel="noopener noreferrer"
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

      {/* Main Hero Content Area */}
      <div className="relative z-20 mx-auto w-full max-w-none px-6 sm:px-10 md:px-12 lg:px-12 xl:px-16 2xl:px-24 pt-4 sm:pt-6 lg:pt-5 pb-10 lg:pb-0 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-4 xl:gap-8 items-center lg:items-stretch min-h-[510px] lg:min-h-[570px] xl:min-h-[640px]">
          
          {/* Top/Left Column: Headline, Description & Action Buttons */}
          <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 z-20 py-2 sm:py-4 lg:py-8 w-full max-w-[520px] md:max-w-[620px] lg:max-w-[560px] mx-auto lg:mx-0">
            {/* Main Headline */}
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-[52px] lg:text-[46px] xl:text-[54px] 2xl:text-[60px] font-black leading-[1.08] tracking-[-0.03em] text-white">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-[#ffe066] via-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent drop-shadow-[0_4px_22px_rgba(245,158,11,0.45)]">
                $POT Luck
              </span>{' '}
              Community (PLC)
            </h1>

            {/* Text right beneath main heading */}
            <p className="text-xs sm:text-[13px] md:text-sm font-black tracking-[0.24em] uppercase text-[#e9d5ff]/90">
              The EpiCoin Ecosystem
            </p>

            {/* 100% Verified Transparency Badge */}
            <div className="flex justify-center lg:justify-start pt-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b56fff]/55 bg-[#7526de]/30 px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-[13px] md:text-sm font-bold text-white shadow-[0_0_25px_rgba(160,65,255,0.45)] backdrop-blur-md">
                <ShieldCheck className="size-4 sm:size-4.5 md:size-5 text-[#3df586] shrink-0" />
                <span>100% Verified Transparency</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-[14.5px] leading-relaxed text-white/85 max-w-[480px] md:max-w-[580px]">
              PLC combines meme culture with real-world impact to transform the lives of vulnerable children.
            </p>

            {/* Contract Address Card - expansive on iPad */}
            <div className="w-full max-w-[480px] md:max-w-[580px] rounded-2xl border border-[#9d4eff]/45 bg-[#170932]/85 p-2.5 sm:p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_24px_rgba(150,65,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-[#bf7bff]/80 hover:shadow-[0_0_32px_rgba(168,82,255,0.45)] text-left">
              <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3.5">
                  <div className="grid size-9 sm:size-10 md:size-11 shrink-0 place-items-center rounded-xl bg-black/60 border border-white/10 shadow-inner">
                    <img src="/solana-logo.svg" alt="Solana Logo" className="size-5 sm:size-5.5 md:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-white/55">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Contract Address (SPL)</span>
                    </div>
                    <span className="block truncate font-mono text-[11px] min-[400px]:text-[11.5px] sm:text-xs md:text-[13px] font-semibold tracking-tight text-white/95 select-all">
                      {address}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyAddress}
                  title={copied ? "Copied!" : "Copy address"}
                  className={`grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl border transition-all active:scale-90 ${copied
                      ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                      : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
                    }`}
                  aria-label="Copy contract address"
                >
                  {copied ? <Check size={16} /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* CTA Buttons: Join the Community & View $POT live chart */}
            <div className="flex w-full max-w-[480px] md:max-w-[580px] flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="https://t.me/epicoins"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#9c3eff] via-[#ad4eff] to-[#cb7dff] px-7 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm md:text-base font-bold text-white shadow-[0_0_26px_rgba(168,62,255,0.55),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(174,79,255,0.75)] active:scale-[0.98]"
              >
                <span>Join the Community</span>
                <Send size={15} className="fill-white" />
              </a>

              <a
                href="#chart"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 hover:bg-white/15 hover:border-white/60 px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm md:text-base font-bold text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>View $POT live chart</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Spacer Column on Desktop so text does not overlap dog */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-4 2xl:col-span-4 pointer-events-none" />

          {/* Center Column on Mobile & iPad (similar to mobile, but wider and bigger on md) */}
          <div className="block lg:hidden w-full relative z-10 py-4 sm:py-6 md:py-8">
            <div className="relative mx-auto max-w-[340px] sm:max-w-[420px] md:max-w-[520px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#9333ea]/45 via-[#c084fc]/25 to-transparent blur-3xl pointer-events-none" />
              <img
                src="/dog.png"
                alt="$POT Mascot Dog"
                className="relative z-10 w-full h-auto object-contain select-none filter drop-shadow-[0_24px_50px_rgba(10,2,25,0.8)]"
                loading="eager"
              />
            </div>
          </div>

          {/* Bottom on Mobile/iPad & Right on Desktop: St. Jude Card - wider and bigger on md */}
          <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-4 flex items-center justify-center lg:justify-end z-20 py-2 sm:py-4 lg:py-8 w-full">
            <div className="w-full max-w-[360px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[370px] xl:max-w-[410px] rounded-[32px] sm:rounded-[36px] md:rounded-[40px] border border-[#a855f7]/45 bg-gradient-to-b from-[#240a4b]/85 via-[#1a0736]/90 to-[#120326]/95 backdrop-blur-xl p-6 sm:p-7 md:p-9 xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(168,85,247,0.22)] transition-all duration-300 hover:border-[#c084fc]/60 space-y-5 md:space-y-6">
              
              {/* Card Top: 3D Heart + Supporting Text */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="size-11 sm:size-12 md:size-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#6b21a8] flex items-center justify-center shadow-[0_0_24px_rgba(192,132,252,0.7)]">
                  <Heart className="size-6 md:size-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                </div>
                <div>
                  <span className="block text-xs md:text-sm font-semibold text-purple-200/80 uppercase tracking-wider">
                    Supporting
                  </span>
                  <h4 className="text-base sm:text-lg md:text-xl font-extrabold text-white leading-tight">
                    St. Jude Children&apos;s<br />Research Hospital
                  </h4>
                </div>
              </div>

              {/* Card Middle: Milestone Goal + Arrow Link */}
              <div className="flex items-center justify-between gap-3 pt-3 pb-3 border-t border-white/10">
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#f3e8ff]/90">
                  When we reach a $100K market cap, we donate <strong className="text-[#fbbf24] font-black text-sm sm:text-base md:text-lg">12 SOL</strong> to St. Jude.
                </p>

                <a
                  href="#partnership"
                  className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-full bg-[#7c2ae8] text-white hover:bg-[#9333ea] shadow-[0_0_18px_rgba(124,42,232,0.8)] transition-all hover:scale-110 active:scale-95"
                  aria-label="View St. Jude details"
                >
                  <ArrowRight className="size-4 md:size-5" />
                </a>
              </div>

              {/* Card Bottom: St. Jude Logo All White using CSS + Permanent Pure White PNG */}
              <div className="pt-4 border-t border-white/10 flex flex-col items-center justify-center">
                <img
                  src="/st-jude-logo-white.png"
                  alt="St. Jude Children's Research Hospital"
                  style={{
                    filter: 'brightness(0) invert(1)',
                    WebkitFilter: 'brightness(0) invert(1)',
                  }}
                  className="h-24 sm:h-28 md:h-34 lg:h-28 xl:h-32 w-auto object-contain filter brightness-0 invert opacity-95 hover:opacity-100 transition-opacity drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Center Big Dog Mascot Attached Flush to the Bottom of Section on Big Screens (lg+) */}
      <div className="hidden lg:flex absolute bottom-0 left-[53%] xl:left-[54%] 2xl:left-[55%] -translate-x-[50%] pointer-events-none select-none z-10 items-end justify-center">
        {/* Glow behind dog paws and body */}
        <div className="absolute bottom-0 size-[500px] xl:size-[600px] rounded-full bg-gradient-to-t from-[#9333ea]/45 via-[#c084fc]/25 to-transparent blur-3xl pointer-events-none" />
        <img
          src="/dog.png"
          alt="$POT Mascot Dog"
          className="relative z-10 w-auto h-[630px] lg:h-[735px] xl:h-[810px] 2xl:h-[870px] max-w-none object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(10,2,25,0.8)]"
          loading="eager"
        />
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
    <section
      id="mission"
      className="mission-section relative overflow-hidden py-20 sm:py-24 lg:py-32 text-white"
      style={{
        background: `
          radial-gradient(circle at 80% 25%, rgba(192, 132, 252, 0.35) 0%, transparent 45%),
          radial-gradient(circle at 18% 60%, rgba(168, 85, 247, 0.3) 0%, transparent 45%),
          radial-gradient(ellipse 90% 65% at 50% -10%, rgba(147, 51, 234, 0.4) 0%, transparent 60%),
          linear-gradient(135deg, #2a0a6b 0%, #3e1284 45%, #230752 100%)
        `,
      }}
    >
      {/* Ambient purple backlight matching former utilities section */}
      <div className="absolute top-0 right-1/4 size-[550px] bg-[radial-gradient(circle,rgba(168,85,247,0.28)_0%,transparent_65%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-10 size-[450px] bg-[radial-gradient(circle,rgba(192,132,252,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Giant 3D Sculpted Purple Paw Print in the Upper Right Background */}
      <div className="absolute -top-10 -right-6 sm:-top-6 sm:right-4 md:right-10 lg:right-16 xl:right-24 w-[320px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] aspect-square pointer-events-none select-none opacity-40 sm:opacity-55 lg:opacity-75 z-0 transition-opacity">
        <PawPrint3DWatermark className="w-full h-full drop-shadow-[0_20px_45px_rgba(20,3,45,0.75)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1360px] items-center gap-12 sm:gap-14 px-6 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20 lg:px-16 xl:px-20">
        {/* Left Column: Text & Features */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-[11px] sm:text-xs font-black tracking-[0.22em] uppercase text-[#e9d5ff]">
            OUR MISSION
          </p>
          <h2 className="mt-3 text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-black tracking-[-0.035em] text-white leading-[1.08]">
            More Than a Meme Coin
          </h2>
          <p className="mt-4 sm:mt-5 max-w-[540px] text-base sm:text-lg lg:text-[17px] leading-relaxed text-[#f3e8ff]/90">
            We’re building a transparent, organic, peer-to-peer community focused on sustainable growth and meaningful impact. PLC represents the philanthropic heart of the EpiCoin ecosystem.
          </p>

          <div className="mt-9 sm:mt-11 w-full space-y-6 sm:space-y-8 max-w-[560px]">
            {points.map(({ icon: Icon, title, text }) => (
              <div className="flex items-start gap-4 sm:gap-5 text-left" key={title}>
                <span className="grid size-12 sm:size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_24px_rgba(192,132,252,0.8),inset_0_2px_4px_rgba(255,255,255,0.6)] ring-1 ring-white/35 transition-transform duration-200 hover:scale-105">
                  <Icon className="size-6 sm:size-6.5 text-white fill-white" />
                </span>
                <div className="pt-0.5 sm:pt-1">
                  <h3 className="text-base sm:text-lg lg:text-[19px] font-black text-white tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-[#f3e8ff]/80">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Polaroid Image & Accents */}
        <div className="relative mx-auto flex w-full max-w-[520px] lg:max-w-[580px] items-center justify-center pt-4 lg:pt-0">
          {/* Polaroid Image from public */}
          <div className="relative z-[1] w-full filter drop-shadow-[0_24px_50px_rgba(10,2,25,0.65)] transition-transform duration-300 hover:scale-[1.02]">
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
      <WhyPotSection />
      <MissionSection />
      <StJudePartnershipSection />
      <RoadmapSection />
      <TokenInfoSection />
      <ContactFooterSection />
    </main>
  )
}
