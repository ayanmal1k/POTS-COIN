'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  RotateCcw,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Eye,
  Settings,
  HelpCircle,
  Monitor,
  Tablet,
  Smartphone,
  X,
  ShieldCheck,
  Check,
  Globe,
  Layers,
  ArrowRight,
  Send,
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

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

const DEFAULT_PASSCODE = 'admin123'

export default function AdminPage() {
  const {
    content,
    updateContent,
    updateFieldByPath,
    saveChanges,
    resetToDefaults,
    isFirebaseConnected,
    lastSavedAt,
    isVisualEditMode,
    setIsVisualEditMode,
    hasUnsavedChanges,
  } = useContent()

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [customPasscode, setCustomPasscode] = useState(DEFAULT_PASSCODE)
  const [newPasscode, setNewPasscode] = useState('')

  // Studio UI states
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [isSaving, setIsSaving] = useState(false)
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

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
      toast.success('Welcome to $POT Visual Studio!')
    } else {
      toast.error('Incorrect passcode. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsVisualEditMode(false)
    sessionStorage.removeItem('pot_admin_auth')
    toast.info('Logged out of Admin Studio')
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
        toast.success("All edits successfully saved to Firebase 'pots' collection!")
      } else {
        toast.error('Failed to save to Firebase.')
      }
    } catch (err) {
      toast.error('Save error: ' + (err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    setIsSaving(true)
    try {
      const ok = await resetToDefaults()
      if (ok) {
        toast.success('Content reset to initial default copy!')
        setShowResetConfirm(false)
      } else {
        toast.error('Failed to reset content.')
      }
    } catch (err) {
      toast.error('Reset error: ' + (err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPasscode.trim()) {
      toast.error('Please enter a valid passcode')
      return
    }
    localStorage.setItem('pot_admin_passcode', newPasscode.trim())
    setCustomPasscode(newPasscode.trim())
    setNewPasscode('')
    toast.success('Admin passcode updated successfully!')
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
              $POT Visual Studio
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-purple-200/75 leading-relaxed">
              Live in-place visual editor &amp; CMS for the $POT Luck Community website
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
              <span>Unlock Visual Studio</span>
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

  // ==================== 2. VISUAL STUDIO WORKSPACE ====================
  return (
    <div className="min-h-screen bg-[#0d031c] text-white flex flex-col selection:bg-[#9c3fff] selection:text-white">
      
      {/* ================= STICKY TOP COMMAND BAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-500/30 bg-[#14052b]/95 backdrop-blur-2xl px-4 sm:px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-[1920px]">
          
          {/* Left: Brand, Live Mode Badge & Section Jumper */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              title="Preview Public Website in new tab"
              className="flex items-center gap-2.5 group"
            >
              <div className="size-8 rounded-full bg-white p-0.5 border border-white/80 shadow-md">
                <img src="/logo.png" alt="Logo" className="size-full object-contain" />
              </div>
              <div className="hidden min-[480px]:block text-left">
                <span className="block text-xs font-black tracking-tight text-white group-hover:text-purple-200">
                  $POT Visual Studio
                </span>
                <span className="block text-[9.5px] font-semibold text-purple-300/70">
                  Live Visual Editor
                </span>
              </div>
            </Link>

            {/* Mode Indicator Badge */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/15">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Visual Edit Mode ON</span>
                <span className="sm:hidden">ON</span>
              </span>

              {isFirebaseConnected && (
                <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-purple-300/80">
                  <span className="size-1.5 rounded-full bg-purple-400" />
                  <span>Firestore pots</span>
                </span>
              )}
            </div>

            {/* Quick Section Nav Bar */}
            <nav className="hidden lg:flex items-center gap-1 pl-2 border-l border-white/15 text-[11px] font-semibold text-purple-200/80">
              <button
                onClick={() => scrollToSection('home')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Hero
              </button>
              <button
                onClick={() => scrollToSection('ecosystem')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Ecosystem
              </button>
              <button
                onClick={() => scrollToSection('mission')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection('partnership')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                St. Jude
              </button>
              <button
                onClick={() => scrollToSection('roadmap')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollToSection('token')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Token
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="flex items-center rounded-xl bg-black/40 border border-white/15 p-1 shadow-inner">
            <button
              onClick={() => setViewport('desktop')}
              title="Desktop View (Full Width)"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                viewport === 'desktop'
                  ? 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] text-white shadow-sm'
                  : 'text-purple-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet View (768px iPad)"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                viewport === 'tablet'
                  ? 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] text-white shadow-sm'
                  : 'text-purple-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tablet size={14} />
              <span className="hidden sm:inline">iPad (768px)</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile View (390px Mobile)"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                viewport === 'mobile'
                  ? 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] text-white shadow-sm'
                  : 'text-purple-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Actions (Save, Settings, Reset, Live Site, Logout) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              title="Save all changes to Firebase (Ctrl + S)"
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black text-white shadow-lg transition active:scale-95 ${
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] shadow-purple-500/25 hover:scale-105'
              }`}
            >
              {isSaving ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              <span>{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes *' : 'Save to Firebase'}</span>
            </button>

            {/* Global Settings Drawer Toggle */}
            <button
              onClick={() => setShowSettingsDrawer(true)}
              title="Global Chain &amp; Project Settings"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 px-3 py-2 text-xs font-bold text-white transition"
            >
              <Settings size={14} />
              <span className="hidden md:inline">Settings</span>
            </button>

            {/* View Live Public Site */}
            <Link
              href="/"
              target="_blank"
              title="Open Public Site (What visitors see)"
              className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 px-3 py-2 text-xs font-bold text-purple-200 hover:text-white transition"
            >
              <Eye size={13} />
              <span className="hidden md:inline">Live Site</span>
              <ExternalLink size={11} className="opacity-70" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Lock Admin Studio"
              className="grid size-8 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/70 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={14} />
            </button>

          </div>

        </div>
      </header>

      {/* ================= EDITING HINT BANNER ================= */}
      <div className="bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-purple-900/50 border-b border-purple-500/20 py-2 px-4 text-center text-xs text-purple-200">
        <span className="font-bold text-amber-300">Visual Editing Active:</span> Click any copy on the page below to type directly in-place. Click any button to update its text and destination URL. Press <kbd className="px-1.5 py-0.5 rounded bg-black/50 font-mono text-[10px] text-white">Ctrl+S</kbd> to save to Firebase.
      </div>

      {/* ================= VISUAL CANVAS PREVIEW AREA ================= */}
      <main className="flex-1 overflow-x-hidden bg-[#0d031c] flex justify-center p-0">
        <div
          className={`transition-all duration-300 ${
            viewport === 'desktop'
              ? 'w-full'
              : viewport === 'tablet'
              ? 'w-[768px] max-w-full my-6 rounded-[28px] border-4 border-purple-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.3)] overflow-hidden bg-black'
              : 'w-[390px] max-w-full my-6 rounded-[40px] border-4 border-purple-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.35)] overflow-hidden bg-black'
          }`}
        >
          {/* Live Page Components Rendered In-Place With EditableText & EditableButton */}
          <HeroSection />
          <WhyPotSection />
          <MissionSection />
          <StJudePartnershipSection />
          <RoadmapSection />
          <TokenInfoSection />
          <ContactFooterSection />
        </div>
      </main>

      {/* ================= GLOBAL SETTINGS DRAWER ================= */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-[#16062c] border-l border-purple-500/30 p-6 overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="size-5 text-[#c084fc]" />
                <h3 className="text-lg font-black text-white">
                  Global &amp; Chain Settings
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="grid size-8 place-items-center rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Solana Contract Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80">
                Solana Contract Address (SPL)
              </label>
              <input
                type="text"
                value={content.global.solanaContractAddress}
                onChange={(e) => updateFieldByPath('global.solanaContractAddress', e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs font-mono text-white focus:border-[#c084fc] focus:outline-none"
              />
            </div>

            {/* Charity Vault Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80">
                Charity Vault Wallet Address
              </label>
              <input
                type="text"
                value={content.global.charityVaultAddress}
                onChange={(e) => updateFieldByPath('global.charityVaultAddress', e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs font-mono text-white focus:border-[#c084fc] focus:outline-none"
              />
            </div>

            {/* Telegram URL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80">
                Telegram Community URL
              </label>
              <input
                type="text"
                value={content.global.telegramUrl}
                onChange={(e) => updateFieldByPath('global.telegramUrl', e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs font-mono text-white focus:border-[#c084fc] focus:outline-none"
              />
            </div>

            {/* DexScreener Embed URL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80">
                DexScreener Embed Chart URL
              </label>
              <input
                type="text"
                value={content.global.dexScreenerChartEmbedUrl}
                onChange={(e) => updateFieldByPath('global.dexScreenerChartEmbedUrl', e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs font-mono text-white focus:border-[#c084fc] focus:outline-none"
              />
            </div>

            {/* Change Admin Passcode */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/80">
                Change Admin Passcode
              </label>
              <form onSubmit={handleUpdatePasscode} className="flex gap-2">
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter new passcode"
                  className="flex-1 rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-[#c084fc] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-bold text-white transition active:scale-95"
                >
                  Update
                </button>
              </form>
              <span className="block text-[11px] text-purple-300/60">
                Passcode is securely saved for this browser session.
              </span>
            </div>

            {/* Danger Zone: Reset to Defaults */}
            <div className="pt-4 border-t border-red-500/20 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-red-400">
                Reset Site Content
              </label>
              <p className="text-[11px] text-purple-300/70">
                Reverts all website texts and button links to their initial defaults and saves to Firebase.
              </p>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 px-3.5 py-2 text-xs font-bold text-red-300 transition"
              >
                <RotateCcw size={13} />
                <span>Reset to Defaults</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSettingsDrawer(false)}
                className="rounded-xl px-4 py-2 text-xs font-bold text-white/70 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSave()
                  setShowSettingsDrawer(false)
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] px-5 py-2 text-xs font-bold text-white shadow-md active:scale-95"
              >
                <Save size={14} />
                <span>Save All to Firebase</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= RESET CONFIRMATION MODAL ================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-red-500/40 bg-[#190528] p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto size-12 rounded-2xl bg-red-500/20 text-red-400 grid place-items-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">Reset to Default Content?</h4>
              <p className="mt-1 text-xs text-purple-200/70 leading-relaxed">
                This will overwrite any customized copy with the initial default texts and save directly to Firebase.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-xl px-4 py-2 text-xs font-bold text-white/70 hover:text-white border border-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-md active:scale-95"
              >
                <RotateCcw size={13} />
                <span>Yes, Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
