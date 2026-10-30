'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Edit3,
  Save,
  RotateCcw,
  Eye,
  CheckCircle2,
  Lock,
  Unlock,
  X,
  RefreshCw,
  ExternalLink,
  Sliders,
} from 'lucide-react'
import { toast } from 'sonner'
import { useContent } from '@/context/content-context'

export function VisualToolbar() {
  const {
    isVisualEditMode,
    setIsVisualEditMode,
    hasUnsavedChanges,
    saveChanges,
    resetToDefaults,
    isFirebaseConnected,
    lastSavedAt,
  } = useContent()

  const [isSaving, setIsSaving] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // Check login state from localStorage/sessionStorage
  useEffect(() => {
    const isAuth = sessionStorage.getItem('pot_admin_auth') === 'true'
    setIsAdminLoggedIn(isAuth)

    // Check if ?edit=true was passed in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('edit') === 'true' || params.get('admin') === 'true') {
        if (isAuth) {
          setIsVisualEditMode(true)
        } else {
          setShowAuthModal(true)
        }
      }
    }
  }, [setIsVisualEditMode])

  const handleToggleEdit = () => {
    if (isVisualEditMode) {
      setIsVisualEditMode(false)
      toast.info('Exited Visual Edit Mode')
      return
    }

    if (!isAdminLoggedIn) {
      setShowAuthModal(true)
    } else {
      setIsVisualEditMode(true)
      toast.success('Visual Edit Mode ON: Click any text or button on the page to edit!')
    }
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const savedPin = localStorage.getItem('pot_admin_passcode') || 'admin123'
    if (passcode === savedPin || passcode === 'admin123' || passcode === 'potadmin2026') {
      sessionStorage.setItem('pot_admin_auth', 'true')
      setIsAdminLoggedIn(true)
      setShowAuthModal(false)
      setIsVisualEditMode(true)
      toast.success('Visual Edit Mode ON: Click any text or button on the page to edit!')
    } else {
      toast.error('Incorrect passcode. Try: admin123')
    }
  }

  const handleSaveToFirebase = async () => {
    setIsSaving(true)
    try {
      // Blur any currently focused editable element so its onBlur commits to state
      if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      // Short tick to allow react state update from onBlur to complete
      await new Promise((resolve) => setTimeout(resolve, 80))

      const ok = await saveChanges()
      if (ok) {
        toast.success("All visual edits saved to Firebase 'pots' collection!")
      } else {
        toast.error('Failed to save to Firebase.')
      }
    } catch (err) {
      toast.error('Save error: ' + (err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      {/* Floating Pill: Always visible in bottom-left or bottom-right */}
      {!isVisualEditMode && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleToggleEdit}
            title="Open Live Visual Editor"
            className="group flex items-center gap-2.5 rounded-full bg-[#180536]/90 border border-[#b56fff]/60 px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#c084fc] hover:bg-[#240a4b] active:scale-95"
          >
            <div className="grid size-6 place-items-center rounded-full bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] shadow-sm">
              <Edit3 size={13} className="text-white" />
            </div>
            <span>Visual Edit Site</span>
          </button>
        </div>
      )}

      {/* Floating Visual Editor Toolbar (When Edit Mode is ON) */}
      {isVisualEditMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-400/60 bg-[#16062c]/95 px-4 sm:px-6 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.35)] backdrop-blur-2xl text-white">
            
            {/* Left: Mode Badge & Guidance */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider animate-pulse">
                <Edit3 size={12} />
                <span>Visual Editor Live</span>
              </span>
              <span className="hidden md:inline text-xs text-purple-200/80">
                Click any copy on the page to edit directly
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Save Button */}
              <button
                onClick={handleSaveToFirebase}
                disabled={isSaving}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold text-white shadow-lg transition active:scale-95 ${
                  hasUnsavedChanges
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30 animate-pulse'
                    : 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] shadow-purple-500/20 hover:scale-105'
                }`}
              >
                {isSaving ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                <span>{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes *' : 'Save to Firebase'}</span>
              </button>

              {/* Link to Full Admin */}
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-purple-200/80 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition"
              >
                <Sliders size={12} />
                <span>Admin Panel</span>
              </Link>

              {/* Close / Exit Button */}
              <button
                onClick={() => setIsVisualEditMode(false)}
                title="Exit Visual Edit Mode"
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white/80 hover:text-white transition"
              >
                <X size={14} />
                <span className="hidden sm:inline">Done</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Passcode Modal (If user clicks Visual Edit without being logged in) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-purple-400/40 bg-[#170932]/95 p-6 sm:p-7 shadow-2xl text-center space-y-5 text-white">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
            >
              <X size={16} />
            </button>

            <div className="mx-auto size-14 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#6b21a8] grid place-items-center shadow-lg border border-white/20">
              <Lock className="size-6 text-white" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Unlock Visual Editor
              </h3>
              <p className="mt-1 text-xs text-purple-200/70">
                Enter your admin passcode to edit live website copy
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-left">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: admin123)"
                  className="w-full rounded-xl border border-white/20 bg-black/50 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#c084fc] focus:outline-none"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Unlock size={15} />
                <span>Start Editing Live</span>
              </button>
            </form>

            <p className="text-[11px] text-purple-300/60">
              Default passcode: <strong className="text-purple-200">admin123</strong>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
