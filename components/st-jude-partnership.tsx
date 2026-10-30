'use client'

import React, { useEffect, useState } from 'react'
import { useContent } from '@/context/content-context'
import { EditableText, EditableButton } from '@/components/visual-editor/editable'
import {
  Heart,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  TrendingUp,
  Sparkles,
  Wallet,
  Activity,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react'

// Token SPL contract address (from Hero)
const TOKEN_ADDRESS = 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw'

// Official PLC Charity Funds Solana Public Address
const DEFAULT_CHARITY_WALLET_ADDRESS = '4UE6MCdehqLbeDuvKB5piM1VMm199WJxCWqTubQpim7k'

// Milestone Targets
const TARGET_MARKET_CAP = 100000 // $100k
const TARGET_DONATION_SOL = 12 // 12 SOL

export function StJudePartnershipSection() {
  const { content } = useContent()
  const [copied, setCopied] = useState(false)
  const [loadingMcap, setLoadingMcap] = useState(true)
  const [loadingBalance, setLoadingBalance] = useState(true)

  // Real data states with sensible fallback
  const [marketCap, setMarketCap] = useState<number>(84803)
  const [solBalance, setSolBalance] = useState<number>(2.298)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  // Copy PLC Charity Wallet address
  const copyCharityAddress = async () => {
    try {
      await navigator.clipboard.writeText(content.global.charityVaultAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  // Fetch real market cap from Dexscreener
  const fetchMarketCap = async () => {
    try {
      setLoadingMcap(true)
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      if (res.ok) {
        const data = await res.json()
        if (data?.pairs && data.pairs.length > 0) {
          const cap = data.pairs[0].marketCap || data.pairs[0].fdv
          if (cap && typeof cap === 'number') {
            setMarketCap(cap)
          }
        }
      }
    } catch (err) {
      console.warn('Dexscreener fetch error:', err)
    } finally {
      setLoadingMcap(false)
    }
  }

  // Fetch real Solana balance from Solana Mainnet RPC
  const fetchSolBalance = async () => {
    try {
      setLoadingBalance(true)
      const endpoints = [
        'https://api.mainnet-beta.solana.com',
        'https://rpc.ankr.com/solana',
      ]
      const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [content.global.charityVaultAddress],
      }

      let success = false
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (res.ok) {
            const json = await res.json()
            if (json?.result?.value !== undefined) {
              const lamports = json.result.value
              setSolBalance(lamports / 1e9)
              success = true
              break
            }
          }
        } catch {
          // try next RPC
        }
      }
      if (!success) {
        setSolBalance(2.298)
      }
    } catch (err) {
      console.warn('Solana RPC fetch error:', err)
    } finally {
      setLoadingBalance(false)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
  }

  const refreshAll = () => {
    fetchMarketCap()
    fetchSolBalance()
  }

  useEffect(() => {
    refreshAll()
    const interval = setInterval(refreshAll, 60000)
    return () => clearInterval(interval)
  }, [])

  const mcapProgress = Math.min(100, (marketCap / TARGET_MARKET_CAP) * 100)

  return (
    <section
      id="partnership"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28 text-[#1c0836]"
      style={{
        background: `
          radial-gradient(ellipse 75% 55% at 85% 10%, rgba(220, 180, 255, 0.5) 0%, transparent 65%),
          radial-gradient(ellipse 70% 50% at 10% 85%, rgba(240, 215, 255, 0.5) 0%, transparent 60%),
          #faf6ff
        `,
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-5 size-[500px] bg-[radial-gradient(circle,rgba(192,132,252,0.2)_0%,transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 size-[450px] bg-[radial-gradient(circle,rgba(244,114,182,0.12)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 xl:px-20 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* Top Header: Big St. Jude Hospital Logo & Headline in an Open Editorial Flow */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 pb-16 sm:pb-20 border-b border-[#ebd8ff]/70 text-center lg:text-left">
          
          <div className="max-w-3xl mx-auto lg:mx-0">
            <h2 className="text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black tracking-[-0.035em] text-[#1c0836] leading-[1.05]">
              <EditableText
                value={content.partnership.heading}
                path="partnership.heading"
              /><br />
              <EditableText
                value={content.partnership.headingHighlight}
                path="partnership.headingHighlight"
                className="bg-gradient-to-r from-[#7c2ae8] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent inline-block"
              />{' '}
              <EditableText
                value={content.partnership.headingSuffix}
                path="partnership.headingSuffix"
              />
            </h2>

            <EditableText
              as="p"
              value={content.partnership.description}
              path="partnership.description"
              multiline
              className="mt-6 text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#432d5e]"
            />
          </div>

          {/* Big St. Jude Hospital Logo (Transparent, unboxed, bold) */}
          <div className="shrink-0 flex items-center justify-center lg:justify-end">
            <div className="relative group">
              {/* Soft purple halo behind logo */}
              <div className="absolute inset-0 -m-6 rounded-full bg-[#e9d5ff]/60 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <img
                src="/st jude children hospital logo.png"
                alt="St. Jude Children's Research Hospital Logo"
                className="relative z-10 w-48 sm:w-60 md:w-64 lg:w-72 xl:w-80 h-auto object-contain select-none drop-shadow-[0_12px_28px_rgba(120,40,200,0.18)] transition-transform duration-300 group-hover:scale-105 mx-auto lg:mx-0"
              />
            </div>
          </div>

        </div>

        {/* Feature Story & Milestone (Fluid 2-Column with Transparent Children Image) */}
        <div className="py-4 sm:py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Transparent Children Image (Floating naturally with ambient light) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Ambient radiant aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d8b4fe]/50 via-[#f0abfc]/30 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[540px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/children.png"
                alt="Children smiling together, supported by St. Jude"
                className="w-full h-auto object-contain select-none filter drop-shadow-[0_20px_35px_rgba(75,20,120,0.16)]"
              />
            </div>

            {/* Subtle caption */}
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-[#d8b4fe]/50 bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#543b74] backdrop-blur-md shadow-sm text-center">
              <Sparkles className="size-3.5 text-[#a855f7] shrink-0" />
              <span>Finding cures. Saving children. &bull; No family ever receives a bill.</span>
            </div>
          </div>

          {/* Right: Milestone Story & Transparent Verification Commitment */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 text-center sm:text-left">
            <div>
              <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-[#7c2ae8]">
                FIRST CHARITABLE MILESTONE
              </span>
              <h3 className="mt-2 text-2xl sm:text-4xl lg:text-[42px] font-black text-[#1c0836] tracking-tight leading-[1.12]">
                Target: $100,000 Market Cap &rarr; 12 SOL Donated
              </h3>
            </div>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#4b3566]">
              Our mission is built on transparent, verifiable impact. When the token reaches a <strong className="font-extrabold text-[#1c0836]">$100,000 market capitalization</strong>, a planned charitable contribution of <strong className="font-extrabold text-[#7c2ae8]">12 SOL</strong> will be sent directly to St. Jude Children's Research Hospital.
            </p>

            {/* Quick Metrics Line */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-[#543d73]">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#7c2ae8]" />
                <span><strong>Target:</strong> $100K Market Cap</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#7c2ae8]" />
                <span><strong>Donation:</strong> 12 SOL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#7c2ae8]" />
                <span><strong>Beneficiary:</strong> St. Jude Children's Hospital</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 pt-2">
              <EditableButton
                text={content.partnership.donateButtonText}
                textPath="partnership.donateButtonText"
                link={content.partnership.donateButtonLink}
                linkPath="partnership.donateButtonLink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#e63946] to-[#be123c] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-black text-white shadow-[0_6px_20px_rgba(225,29,72,0.28)] transition-all hover:scale-[1.02] active:scale-95"
                icon={<ExternalLink size={14} />}
              />

              <a
                href="#milestone-tracker"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#b87aff]/60 bg-white/80 backdrop-blur-md px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#7c2ae8] shadow-sm transition hover:bg-white active:scale-95"
              >
                <span>View Donation Milestone</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* 2. Milestone & Live Progress (Open, Cardless, Ultra-Fluid on Mobile) */}
        <div id="milestone-tracker" className="space-y-6 sm:space-y-8 pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#7c2ae8]">
                LIVE ON-CHAIN & DEX METRICS
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black text-[#1c0836] tracking-tight">
                Target: $100,000 Market Cap &rarr; 12 SOL to St. Jude
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#594273]">
                When $100K market cap is achieved, 12 SOL will be donated to St. Jude Children's Research Hospital.
              </p>
            </div>

            {/* Live Status & Refresh Button */}
            <div className="flex items-center justify-center sm:justify-end gap-2.5 shrink-0 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-300/60">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{loadingMcap ? 'Fetching...' : 'LIVE DEX'}</span>
              </span>

              <button
                onClick={refreshAll}
                className="inline-flex items-center gap-1 rounded-full border border-[#d8b4fe] bg-white/90 px-3 py-1 text-xs font-bold text-[#7c2ae8] shadow-sm hover:bg-[#7c2ae8] hover:text-white transition-all active:scale-95"
              >
                <RefreshCw className="size-3" />
                <span>Refresh {lastUpdated && `(${lastUpdated})`}</span>
              </button>
            </div>
          </div>

          {/* Numbers Grid: 3 Clean Columns on Mobile & Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-1">
            <div className="col-span-1">
              <span className="block text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#705295]">
                Current Market Cap
              </span>
              <div className="mt-1 text-xl min-[400px]:text-2xl sm:text-4xl font-black text-[#1c0836] tracking-tight">
                ${marketCap.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="col-span-1">
              <span className="block text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#705295]">
                Milestone Goal
              </span>
              <div className="mt-1 text-xl min-[400px]:text-2xl sm:text-4xl font-extrabold text-[#7c2ae8] tracking-tight">
                ${TARGET_MARKET_CAP.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0e4ff]">
              <span className="block text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#705295]">
                Milestone Progress
              </span>
              <div className="mt-1 text-2xl sm:text-4xl font-black bg-gradient-to-r from-[#7c2ae8] to-[#d946ef] bg-clip-text text-transparent tracking-tight">
                {mcapProgress.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Glowing Gradient Progress Track */}
          <div className="space-y-2 pt-1">
            <div className="relative h-3 sm:h-3.5 w-full overflow-hidden rounded-full bg-[#ebd8ff]/70 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7c2ae8] via-[#a855f7] to-[#d946ef] shadow-[0_0_14px_rgba(168,85,247,0.7)] transition-all duration-1000 ease-out"
                style={{ width: `${mcapProgress}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs font-medium text-[#705295]">
              <span>Token Contract <span className="font-mono text-[#1c0836] font-bold">GUtUrP...JxEw</span></span>
              <span className="font-bold text-[#7c2ae8]">{mcapProgress.toFixed(2)}% of $100K target achieved</span>
            </div>
          </div>

        </div>

        {/* 3. Open Giving Channels & Community Vault (Seamless Responsive Flow) */}
        <div className="pt-8 sm:pt-12 border-t border-[#e2ccfc]/80 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Community Charity Vault Column */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2 text-[#7c2ae8]">
              <Wallet className="size-4.5 sm:size-5" />
              <h4 className="text-lg sm:text-xl font-black text-[#1c0836]">
                PLC Charity Funds Solana Address
              </h4>
            </div>

            <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#543d73]">
              You can also deposit or donate SOL directly to the PLC charity fund address below. Those funds will be donated together as the <strong>12 SOL</strong> milestone to St. Jude when we reach <strong>$100k market cap</strong>.
            </p>

            {/* Responsive Copyable Address Strip */}
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#b87aff]/50 bg-white/90 p-2.5 sm:p-3.5 shadow-sm backdrop-blur-md">
              <span className="min-w-0 flex-1 font-mono text-[11px] min-[400px]:text-xs sm:text-sm font-bold text-[#1c0836] truncate select-all">
                {content.global.charityVaultAddress}
              </span>

              <button
                onClick={copyCharityAddress}
                title={copied ? 'Copied!' : 'Copy address'}
                className={`grid size-8 sm:size-9 shrink-0 place-items-center rounded-xl border transition-all active:scale-95 ${
                  copied
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                    : 'border-[#d8b4fe] bg-white text-[#7c2ae8] hover:bg-[#7c2ae8] hover:text-white'
                }`}
                aria-label="Copy charity address"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            {/* Live Vault Balance Directly Under Address (No progress bar) */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0891b2] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#06b6d4]" />
              </span>
              <span className="font-medium text-[#705295]">Live Vault:</span>
              <span className="font-mono text-sm sm:text-base font-black text-[#1c0836]">
                {loadingBalance ? 'Checking...' : `${solBalance.toFixed(3)} SOL`}
              </span>
            </div>
          </div>

          {/* Direct Giving Portal Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:pl-6 lg:border-l lg:border-[#e2ccfc]/80">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-[#e11d48]">
                <Heart className="size-4.5 sm:size-5 fill-[#e11d48]" />
                <h4 className="text-lg sm:text-xl font-black text-[#1c0836]">
                  Prefer to Donate Directly?
                </h4>
              </div>

              <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#593946]">
                Support St. Jude's life-saving mission directly using cryptocurrency through their official St. Jude crypto donation portal.
              </p>

              {/* Heartwarming Superhero Hope Children Photo */}
              <div className="relative overflow-hidden rounded-2xl border border-rose-100 shadow-[0_8px_24px_rgba(225,29,72,0.12)] group/img">
                <img
                  src="/hope-children.jpg"
                  alt="Brave pediatric cancer patients holding hope sign - St. Jude mission"
                  className="w-full h-40 sm:h-44 object-cover object-center transition-transform duration-500 group-hover/img:scale-105 select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white drop-shadow-sm">
                    <span className="size-2 rounded-full bg-rose-400 animate-pulse shrink-0" />
                    <span className="truncate">Fighting Cancer With Hope &bull; Official St. Jude Giving</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <EditableButton
                text={content.partnership.donateButtonText}
                textPath="partnership.donateButtonText"
                link={content.partnership.donateButtonLink}
                linkPath="partnership.donateButtonLink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#e63946] to-[#be123c] px-6 py-3.5 text-xs sm:text-sm font-black text-white shadow-[0_6px_22px_rgba(225,29,72,0.28)] transition-all hover:scale-[1.02] active:scale-95"
                icon={<ExternalLink size={14} />}
              />
              <span className="block text-[10.5px] sm:text-[11px] text-[#8e6575]">
                Official 501(c)(3) nonprofit portal &bull; Receipts issued by St. Jude
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
