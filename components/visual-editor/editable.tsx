'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Edit3, ExternalLink, Check, Link as LinkIcon, X, Sparkles } from 'lucide-react'
import { useContent } from '@/context/content-context'

interface EditableTextProps {
  value: string
  path: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'strong'
  className?: string
  placeholder?: string
  multiline?: boolean
  children?: React.ReactNode
}

/**
 * Visual In-Place Editable Text component.
 * When isVisualEditMode is ON, users can click directly on the text on the live page and type!
 */
export function EditableText({
  value,
  path,
  as: Component = 'span',
  className = '',
  placeholder = 'Type here...',
  multiline = false,
  children,
}: EditableTextProps) {
  const { isVisualEditMode, updateFieldByPath } = useContent()
  const ref = useRef<HTMLElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Update text when external content changes
  useEffect(() => {
    if (ref.current && !isFocused) {
      if (children) {
        // If complex children, we leave it to react
      } else {
        ref.current.innerText = value || ''
      }
    }
  }, [value, isFocused, children])

  if (!isVisualEditMode) {
    if (children) {
      return <Component className={className}>{children}</Component>
    }
    return <Component className={className}>{value}</Component>
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (ref.current) {
      const newText = ref.current.innerText.trim()
      if (newText !== value) {
        updateFieldByPath(path, newText)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      ref.current?.blur()
    }
  }

  return (
    <Component
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
      }}
      title="Click to edit text directly"
      className={`${className} outline-dashed outline-2 ${
        isFocused
          ? 'outline-[#c084fc] bg-purple-500/20 shadow-[0_0_15px_rgba(192,132,252,0.4)]'
          : 'outline-purple-400/50 hover:outline-purple-400 hover:bg-purple-500/10'
      } cursor-text transition-all rounded px-1 -mx-1`}
    >
      {children || value || placeholder}
    </Component>
  )
}

interface EditableButtonProps {
  text: string
  textPath: string
  link: string
  linkPath: string
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  target?: string
  rel?: string
}

/**
 * Visual In-Place Editable Button / Link component.
 * Uses a top-level Portal with z-[99999] so the edit modal is NEVER clipped by overflow:hidden,
 * transform, or lower stacking contexts!
 */
export function EditableButton({
  text,
  textPath,
  link,
  linkPath,
  className = '',
  children,
  icon,
  target,
  rel,
}: EditableButtonProps) {
  const { isVisualEditMode, updateFieldByPath } = useContent()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [draftText, setDraftText] = useState(text)
  const [draftLink, setDraftLink] = useState(link)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setDraftText(text)
    setDraftLink(link)
  }, [text, link])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  if (!isVisualEditMode) {
    return (
      <a href={link} target={target} rel={rel} className={className}>
        {children || <span>{text}</span>}
        {icon}
      </a>
    )
  }

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateFieldByPath(textPath, draftText)
    updateFieldByPath(linkPath, draftLink)
    setIsModalOpen(false)
  }

  // The modal overlay rendered via React Portal directly into document.body
  const modalContent = isModalOpen && mounted ? (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation()
        setIsModalOpen(false)
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-purple-400/60 bg-[#16062c] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(168,85,247,0.4)] backdrop-blur-2xl text-white text-left space-y-6 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#c084fc] to-[#7c2ae8] text-white shadow-md">
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Edit Button &amp; Link
              </h3>
              <p className="text-xs text-purple-200/70">
                Update button text and destination URL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="grid size-8 place-items-center rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveModal} className="space-y-4">
          {/* Button Label */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/90 mb-1.5">
              Button Text / Label
            </label>
            <input
              type="text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="e.g. Join the Community"
              className="w-full rounded-xl border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white focus:border-[#c084fc] focus:outline-none transition shadow-inner"
              autoFocus
            />
          </div>

          {/* Destination URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-200/90 mb-1.5">
              Destination URL or Page Anchor
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 px-3.5 py-2.5 shadow-inner focus-within:border-[#c084fc]">
              <LinkIcon size={15} className="text-purple-300 shrink-0" />
              <input
                type="text"
                value={draftLink}
                onChange={(e) => setDraftLink(e.target.value)}
                placeholder="https://... or #section-id"
                className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
              />
            </div>
            <span className="block mt-1 text-[11px] text-purple-300/60">
              Supports web links (<code className="text-purple-200">https://...</code>) or page anchors (<code className="text-purple-200">#ecosystem</code>, <code className="text-purple-200">#partnership</code>)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl px-4 py-2 text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.02] active:scale-95"
            >
              <Check size={14} />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsModalOpen(true)
        }}
        title="Click to edit button text &amp; link"
        className={`${className} outline-dashed outline-2 outline-amber-400/80 hover:outline-amber-400 hover:bg-amber-500/10 cursor-pointer relative group`}
      >
        {children || <span>{text}</span>}
        {icon}
        <span className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-amber-400 text-black grid place-items-center text-[10px] font-bold shadow-md transition-transform group-hover:scale-125">
          <Edit3 size={11} />
        </span>
      </button>

      {/* Render modal directly in document.body via Portal */}
      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  )
}
