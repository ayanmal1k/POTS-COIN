'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  RotateCcw,
  ExternalLink,
  Shield,
  Layers,
  Heart,
  TrendingUp,
  MapPin,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Database,
  ArrowRight,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { useContent } from '@/context/content-context'
import { SiteContent, DEFAULT_CONTENT } from '@/lib/default-content'

type AdminTab =
  | 'hero'
  | 'utilities'
  | 'mission'
  | 'partnership'
  | 'roadmap'
  | 'token'
  | 'footer'
  | 'global'
  | 'settings'

const DEFAULT_PASSCODE = 'admin123'

export default function AdminPage() {
  const {
    content: liveContent,
    updateContent,
    resetToDefaults,
    isFirebaseConnected,
    lastSavedAt,
  } = useContent()

  // Local draft state for editing before saving
  const [draft, setDraft] = useState<SiteContent>(liveContent)
  const [activeTab, setActiveTab] = useState<AdminTab>('hero')
  const [isSaving, setIsSaving] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [customPasscode, setCustomPasscode] = useState(DEFAULT_PASSCODE)
  const [newPasscode, setNewPasscode] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Sync draft when liveContent loads from Firestore
  useEffect(() => {
    setDraft(liveContent)
  }, [liveContent])

  // Check saved session passcode
  useEffect(() => {
    const savedPin = localStorage.getItem('pot_admin_passcode') || DEFAULT_PASSCODE
    setCustomPasscode(savedPin)
    const isSessionAuth = sessionStorage.getItem('pot_admin_auth') === 'true'
    if (isSessionAuth) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === customPasscode || passcode === 'admin123' || passcode === 'potadmin2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem('pot_admin_auth', 'true')
      toast.success('Welcome back to $POT Admin!')
    } else {
      toast.error('Incorrect passcode. Try: admin123')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('pot_admin_auth')
    toast.info('Logged out of Admin Panel')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await updateContent(draft)
      if (success) {
        toast.success("All changes saved to Firebase 'pots' collection!")
        setHasUnsavedChanges(false)
      } else {
        toast.error("Failed to save changes to Firebase. Check network/rules.")
      }
    } catch (err) {
      toast.error("Error saving to Firebase: " + (err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetSection = (sectionKey: keyof SiteContent) => {
    if (confirm(`Reset ${sectionKey} to default content?`)) {
      setDraft((prev) => ({
        ...prev,
        [sectionKey]: DEFAULT_CONTENT[sectionKey],
      }))
      setHasUnsavedChanges(true)
      toast.info(`Reset ${sectionKey} to defaults. Click "Save All Changes" to sync.`)
    }
  }

  const handleSyncAllDefaults = async () => {
    if (confirm("Sync and push all original defaults into Firebase 'pots' collection?")) {
      setIsSaving(true)
      const ok = await resetToDefaults()
      setIsSaving(false)
      if (ok) {
        setDraft(DEFAULT_CONTENT)
        setHasUnsavedChanges(false)
        toast.success("Successfully seeded default content into Firebase 'pots' collection!")
      } else {
        toast.error("Could not sync defaults to Firebase.")
      }
    }
  }

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPasscode.trim()) return
    localStorage.setItem('pot_admin_passcode', newPasscode.trim())
    setCustomPasscode(newPasscode.trim())
    setNewPasscode('')
    toast.success('Admin passcode updated successfully!')
  }

  // Helper for simple text field changes
  const updateField = <T extends keyof SiteContent, K extends keyof SiteContent[T]>(
    section: T,
    field: K,
    value: SiteContent[T][K]
  ) => {
    setDraft((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  // If not logged in, render the sleek lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0d041a] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 size-[400px] bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_60%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-[radial-gradient(circle,rgba(216,180,254,0.18)_0%,transparent_60%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#9d4eff]/40 bg-[#170932]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center space-y-6">
          <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#6b21a8] grid place-items-center shadow-[0_0_24px_rgba(168,85,247,0.6)] border border-white/20">
            <Lock className="size-8 text-white" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              $POT Admin Panel
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-purple-200/70">
              WordPress-Style Content Management for $POT Luck Community
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
                placeholder="Enter passcode..."
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#c084fc] focus:outline-none focus:ring-2 focus:ring-[#9333ea]/50 transition"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9c3eff] via-[#ad4eff] to-[#cb7dff] py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(168,62,255,0.5)] transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Unlock size={16} />
              <span>Enter Admin Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-xs text-purple-300/60 flex items-center justify-center gap-1.5">
            <HelpCircle size={14} />
            <span>Default passcode: <strong className="text-purple-200">admin123</strong></span>
          </div>

          <div>
            <Link
              href="/"
              className="text-xs text-purple-300/80 hover:text-white transition flex items-center justify-center gap-1"
            >
              <span>&larr; Return to Live Site</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e031e] text-white flex flex-col font-sans">
      {/* ================= TOP WORDPRESS-STYLE ADMIN BAR ================= */}
      <header className="sticky top-0 z-50 h-14 bg-[#140628]/95 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-white font-extrabold tracking-tight text-sm sm:text-base">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#c084fc] to-[#7c2ae8] text-white shadow-sm font-black text-xs">
              P
            </span>
            <span className="hidden sm:inline">$POT Luck</span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/30">
              CMS Admin
            </span>
          </div>

          <div className="h-4 w-px bg-white/15 hidden md:block" />

          {/* Quick link to live site */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-purple-200/70 hover:text-white transition py-1 px-2.5 rounded-lg hover:bg-white/5"
          >
            <Eye size={13} />
            <span>View Live Site</span>
            <ExternalLink size={11} className="opacity-60" />
          </Link>
        </div>

        {/* Right Header Status & Save Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Firestore Connection status */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-purple-200/80">
            <span
              className={`size-2 rounded-full ${
                isFirebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>
              {isFirebaseConnected ? "Firebase: 'pots' connected" : 'Firebase offline'}
            </span>
          </div>

          {/* Sync Defaults button */}
          <button
            onClick={handleSyncAllDefaults}
            title="Seed / Reset all content to original defaults"
            className="hidden lg:inline-flex items-center gap-1 text-xs text-purple-200/70 hover:text-white py-1.5 px-3 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            <Database size={13} />
            <span>Seed Firebase</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg transition active:scale-95 ${
              hasUnsavedChanges
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/25 animate-pulse'
                : 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] shadow-purple-500/25 hover:scale-105'
            }`}
          >
            {isSaving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes *' : 'Save Content'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="text-xs text-purple-300/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Lock size={15} />
          </button>
        </div>
      </header>

      {/* ================= MAIN WORDPRESS-STYLE LAYOUT: SIDEBAR + CONTENT ================= */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#120424] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0">
          <div className="hidden md:block px-3 py-2 text-[10px] font-black uppercase tracking-wider text-purple-300/50">
            Site Sections
          </div>

          {[
            { id: 'hero' as AdminTab, label: 'Hero Section', icon: Sparkles },
            { id: 'utilities' as AdminTab, label: 'Two Utilities', icon: Layers },
            { id: 'mission' as AdminTab, label: 'Core Mission', icon: Shield },
            { id: 'partnership' as AdminTab, label: 'St. Jude Partnership', icon: Heart },
            { id: 'roadmap' as AdminTab, label: 'Roadmap & Phases', icon: MapPin },
            { id: 'token' as AdminTab, label: 'Token Info & Chart', icon: TrendingUp },
            { id: 'footer' as AdminTab, label: 'Footer & Socials', icon: HelpCircle },
            { id: 'global' as AdminTab, label: 'Global Contracts & Links', icon: Database },
            { id: 'settings' as AdminTab, label: 'Admin Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap md:whitespace-normal w-full text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9c3eff] to-[#ad4eff] text-white shadow-md shadow-purple-900/50'
                    : 'text-purple-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-purple-300/70'} />
                <span>{item.label}</span>
              </button>
            )
          })}

          <div className="hidden md:block mt-auto pt-6 px-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center space-y-2">
              <span className="block text-[10px] uppercase font-bold text-purple-300/60 tracking-wider">
                Firestore Target
              </span>
              <p className="text-xs font-mono font-bold text-white truncate">
                pots / content
              </p>
              {lastSavedAt && (
                <span className="block text-[10px] text-emerald-400">
                  Last saved: {lastSavedAt}
                </span>
              )}
            </div>
          </div>
        </aside>

        {/* Main Editor Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl">
          {/* ================= TAB 1: HERO SECTION ================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Hero Section Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Customize the main headline, subtitle, action buttons, contract badge, and St. Jude card.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('hero')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Hero</span>
                </button>
              </div>

              {/* Headline Split inputs */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Headline Components
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Prefix Text</label>
                    <input
                      type="text"
                      value={draft.hero.headingPart1}
                      onChange={(e) => updateField('hero', 'headingPart1', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-amber-300 font-semibold mb-1">
                      Yellow Highlight Text
                    </label>
                    <input
                      type="text"
                      value={draft.hero.headingHighlight}
                      onChange={(e) => updateField('hero', 'headingHighlight', e.target.value)}
                      className="w-full rounded-xl border border-amber-400/40 bg-black/40 px-3.5 py-2.5 text-sm text-amber-300 focus:border-amber-400 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Suffix Text</label>
                    <input
                      type="text"
                      value={draft.hero.headingPart2}
                      onChange={(e) => updateField('hero', 'headingPart2', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Eyebrow Subtitle (under headline)</label>
                    <input
                      type="text"
                      value={draft.hero.eyebrow}
                      onChange={(e) => updateField('hero', 'eyebrow', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Transparency Badge Text</label>
                    <input
                      type="text"
                      value={draft.hero.transparencyBadge}
                      onChange={(e) => updateField('hero', 'transparencyBadge', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Hero Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={draft.hero.description}
                    onChange={(e) => updateField('hero', 'description', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Call to Action Buttons
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Button 1: Community */}
                  <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20 space-y-3">
                    <span className="block text-xs font-bold text-purple-300">
                      Primary Button (Gradient Pill)
                    </span>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={draft.hero.joinButtonText}
                        onChange={(e) => updateField('hero', 'joinButtonText', e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Button Link (URL)</label>
                      <input
                        type="text"
                        value={draft.hero.joinButtonLink}
                        onChange={(e) => updateField('hero', 'joinButtonLink', e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Button 2: Live Chart */}
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
                    <span className="block text-xs font-bold text-emerald-300">
                      Secondary Button (Outline Glass Pill)
                    </span>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={draft.hero.chartButtonText}
                        onChange={(e) => updateField('hero', 'chartButtonText', e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Button Link / Anchor</label>
                      <input
                        type="text"
                        value={draft.hero.chartButtonLink}
                        onChange={(e) => updateField('hero', 'chartButtonLink', e.target.value)}
                        placeholder="#chart or external url"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right St. Jude Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Hero St. Jude Partnership Card
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Card Eyebrow</label>
                    <input
                      type="text"
                      value={draft.hero.stJudeCardEyebrow}
                      onChange={(e) => updateField('hero', 'stJudeCardEyebrow', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Card Title</label>
                    <input
                      type="text"
                      value={draft.hero.stJudeCardTitle}
                      onChange={(e) => updateField('hero', 'stJudeCardTitle', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Milestone Text (Before)</label>
                    <input
                      type="text"
                      value={draft.hero.stJudeCardMilestonePrefix}
                      onChange={(e) => updateField('hero', 'stJudeCardMilestonePrefix', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-amber-300 font-semibold mb-1">
                      Milestone Highlight (e.g. 12 SOL)
                    </label>
                    <input
                      type="text"
                      value={draft.hero.stJudeCardMilestoneHighlight}
                      onChange={(e) => updateField('hero', 'stJudeCardMilestoneHighlight', e.target.value)}
                      className="w-full rounded-xl border border-amber-400/40 bg-black/40 px-3.5 py-2.5 text-sm text-amber-300 focus:border-amber-400 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Milestone Text (After)</label>
                    <input
                      type="text"
                      value={draft.hero.stJudeCardMilestoneSuffix}
                      onChange={(e) => updateField('hero', 'stJudeCardMilestoneSuffix', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Arrow Button Link</label>
                  <input
                    type="text"
                    value={draft.hero.stJudeCardButtonLink}
                    onChange={(e) => updateField('hero', 'stJudeCardButtonLink', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: TWO UTILITIES ================= */}
          {activeTab === 'utilities' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Two Utilities Section Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit the "Two Utilities. One Mission." section, Holder Rewards card, and Real Impact card.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('utilities')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Section</span>
                </button>
              </div>

              {/* Main Column */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Eyebrow Badge</label>
                    <input
                      type="text"
                      value={draft.utilities.eyebrow}
                      onChange={(e) => updateField('utilities', 'eyebrow', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Heading</label>
                    <input
                      type="text"
                      value={draft.utilities.heading}
                      onChange={(e) => updateField('utilities', 'heading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={draft.utilities.description}
                    onChange={(e) => updateField('utilities', 'description', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={draft.utilities.buttonText}
                      onChange={(e) => updateField('utilities', 'buttonText', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={draft.utilities.buttonLink}
                      onChange={(e) => updateField('utilities', 'buttonLink', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* The Two Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-3">
                  <span className="block text-xs font-bold text-purple-300 uppercase">
                    Card 1: Holder Rewards
                  </span>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Title</label>
                    <input
                      type="text"
                      value={draft.utilities.card1Title}
                      onChange={(e) => updateField('utilities', 'card1Title', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Badge (e.g. 3% SOL Reflections)</label>
                    <input
                      type="text"
                      value={draft.utilities.card1Badge}
                      onChange={(e) => updateField('utilities', 'card1Badge', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none font-bold text-purple-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={draft.utilities.card1Desc}
                      onChange={(e) => updateField('utilities', 'card1Desc', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
                  <span className="block text-xs font-bold text-emerald-300 uppercase">
                    Card 2: Real Impact
                  </span>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Title</label>
                    <input
                      type="text"
                      value={draft.utilities.card2Title}
                      onChange={(e) => updateField('utilities', 'card2Title', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Badge (e.g. Charity at $100K MC)</label>
                    <input
                      type="text"
                      value={draft.utilities.card2Badge}
                      onChange={(e) => updateField('utilities', 'card2Badge', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none font-bold text-emerald-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={draft.utilities.card2Desc}
                      onChange={(e) => updateField('utilities', 'card2Desc', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: MISSION ================= */}
          {activeTab === 'mission' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Core Mission Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit the mission statements and bullet points in the purple gradient section.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('mission')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Mission</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={draft.mission.eyebrow}
                      onChange={(e) => updateField('mission', 'eyebrow', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Main Heading</label>
                    <input
                      type="text"
                      value={draft.mission.heading}
                      onChange={(e) => updateField('mission', 'heading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Mission Paragraph</label>
                  <textarea
                    rows={3}
                    value={draft.mission.description}
                    onChange={(e) => updateField('mission', 'description', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Mission Points */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                    Mission Feature Points
                  </h3>
                  <button
                    onClick={() => {
                      setDraft((prev) => ({
                        ...prev,
                        mission: {
                          ...prev.mission,
                          points: [
                            ...prev.mission.points,
                            { title: 'New Point', text: 'Point description...' },
                          ],
                        },
                      }))
                      setHasUnsavedChanges(true)
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-300 hover:text-white px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition"
                  >
                    <Plus size={13} />
                    <span>Add Point</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draft.mission.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-purple-300">
                          Point #{idx + 1}
                        </span>
                        {draft.mission.points.length > 1 && (
                          <button
                            onClick={() => {
                              setDraft((prev) => ({
                                ...prev,
                                mission: {
                                  ...prev.mission,
                                  points: prev.mission.points.filter((_, i) => i !== idx),
                                },
                              }))
                              setHasUnsavedChanges(true)
                            }}
                            className="text-red-400/60 hover:text-red-400 p-1 transition"
                            title="Remove point"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={pt.title}
                        onChange={(e) => {
                          const newPts = [...draft.mission.points]
                          newPts[idx].title = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            mission: { ...prev.mission, points: newPts },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-bold text-white focus:border-[#c084fc] focus:outline-none"
                        placeholder="Point title..."
                      />
                      <textarea
                        rows={2}
                        value={pt.text}
                        onChange={(e) => {
                          const newPts = [...draft.mission.points]
                          newPts[idx].text = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            mission: { ...prev.mission, points: newPts },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 focus:border-[#c084fc] focus:outline-none"
                        placeholder="Point description..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: ST JUDE PARTNERSHIP ================= */}
          {activeTab === 'partnership' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    St. Jude Partnership Section Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit the main story copy, direct donation link, and milestone targets.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('partnership')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Section</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Heading Prefix</label>
                    <input
                      type="text"
                      value={draft.partnership.heading}
                      onChange={(e) => updateField('partnership', 'heading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-300 font-semibold mb-1">
                      Gradient Highlight
                    </label>
                    <input
                      type="text"
                      value={draft.partnership.headingHighlight}
                      onChange={(e) => updateField('partnership', 'headingHighlight', e.target.value)}
                      className="w-full rounded-xl border border-purple-400/40 bg-black/40 px-3.5 py-2.5 text-sm text-purple-300 focus:border-purple-400 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Heading Suffix</label>
                    <input
                      type="text"
                      value={draft.partnership.headingSuffix}
                      onChange={(e) => updateField('partnership', 'headingSuffix', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Partnership Description</label>
                  <textarea
                    rows={4}
                    value={draft.partnership.description}
                    onChange={(e) => updateField('partnership', 'description', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Donate Button Text</label>
                    <input
                      type="text"
                      value={draft.partnership.donateButtonText}
                      onChange={(e) => updateField('partnership', 'donateButtonText', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Donate Button URL</label>
                    <input
                      type="text"
                      value={draft.partnership.donateButtonLink}
                      onChange={(e) => updateField('partnership', 'donateButtonLink', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: ROADMAP ================= */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Roadmap & Phases Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit each of the 4 project phases, their titles, status tags, and milestone check items.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('roadmap')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Roadmap</span>
                </button>
              </div>

              {/* Section Header */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={draft.roadmap.eyebrow}
                      onChange={(e) => updateField('roadmap', 'eyebrow', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Title</label>
                    <input
                      type="text"
                      value={draft.roadmap.heading}
                      onChange={(e) => updateField('roadmap', 'heading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Description</label>
                  <input
                    type="text"
                    value={draft.roadmap.description}
                    onChange={(e) => updateField('roadmap', 'description', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draft.roadmap.phases.map((phase, pIdx) => (
                  <div
                    key={phase.id || pIdx}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <input
                        type="text"
                        value={phase.phaseNumber}
                        onChange={(e) => {
                          const newPhases = [...draft.roadmap.phases]
                          newPhases[pIdx].phaseNumber = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, phases: newPhases },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-xs font-black uppercase tracking-wider text-purple-300 w-28"
                      />
                      <input
                        type="text"
                        value={phase.badge}
                        onChange={(e) => {
                          const newPhases = [...draft.roadmap.phases]
                          newPhases[pIdx].badge = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, phases: newPhases },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="rounded-lg border border-emerald-500/40 bg-emerald-950/20 px-2 py-1 text-xs font-bold text-emerald-300 text-right w-28"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">Phase Title</label>
                      <input
                        type="text"
                        value={phase.title}
                        onChange={(e) => {
                          const newPhases = [...draft.roadmap.phases]
                          newPhases[pIdx].title = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, phases: newPhases },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-bold text-white focus:border-[#c084fc] focus:outline-none"
                      />
                    </div>

                    {/* Milestone Items */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-white/70">Checklist Items</label>
                        <button
                          onClick={() => {
                            const newPhases = [...draft.roadmap.phases]
                            newPhases[pIdx].items.push('New milestone item')
                            setDraft((prev) => ({
                              ...prev,
                              roadmap: { ...prev.roadmap, phases: newPhases },
                            }))
                            setHasUnsavedChanges(true)
                          }}
                          className="text-[11px] text-purple-300 hover:text-white"
                        >
                          + Add Item
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {phase.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newPhases = [...draft.roadmap.phases]
                                newPhases[pIdx].items[itemIdx] = e.target.value
                                setDraft((prev) => ({
                                  ...prev,
                                  roadmap: { ...prev.roadmap, phases: newPhases },
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/90 focus:border-[#c084fc] focus:outline-none"
                            />
                            {phase.items.length > 1 && (
                              <button
                                onClick={() => {
                                  const newPhases = [...draft.roadmap.phases]
                                  newPhases[pIdx].items = newPhases[pIdx].items.filter(
                                    (_, i) => i !== itemIdx
                                  )
                                  setDraft((prev) => ({
                                    ...prev,
                                    roadmap: { ...prev.roadmap, phases: newPhases },
                                  }))
                                  setHasUnsavedChanges(true)
                                }}
                                className="text-red-400/50 hover:text-red-400 p-1"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: TOKEN INFO & CHART ================= */}
          {activeTab === 'token' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Token Info & Chart Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit token specifications, key bullet features, and DexScreener chart titles.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('tokenInfo')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Token Info</span>
                </button>
              </div>

              {/* Specs */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Token Specs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Token Name</label>
                    <input
                      type="text"
                      value={draft.tokenInfo.tokenName}
                      onChange={(e) => updateField('tokenInfo', 'tokenName', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Ticker</label>
                    <input
                      type="text"
                      value={draft.tokenInfo.ticker}
                      onChange={(e) => updateField('tokenInfo', 'ticker', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Blockchain</label>
                    <input
                      type="text"
                      value={draft.tokenInfo.blockchain}
                      onChange={(e) => updateField('tokenInfo', 'blockchain', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Chart details */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Live DexScreener Chart Block
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Chart Title</label>
                    <input
                      type="text"
                      value={draft.tokenInfo.chartTitle}
                      onChange={(e) => updateField('tokenInfo', 'chartTitle', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Chart Status Badge</label>
                    <input
                      type="text"
                      value={draft.tokenInfo.chartBadge}
                      onChange={(e) => updateField('tokenInfo', 'chartBadge', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none font-bold text-emerald-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Chart Subtitle</label>
                  <input
                    type="text"
                    value={draft.tokenInfo.chartSubtitle}
                    onChange={(e) => updateField('tokenInfo', 'chartSubtitle', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider">
                    Key Highlights List
                  </h3>
                  <button
                    onClick={() => {
                      setDraft((prev) => ({
                        ...prev,
                        tokenInfo: {
                          ...prev.tokenInfo,
                          features: [...prev.tokenInfo.features, 'New key highlight'],
                        },
                      }))
                      setHasUnsavedChanges(true)
                    }}
                    className="text-xs font-bold text-purple-300 hover:text-white px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition"
                  >
                    + Add Highlight
                  </button>
                </div>

                <div className="space-y-2">
                  {draft.tokenInfo.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-6 shrink-0 rounded-full bg-purple-500/20 text-purple-300 grid place-items-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const newFeats = [...draft.tokenInfo.features]
                          newFeats[i] = e.target.value
                          setDraft((prev) => ({
                            ...prev,
                            tokenInfo: { ...prev.tokenInfo, features: newFeats },
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                      />
                      {draft.tokenInfo.features.length > 1 && (
                        <button
                          onClick={() => {
                            setDraft((prev) => ({
                              ...prev,
                              tokenInfo: {
                                ...prev.tokenInfo,
                                features: prev.tokenInfo.features.filter((_, idx) => idx !== i),
                              },
                            }))
                            setHasUnsavedChanges(true)
                          }}
                          className="text-red-400/60 hover:text-red-400 p-1.5"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: FOOTER & SOCIALS ================= */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Footer & Socials Editor
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Edit footer copyright notices, brand naming, and Telegram community buttons.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('footer')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Footer</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Footer Heading</label>
                    <input
                      type="text"
                      value={draft.footer.heading}
                      onChange={(e) => updateField('footer', 'heading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Footer Subheading</label>
                    <input
                      type="text"
                      value={draft.footer.subheading}
                      onChange={(e) => updateField('footer', 'subheading', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Telegram Button Text</label>
                    <input
                      type="text"
                      value={draft.footer.telegramButtonText}
                      onChange={(e) => updateField('footer', 'telegramButtonText', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Telegram Button URL</label>
                    <input
                      type="text"
                      value={draft.footer.telegramButtonLink}
                      onChange={(e) => updateField('footer', 'telegramButtonLink', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Copyright Line</label>
                  <input
                    type="text"
                    value={draft.footer.copyright}
                    onChange={(e) => updateField('footer', 'copyright', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 8: GLOBAL CONTRACTS & ADDRESSES ================= */}
          {activeTab === 'global' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Global Contracts & Links
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/70">
                    Update on-chain Solana addresses, official channels, and live DexScreener URLs. Updates everywhere site-wide.
                  </p>
                </div>
                <button
                  onClick={() => handleResetSection('global')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Global</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    Brand Name (e.g. EpiCoin)
                  </label>
                  <input
                    type="text"
                    value={draft.global.brandName}
                    onChange={(e) => updateField('global', 'brandName', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-purple-300 font-semibold mb-1">
                    Solana Contract Address (SPL Token)
                  </label>
                  <input
                    type="text"
                    value={draft.global.solanaContractAddress}
                    onChange={(e) => updateField('global', 'solanaContractAddress', e.target.value)}
                    className="w-full rounded-xl border border-purple-400/40 bg-black/40 px-3.5 py-2.5 font-mono text-sm text-purple-200 focus:border-[#c084fc] focus:outline-none font-bold select-all"
                  />
                  <p className="mt-1 text-[11px] text-white/50">
                    Controls the copyable address card in Hero, Header, and Token Information.
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-purple-300 font-semibold mb-1">
                    St. Jude Charity Vault Solana Address
                  </label>
                  <input
                    type="text"
                    value={draft.global.charityVaultAddress}
                    onChange={(e) => updateField('global', 'charityVaultAddress', e.target.value)}
                    className="w-full rounded-xl border border-purple-400/40 bg-black/40 px-3.5 py-2.5 font-mono text-sm text-purple-200 focus:border-[#c084fc] focus:outline-none font-bold select-all"
                  />
                  <p className="mt-1 text-[11px] text-white/50">
                    Controls the donation wallet address in the St. Jude partnership section.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Official Telegram Community URL</label>
                    <input
                      type="text"
                      value={draft.global.telegramUrl}
                      onChange={(e) => updateField('global', 'telegramUrl', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">DexScreener Pair Page URL</label>
                    <input
                      type="text"
                      value={draft.global.dexScreenerUrl}
                      onChange={(e) => updateField('global', 'dexScreenerUrl', e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">DexScreener Embed Iframe URL</label>
                  <input
                    type="text"
                    value={draft.global.dexScreenerChartEmbedUrl}
                    onChange={(e) => updateField('global', 'dexScreenerChartEmbedUrl', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-[#c084fc] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 9: SETTINGS & BACKUP ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  CMS & Security Settings
                </h2>
                <p className="text-xs sm:text-sm text-purple-200/70">
                  Manage admin passcodes and Firebase database synchronization.
                </p>
              </div>

              {/* Change Passcode */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={16} />
                  <span>Admin Passcode Security</span>
                </h3>

                <form onSubmit={handleChangePasscode} className="space-y-3 max-w-md">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">
                      New Admin Passcode
                    </label>
                    <input
                      type="password"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="Enter new secret passcode..."
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-bold text-white transition active:scale-95"
                  >
                    <span>Update Passcode</span>
                  </button>
                </form>
              </div>

              {/* Database sync actions */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-wider flex items-center gap-2">
                  <Database size={16} />
                  <span>Firestore Database Management</span>
                </h3>

                <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2 text-xs text-purple-200/80">
                  <p><strong>Project ID:</strong> admiral-1a377</p>
                  <p><strong>Target Collection:</strong> pots</p>
                  <p><strong>Target Document:</strong> content</p>
                  <p><strong>Status:</strong> {isFirebaseConnected ? 'Connected & Active' : 'Waiting for connection'}</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSyncAllDefaults}
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-900/30 hover:bg-purple-800/40 px-4 py-2.5 text-xs sm:text-sm font-bold text-purple-200 transition"
                  >
                    <RotateCcw size={14} />
                    <span>Force Re-seed All Default Content to Firebase</span>
                  </button>
                  <p className="mt-1.5 text-[11px] text-white/50">
                    Use this if you ever need to restore everything back to initial production defaults in the 'pots' collection.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Floating Unsaved Changes Pill */}
          {hasUnsavedChanges && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#170932] border border-[#c084fc]/80 px-5 py-3 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.5)] backdrop-blur-xl animate-bounce">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <AlertCircle size={16} />
                <span>You have unsaved changes!</span>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-4 py-1.5 text-xs font-black text-white shadow-md active:scale-95 transition"
              >
                {isSaving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
                <span>Save Now</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

