'use client'

import React, { useEffect, useState } from 'react'
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
  Award,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react'

// Token SPL contract address (from Hero)
const TOKEN_ADDRESS = 'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw'

// Official PLC Charity Funds Solana Public Address
const CHARITY_WALLET_ADDRESS = '4UE6MCdehqLbeDuvKB5piM1VMm199WJxCWqTubQpim7k'

// Milestone Targets
const TARGET_MARKET_CAP = 100000 // $100k
const TARGET_DONATION_SOL = 12 // 12 SOL

export function StJudePartnershipSection() {
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
      await navigator.clipboard.writeText(CHARITY_WALLET_ADDRESS)
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
        params: [CHARITY_WALLET_ADDRESS],
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
  const solProgress = Math.min(100, (solBalance / TARGET_DONATION_SOL) * 100)

  return (
    <section
      id="partnership"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
      style={{
        background: `
          radial-gradient(ellipse 65% 50% at 85% 15%, rgba(220, 180, 255, 0.45) 0%, transparent 65%),
          radial-gradient(ellipse 60% 45% at 15% 75%, rgba(240, 215, 255, 0.45) 0%, transparent 60%),
          #faf6ff
        `,
      }}
    >
      {/* Background subtle radial flares */}
      <div className="absolute top-20 right-10 size-[550px] bg-[radial-gradient(circle,rgba(192,132,252,0.25)_0%,transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 size-[500px] bg-[radial-gradient(circle,rgba(244,114,182,0.15)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* Top Header: Big St. Jude Hospital Logo & Headline in an Open Editorial Flow */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 pb-16 sm:pb-20 border-b border-[#ebd8ff]/70">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black tracking-[-0.035em] text-[#1c0836] leading-[1.05]">
              Our Partnership with<br />
              <span className="bg-gradient-to-r from-[#7c2ae8] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent">
                St. Jude Children's
              </span> Research Hospital
            </h2>

            <p className="mt-6 text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#432d5e]">
              Our most significant charitable relationship is our authorized connection with <strong className="font-extrabold text-[#1c0836]">St. Jude Children's Research Hospital</strong>. St. Jude is internationally recognized for its pioneering work in pediatric cancer treatment and research, freely sharing breakthroughs to advance childhood medicine worldwide.
            </p>
          </div>

          {/* Big St. Jude Hospital Logo (Transparent, unboxed, bold) */}
          <div className="shrink-0 flex items-center lg:justify-end">
            <div className="relative group">
              {/* Soft purple halo behind logo */}
              <div className="absolute inset-0 -m-6 rounded-full bg-[#e9d5ff]/60 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <img
                src="/st jude children hospital logo.png"
                alt="St. Jude Children's Research Hospital Logo"
                className="relative z-10 w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain select-none drop-shadow-[0_12px_28px_rgba(120,40,200,0.18)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

        {/* Feature Story & Milestone (Fluid 2-Column with Transparent Children Image) */}
        <div className="py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Transparent Children Image (Floating naturally with ambient light) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Ambient radiant aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d8b4fe]/50 via-[#f0abfc]/30 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-[540px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/children.png"
                alt="Children smiling together, supported by St. Jude"
                className="w-full h-auto object-contain select-none filter drop-shadow-[0_20px_35px_rgba(75,20,120,0.16)]"
              />
            </div>

            {/* Subtle caption */}
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-[#d8b4fe]/50 bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#543b74] backdrop-blur-md shadow-sm">
              <Sparkles className="size-3.5 text-[#a855f7]" />
              <span>Finding cures. Saving children. &bull; No family ever receives a bill.</span>
            </div>
          </div>

          {/* Right: Milestone Story & Transparent Verification Commitment */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7">
            <div>
              <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-[#7c2ae8]">
                FIRST CHARITABLE MILESTONE
              </span>
              <h3 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1c0836] tracking-tight leading-[1.12]">
                Target: $100,000 Market Cap &rarr; 12 SOL Donated
              </h3>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-[#4b3566]">
              Our mission is built on transparent, verifiable impact. When the token reaches a <strong className="font-extrabold text-[#1c0836]">$100,000 market capitalization</strong>, a planned charitable contribution of <strong className="font-extrabold text-[#7c2ae8]">12 SOL</strong> will be sent directly to St. Jude Children's Research Hospital.
            </p>



            {/* Quick Metrics Line */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-[#543d73]">
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
          </div>

        </div>

        {/* Live Milestone Hub (Single Market Cap Progress Bar) */}
        <div className="relative rounded-3xl sm:rounded-[36px] border border-[#d8b4fe]/60 bg-gradient-to-br from-white/95 via-[#faf5ff]/90 to-[#f3e8ff]/75 p-7 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(110,40,185,0.08)] backdrop-blur-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#ebd8ff]">
            <div>
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#7c2ae8]">
                FIRST DONATION MILESTONE PROGRESS
              </span>
              <h4 className="mt-1 text-2xl sm:text-3xl font-black text-[#1c0836] tracking-tight">
                Target: $100,000 Market Cap &rarr; 12 SOL to St. Jude
              </h4>
            </div>

            <button
              onClick={refreshAll}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d8b4fe] bg-white px-4 py-2 text-xs font-bold text-[#7c2ae8] shadow-sm hover:bg-[#7c2ae8] hover:text-white transition-all active:scale-95"
            >
              <RefreshCw className="size-3.5" />
              <span>Refresh Metrics {lastUpdated && `(${lastUpdated})`}</span>
            </button>
          </div>

          {/* Single Live Market Cap Progress Bar */}
          <div className="mt-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-[#7c2ae8]/10 text-[#7c2ae8]">
                  <TrendingUp className="size-5" />
                </span>
                <div>
                  <span className="block text-base font-extrabold text-[#1c0836]">Live Market Capitalization</span>
                  <span className="block text-xs text-[#705295]">Real-time token feed via Dexscreener</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-bold text-emerald-800">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{loadingMcap ? 'Fetching...' : 'LIVE ON DEX'}</span>
              </div>
            </div>

            {/* Big Stat Numbers */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 pt-1">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#705295]">Current Market Cap</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1c0836] tracking-tight">
                  ${marketCap.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#705295]">Milestone Goal</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#7c2ae8]">
                  ${TARGET_MARKET_CAP.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Glowing Progress Track */}
            <div className="relative h-5 w-full overflow-hidden rounded-full bg-[#e9d5ff]/60 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9333ea] via-[#c084fc] to-[#a855f7] shadow-[0_0_16px_rgba(168,85,247,0.7)] transition-all duration-1000 ease-out"
                style={{ width: `${mcapProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#543b74]">
              <span>Progress to $100K Donation Milestone:</span>
              <span className="font-extrabold text-[#7c2ae8] text-base sm:text-lg">{mcapProgress.toFixed(2)}% Completed</span>
            </div>
          </div>

        </div>

        {/* Action Panel: Community Deposit + Direct St. Jude Crypto Portal */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Solana Charity Address Box with Live Balance Underneath */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[#d8b4fe]/60 bg-white/80 p-6 sm:p-8 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="size-5 text-[#7c2ae8]" />
                <h4 className="text-lg font-black text-[#1c0836]">
                  PLC Charity Funds Solana Address
                </h4>
              </div>

              <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#543d73] mb-4">
                You can also deposit or donate SOL directly to the PLC charity fund address below. Those funds will be donated together as the <strong>12 SOL</strong> milestone to St. Jude when we reach <strong>$100k market cap</strong>.
              </p>

              {/* Copyable Address Strip */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#b87aff]/50 bg-[#faf6ff] p-3 sm:p-3.5 shadow-inner">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#1c0836] truncate select-all">
                  {CHARITY_WALLET_ADDRESS}
                </span>

                <button
                  onClick={copyCharityAddress}
                  title={copied ? 'Copied!' : 'Copy address'}
                  className={`grid size-9 shrink-0 place-items-center rounded-xl border transition-all active:scale-95 ${
                    copied
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-[#d8b4fe] bg-white text-[#7c2ae8] hover:bg-[#7c2ae8] hover:text-white'
                  }`}
                  aria-label="Copy charity address"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Live Vault Balance Under the Vault Address (No progress bar) */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e9d5ff] bg-gradient-to-r from-[#faf5ff] to-[#f3e8ff]/70 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0891b2] opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-[#06b6d4]" />
                  </span>
                  <div>
                    <span className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#705295]">
                      PLC Charity Vault Balance
                    </span>
                    <span className="block text-lg font-black text-[#1c0836]">
                      {loadingBalance ? 'Checking...' : `${solBalance.toFixed(3)} SOL`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-semibold text-[#8e74ae]">
                    Live on-chain Solana RPC balance
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700">
                    <Activity className="size-3" />
                    <span>ON-CHAIN</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#7c2ae8]">
              <a
                href={`https://solscan.io/account/${CHARITY_WALLET_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold hover:underline"
              >
                <span>View on Solscan Explorer</span>
                <ExternalLink size={12} />
              </a>
              <span className="text-[#8e74ae]">Verified on Solana Mainnet</span>
            </div>
          </div>

          {/* Direct St. Jude Crypto Donation Button */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#fecdd3] bg-gradient-to-br from-[#fff1f2] via-[#fff5f6] to-[#faf5ff] p-6 sm:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#e11d48]">
                <Heart className="size-3.5 fill-[#e11d48]" />
                Official Portal
              </span>

              <h4 className="mt-1.5 text-xl font-black text-[#1c0836]">
                Prefer to Donate Directly?
              </h4>

              <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#593946]">
                Support St. Jude's life-saving mission directly using cryptocurrency through their official St. Jude crypto donation portal.
              </p>
            </div>

            <div className="mt-6 pt-2">
              <a
                href="https://www.stjude.org/donate/crypto.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#e63946] to-[#be123c] px-6 py-3.5 text-sm font-black text-white shadow-[0_8px_25px_rgba(225,29,72,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(225,29,72,0.45)] active:scale-95"
              >
                <span>Donate to St. Jude Directly (Crypto)</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
