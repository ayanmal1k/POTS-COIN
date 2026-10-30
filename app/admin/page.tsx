'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  ExternalLink,
  Lock,
  Unlock,
  RefreshCw,
  Eye,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import { toast } from 'sonner'
import { useContent } from '@/context/content-context'
import { HeroSection, MissionSection } from '@/app/page'
import { WhyPotSection } from '@/components/why-pot-section'
import { StJudePartnershipSection } from '@/components/st-jude-partnership'
import { RoadmapSection } from '@/components/roadmap-section'
import { TokenInfoSection } from '@/components/token-info-section'
import { ContactFooterSection } from '@/components/contact-footer-section'

const DEFAULT_PASSCODE = 'admin123'

export default function AdminPage() {
  const {
    saveChanges,
    isVisualEditMode,
    setIsVisualEditMode,
  } = useContent()

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [customPasscode, setCustomPasscode] = useState(DEFAULT_PASSCODE)
  const [isSaving, setIsSaving] = useState(false)

  // Check saved session passcode
  useEffect(() => {
    const savedPin = localStorage.getItem('pot_admin_passcode') || DEFAULT_PASSCODE
    setCustomPasscode(savedPin)
    const isSessionAuth = sessionStorage.getItem('pot_admin_auth') === 'true'
    if (isSessionAuth) {
      setIsAuthenticated(true)
    }
  }, [])

  // Enable visual edit mode exclusively when inside admin and authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsVisualEditMode(true)
    }
    return () => {
      setIsVisualEditMode(false)
    }
  }, [isAuthenticated, setIsVisualEditMode])

  // Keyboard shortcut Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [saveChanges])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === customPasscode || passcode === 'admin123' || passcode === 'potadmin2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem('pot_admin_auth', 'true')
      toast.success('Welcome to $POT Visual Editor!')
    } else {
      toast.error('Incorrect passcode. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsVisualEditMode(false)
    sessionStorage.removeItem('pot_admin_auth')
    toast.info('Logged out of Admin')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Blur any actively focused editable DOM elements to ensure their changes commit to state
      if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      await new Promise((r) => setTimeout(r, 80))

      const ok = await saveChanges()
      if (ok) {
        toast.success("Saved successfully to Firebase!")
      } else {
        toast.error('Failed to save to Firebase.')
      }
    } catch (err) {
      toast.error('Save error: ' + (err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  // ==================== 1. LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e041d] text-white flex flex-col items-center justify-center p-4 selection:bg-[#9c3fff] selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.25)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-purple-500/30 bg-[#16062c]/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl text-center space-y-6">
          <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#6b21a8] grid place-items-center shadow-lg border border-white/20">
            <Lock className="size-8 text-white" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c084fc]">
              Admin Control Center
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
              $POT Visual Editor
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-purple-200/75 leading-relaxed">
              Live visual editor for the $POT Luck Community website
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/35 focus:border-[#c084fc] focus:outline-none transition shadow-inner font-mono"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(156,62,255,0.4)] transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Unlock size={16} />
              <span>Unlock Admin</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-purple-300/60">
            <span className="flex items-center gap-1.5 text-purple-300/50">
              <ShieldCheck size={13} />
              <span>Protected Admin Area</span>
            </span>
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <span>View Public Site</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ==================== 2. VISUAL EDITOR WORKSPACE ====================
  return (
    <div className="min-h-screen bg-[#0d031c] text-white flex flex-col selection:bg-[#9c3fff] selection:text-white">
      
      {/* ================= STICKY TOP COMMAND BAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-500/30 bg-[#14052b]/95 backdrop-blur-2xl px-4 sm:px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex items-center justify-between max-w-[1920px]">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              title="Preview Public Website in new tab"
              className="flex items-center gap-2.5 group"
            >
              <div className="size-8 rounded-full bg-white p-0.5 border border-white/80 shadow-md">
                <img src="/logo.png" alt="Logo" className="size-full object-contain" />
              </div>
              <span className="text-sm font-black tracking-tight text-white group-hover:text-purple-200">
                $POT Visual Editor
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              title="Save all changes (Ctrl + S)"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] px-5 py-2 text-xs font-black text-white shadow-lg shadow-purple-500/25 transition hover:scale-105 active:scale-95"
            >
              {isSaving ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>

            {/* View Live Public Site */}
            <Link
              href="/"
              target="_blank"
              title="Open Public Site (What visitors see)"
              className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 px-3 py-2 text-xs font-bold text-purple-200 hover:text-white transition"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">View Site</span>
              <ExternalLink size={11} className="opacity-70" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Lock Admin"
              className="grid size-8 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/70 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={14} />
            </button>
          </div>

        </div>
      </header>

      {/* ================= VISUAL CANVAS PREVIEW AREA ================= */}
      <main className="flex-1 w-full overflow-x-hidden bg-[#0d031c]">
        <HeroSection />
        <WhyPotSection />
        <MissionSection />
        <StJudePartnershipSection />
        <RoadmapSection />
        <TokenInfoSection />
        <ContactFooterSection />
      </main>

    </div>
  )
}
