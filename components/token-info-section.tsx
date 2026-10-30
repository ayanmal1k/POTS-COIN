'use client'

import React, { useState } from 'react'
import {
  Check,
  Copy,
  ExternalLink,
  TrendingUp,
  Moon,
  Sun,
  Activity,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'

const TOKEN_SPECS = [
  { label: 'Token Name', value: 'POT Luck' },
  { label: 'Ticker', value: '$POT / PLC', isTicker: true },
  { label: 'Blockchain', value: 'Solana', isChain: true },
  {
    label: 'Contract Address',
    value: 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw',
    isAddress: true,
  },
]

const KEY_FEATURES = [
  'Community-driven development focused on organic participation.',
  'A holder reward mechanism designed around 3% SOL reflections.',
  'Locked liquidity, as represented by the project\'s stated liquidity arrangements.',
  'No founder allocation, according to the project\'s stated token distribution.',
  'A charitable mission supporting St. Jude Children\'s Research Hospital.',
  'Publicly accessible on-chain charity wallet activity.',
]

export function TokenInfoSection() {
  const [copied, setCopied] = useState(false)
  const [chartTheme, setChartTheme] = useState<'dark' | 'light'>('dark')
  const [chartLoaded, setChartLoaded] = useState(false)
  const contractAddress = 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw'

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const chartUrl = `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=${chartTheme}&trades=0&info=0`

  return (
    <section
      id="token"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20 text-[#1c0836]"
      style={{
        background: `
          radial-gradient(ellipse 75% 55% at 85% 10%, rgba(220, 180, 255, 0.5) 0%, transparent 65%),
          radial-gradient(ellipse 70% 50% at 10% 85%, rgba(240, 215, 255, 0.5) 0%, transparent 60%),
          #faf6ff
        `,
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-10 size-[650px] bg-[radial-gradient(circle,rgba(192,132,252,0.25)_0%,transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 size-[600px] bg-[radial-gradient(circle,rgba(244,114,182,0.16)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Ultra-wide container */}
      <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header - Bold & Clean */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-[#7c2ae8]">
            $POT LUCK TOKEN INFORMATION
          </p>
          <h2 className="mt-1 text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#1c0836] leading-none">
            $POT / PLC
          </h2>
        </div>

        {/* 3-Column Ultra-Wide Flow: Specs Box | Key Features | Big Dog Mascot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left: Token Specifications Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-[#d8b4fe]/60 bg-white/90 p-5 sm:p-7 md:p-8 backdrop-blur-xl shadow-[0_16px_40px_rgba(110,40,185,0.08)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(110,40,185,0.13)]">
            <div className="space-y-4">
              {TOKEN_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="pb-3 border-b border-[#f0e4ff] last:border-b-0 last:pb-0"
                >
                  <span className="block text-xs font-black uppercase tracking-wider text-[#705295]">
                    {spec.label}
                  </span>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    {spec.isAddress ? (
                      <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-[#faf6ff] border border-[#d8b4fe]/60 px-3 py-2 shadow-inner">
                        <span className="font-mono text-xs sm:text-sm md:text-[14.5px] font-extrabold text-[#1c0836] truncate select-all">
                          {spec.value}
                        </span>
                        <button
                          onClick={copyAddress}
                          title={copied ? 'Copied!' : 'Copy contract address'}
                          className={`grid size-8 shrink-0 place-items-center rounded-lg border transition-all active:scale-95 ${
                            copied
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                              : 'border-[#d8b4fe] bg-white text-[#7c2ae8] hover:bg-[#7c2ae8] hover:text-white'
                          }`}
                          aria-label="Copy contract address"
                        >
                          {copied ? <Check size={15} /> : <Copy size={15} />}
                        </button>
                      </div>
                    ) : spec.isTicker ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c2ae8] to-[#9333ea] px-4 py-1.5 text-sm sm:text-base font-black text-white shadow-sm">
                        <span>{spec.value}</span>
                      </div>
                    ) : spec.isChain ? (
                      <div className="inline-flex items-center gap-2 font-black text-base sm:text-lg text-[#1c0836]">
                        <img src="/solana-logo.svg" alt="Solana" className="size-5" />
                        <span>{spec.value}</span>
                      </div>
                    ) : (
                      <span className="text-base sm:text-lg font-black text-[#1c0836]">
                        {spec.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0e4ff] flex items-center justify-between text-xs text-[#7c2ae8]">
              <a
                href={`https://solscan.io/token/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold hover:underline"
              >
                <span>View on Solscan</span>
                <ExternalLink size={13} />
              </a>
              <span className="text-[#8e74ae] font-semibold">SPL Token Standard</span>
            </div>
          </div>

          {/* Middle: Key Features (4 cols) with Larger Text */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#1c0836] tracking-tight">
              Key Features
            </h3>

            <ul className="space-y-3">
              {KEY_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed text-[#351b54] transition-transform duration-200 hover:translate-x-1"
                >
                  <span className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-full bg-[#7c2ae8]/15 text-[#7c2ae8] mt-0.5">
                    <Check className="size-3 sm:size-3.5 stroke-[3]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Big Dog Mascot (3 cols) - Scaled Up Significantly */}
          <div className="lg:col-span-3 relative flex flex-col items-center justify-center">
            {/* Ambient radiant light behind dog */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d8b4fe]/60 via-[#f0abfc]/40 to-transparent blur-3xl pointer-events-none" />

            {/* Playful Floating Motto Badge */}
            <div className="absolute -top-4 right-0 sm:right-6 z-20 rotate-6 rounded-2xl bg-white/95 border border-[#d8b4fe] px-4 py-2 shadow-xl backdrop-blur-md text-center select-none transition-transform duration-300 hover:rotate-0 hover:scale-110">
              <span className="block text-xs font-black uppercase tracking-wider text-[#7c2ae8]">
                Hold &bull; Support
              </span>
              <span className="block text-sm font-black text-[#e11d48]">
                Change 💜
              </span>
            </div>

            {/* Dog Mascot Image - Rendered Big and Crisp */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] transition-transform duration-500 hover:scale-105 select-none">
              <img
                src="/tokeninfo-dog.png"
                alt="POT Luck Mascot Dog with sunglasses and purple bandana"
                className="w-full h-auto object-contain filter drop-shadow-[0_24px_45px_rgba(75,20,120,0.22)]"
              />
            </div>
          </div>

        </div>

        {/* Live DexScreener Chart Block - Styled with Web3 Glassmorphism */}
        <div className="mt-10 sm:mt-14 lg:mt-16 rounded-3xl sm:rounded-[32px] border border-[#d8b4fe]/80 bg-white/90 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(110,40,185,0.1)] transition-all duration-300">
          
          {/* Chart Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#f0e4ff]">
            <div className="flex items-center gap-3">
              <div className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#7c2ae8] via-[#9333ea] to-[#c084fc] text-white shadow-[0_6px_20px_rgba(124,42,232,0.35)]">
                <TrendingUp className="size-6 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1c0836] tracking-tight">
                    Live DexScreener Chart
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-2.5 py-0.5 text-[11px] font-black text-emerald-800 border border-emerald-300/60 shadow-sm">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>LIVE ON-CHAIN</span>
                  </span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-[#705295]">
                  Real-time price candles, liquidity, and trading volume for <strong className="font-extrabold text-[#1c0836]">$POT / SOL</strong>
                </p>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {/* Theme Toggle (Dark / Light) */}
              <button
                onClick={() => setChartTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d8b4fe] bg-[#faf6ff] px-3.5 py-2 text-xs font-bold text-[#7c2ae8] hover:bg-[#7c2ae8] hover:text-white transition-all active:scale-95 shadow-sm"
                title={`Switch to ${chartTheme === 'dark' ? 'Light' : 'Dark'} chart theme`}
              >
                {chartTheme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                <span className="capitalize">{chartTheme} Mode</span>
              </button>

              {/* Direct Link to DexScreener */}
              <a
                href={`https://dexscreener.com/solana/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c2ae8] via-[#8b31ea] to-[#a855f7] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-black text-white shadow-[0_6px_20px_rgba(124,42,232,0.3)] transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>View Full DexScreener</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative mt-5 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e2ccfc]/80 bg-[#0e071e] shadow-inner">
            {/* Ambient loading placeholder */}
            {!chartLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0e071e]/90 text-white backdrop-blur-sm gap-3">
                <div className="size-10 rounded-full border-3 border-purple-500 border-t-transparent animate-spin" />
                <span className="text-xs font-bold text-purple-200 tracking-wider uppercase">
                  Loading Live DexScreener Chart...
                </span>
              </div>
            )}

            {/* Responsive Iframe Container (Optimal height across viewports) */}
            <div className="relative w-full h-[500px] min-[480px]:h-[560px] sm:h-[620px] lg:h-[680px]">
              <iframe
                src={chartUrl}
                title="DexScreener POT Live Chart"
                className="absolute inset-0 w-full h-full border-0 select-none"
                loading="lazy"
                onLoad={() => setChartLoaded(true)}
                allow="clipboard-write"
              />
            </div>
          </div>

          {/* Footer Metrics & Explorer Links */}
          <div className="mt-4 pt-3 border-t border-[#f0e4ff] flex flex-wrap items-center justify-between gap-3 text-xs text-[#705295]">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#7c2ae8]" />
              <span>
                Contract: <span className="font-mono font-bold text-[#1c0836] select-all">{contractAddress}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 font-bold text-[#7c2ae8]">
              <a
                href={`https://solscan.io/token/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span>Solscan Explorer</span>
                <ArrowUpRight size={13} />
              </a>
              <span className="text-[#d8b4fe]">&bull;</span>
              <a
                href={`https://dexscreener.com/solana/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span>DexScreener Pair</span>
                <ArrowUpRight size={13} />
              </a>
              <span className="text-[#d8b4fe]">&bull;</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="size-3.5" />
                <span>Verified Liquidity</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
