'use client'

import React from 'react'
import { useContent } from '@/context/content-context'
import { MapPin, Mail, Globe, FileText, Phone, Building2, Heart } from 'lucide-react'

// Custom SVG X (formerly Twitter) Icon
function XTwitterIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Custom SVG Telegram Icon
function TelegramIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}

export function ContactFooterSection() {
  const { content } = useContent()
  return (
    <footer id="contact" className="relative w-full overflow-hidden text-white">
      
      {/* ================= Contact Section ================= */}
      <section
        className="relative w-full py-16 sm:py-20 lg:py-24"
        style={{
          background: `
            radial-gradient(circle at 85% 30%, rgba(192, 132, 252, 0.32) 0%, transparent 45%),
            radial-gradient(circle at 15% 65%, rgba(168, 85, 247, 0.28) 0%, transparent 45%),
            radial-gradient(ellipse 90% 65% at 50% -10%, rgba(147, 51, 234, 0.35) 0%, transparent 60%),
            linear-gradient(135deg, #1b073e 0%, #2e0d63 45%, #180536 100%)
          `,
        }}
      >
        {/* Ambient background flares */}
        <div className="absolute top-1/4 right-1/4 size-[450px] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 size-[450px] bg-[radial-gradient(circle,rgba(192,132,252,0.18)_0%,transparent_65%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1520px] px-6 sm:px-10 lg:px-14 xl:px-18">
          
          {/* Section Header: Icon + Title */}
          <div className="mb-12 sm:mb-16 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
              <Mail className="size-5 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Contact &amp; Project Information
            </h2>
          </div>

          {/* Main Grid: Contact Details on Left/Center + Dog Mascot on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Columns: Project & St. Jude Info (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              
              {/* Row 1: EpiCoin Project Details (matching screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                
                {/* Location / Address */}
                <div className="flex items-start gap-4">
                  <div className="relative size-12 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_22px_rgba(192,132,252,0.6)] flex items-center justify-center ring-1 ring-white/30">
                    <MapPin className="size-5 text-white" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-base font-extrabold text-white tracking-tight">
                      EpiCoin AI / World Park
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-[#e9d5ff]/85">
                      81158 Taos Trail<br />
                      Indio, CA 92201, United States
                    </p>
                  </div>
                </div>

                {/* Email & Website */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="relative size-12 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_22px_rgba(192,132,252,0.6)] flex items-center justify-center ring-1 ring-white/30">
                      <Mail className="size-5 text-white" />
                    </div>
                    <div className="pt-0.5">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                        Email
                      </span>
                      <a
                        href="mailto:hello@epicoin.org"
                        className="text-sm sm:text-[14.5px] font-bold text-white hover:text-[#d8b4fe] transition-colors"
                      >
                        hello@epicoin.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="relative size-12 shrink-0 rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#581c87] shadow-[0_0_22px_rgba(192,132,252,0.6)] flex items-center justify-center ring-1 ring-white/30">
                      <Globe className="size-5 text-white" />
                    </div>
                    <div className="pt-0.5">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                        Website
                      </span>
                      <a
                        href="https://epicoin.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-[14.5px] font-bold text-white hover:text-[#d8b4fe] transition-colors"
                      >
                        epicoin.ai
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 2: St. Jude Children's Research Hospital Information & Contact */}
              <div className="pt-8 border-t border-white/10 space-y-5">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d8b4fe]">
                    CHARITABLE BENEFICIARY
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-white tracking-tight">
                    About St. Jude Children's Research Hospital
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#e9d5ff]/85 max-w-3xl">
                    St. Jude Children's Research Hospital is dedicated to advancing the treatment and understanding of childhood cancer and other life-threatening diseases. Its research is shared with the global medical community, helping improve outcomes for children worldwide, while providing families with essential support.
                  </p>
                </div>

                {/* St. Jude Direct Contact Lines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 backdrop-blur-md">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#c084fc]/20 text-[#d8b4fe]">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                        Donor Services
                      </span>
                      <a href="tel:8008226344" className="text-xs sm:text-sm font-bold text-white hover:underline">
                        (800) 822-6344
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 backdrop-blur-md">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#c084fc]/20 text-[#d8b4fe]">
                      <Building2 className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                        Hospital Direct
                      </span>
                      <a href="tel:8662785833" className="text-xs sm:text-sm font-bold text-white hover:underline">
                        (866) 278-5833
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 backdrop-blur-md">
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#c084fc]/20 text-[#d8b4fe]">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <span className="block text-[10.5px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                        Hospital Address
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-semibold text-white/95">
                        262 Danny Thomas Pl, Memphis, TN
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Dog Mascot & Thank You Message (4 cols on desktop) */}
            <div className="lg:col-span-4 relative flex items-center justify-center pt-6 lg:pt-0">
              {/* Soft purple aura behind puppy */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#a855f7]/30 to-[#e879f9]/20 blur-3xl pointer-events-none" />

              <div className="relative flex items-center gap-3 sm:gap-5">
                {/* Puppy Mascot Image from public/dog.png */}
                <div className="relative z-10 w-44 sm:w-56 md:w-60 lg:w-64 xl:w-72 shrink-0 transition-transform duration-500 hover:scale-105 select-none">
                  <img
                    src="/dog.png"
                    alt="POT Luck puppy mascot"
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(30,5,60,0.6)]"
                  />
                </div>

                {/* Playful Floating Message matching screenshot */}
                <div className="relative z-20 space-y-1 text-left select-none">
                  <p className="font-serif italic text-lg sm:text-xl lg:text-2xl font-bold text-[#f3e8ff] leading-tight drop-shadow-md">
                    Thank You<br />
                    for Being Part<br />
                    of Our Journey
                  </p>
                  <span className="inline-block text-[#d946ef] text-xl animate-pulse">
                    💜
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= Bottom Footer Bar ================= */}
      <div className="relative z-20 border-t border-white/10 bg-[#130426] py-6 sm:py-7">
        <div className="mx-auto flex max-w-[1520px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 lg:px-14 xl:px-18 text-center sm:text-left">
          
          {/* Left: Brand Logo from Public Folder & Name */}
          <a href="#home" className="flex items-center gap-3.5 group transition-transform duration-200 hover:scale-105">
            <img
              src="/logo.png"
              alt="EpiCoin Logo"
              className="size-12 sm:size-14 md:size-16 object-contain drop-shadow-[0_0_22px_rgba(168,85,247,0.7)]"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#e9d5ff]">
              {content.global.brandName}
            </span>
          </a>

          {/* Center: Copyright Notice */}
          <p className="text-xs sm:text-[13px] text-white/60 font-medium">
            {content.footer.copyright}
          </p>

          {/* Right: Twitter / X and Telegram Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/epicoinai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X (formerly Twitter)"
              className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-[#b87aff] hover:bg-white/15 hover:text-white hover:scale-110 active:scale-95 shadow-sm"
            >
              <XTwitterIcon className="size-4" />
            </a>
            <a
              href={content.global.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Telegram"
              className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-200 hover:border-[#b87aff] hover:bg-white/15 hover:text-white hover:scale-110 active:scale-95 shadow-sm"
            >
              <TelegramIcon className="size-4" />
            </a>
          </div>

        </div>
      </div>

    </footer>
  )
}

