'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Edit3,
  ExternalLink,
  Check,
  Link as LinkIcon,
  X,
  Sparkles,
  Move,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
} from 'lucide-react'
import { useContent } from '@/context/content-context'

interface TextStyleData {
  x?: number
  y?: number
  align?: 'left' | 'center' | 'right'
}

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
 * Visual In-Place Editable Text component with WordPress-style mover & alignment controls.
 * When isVisualEditMode is ON:
 * - Click directly on text to edit content inline
 * - Hover or focus to reveal the WordPress-style micro toolbar
 * - Drag the ✥ handle or click ⬅ ➡️ ⬆ ⬇ arrows to move text within its area without breaking layout!
 * - Toggle alignment: Left, Center, Right
 * - Reset position anytime with ↺
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
  const { content, isVisualEditMode, updateFieldByPath } = useContent()
  const ref = useRef<HTMLElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Safe unique key for style indexing in content.textStyles
  const styleKey = path.replace(/[^a-zA-Z0-9_]/g, '_')
  const savedStyle: TextStyleData = (content?.textStyles as any)?.[styleKey] || {}

  const [localOffset, setLocalOffset] = useState<{ x: number; y: number }>({
    x: savedStyle.x || 0,
    y: savedStyle.y || 0,
  })

  // Synchronize when external content changes
  useEffect(() => {
    setLocalOffset({
      x: savedStyle.x || 0,
      y: savedStyle.y || 0,
    })
  }, [savedStyle.x, savedStyle.y])

  // Update text when external content changes
  useEffect(() => {
    if (ref.current && !isFocused) {
      if (!children) {
        ref.current.innerText = value || ''
      }
    }
  }, [value, isFocused, children])

  // Compute CSS transform and alignment
  const hasOffset = localOffset.x !== 0 || localOffset.y !== 0
  const transformStyle = hasOffset
    ? `translate3d(${localOffset.x}px, ${localOffset.y}px, 0)`
    : undefined

  const inlineStyle: React.CSSProperties = {
    transform: transformStyle,
    textAlign: savedStyle.align,
    display: Component === 'span' && (transformStyle || savedStyle.align) ? 'inline-block' : undefined,
    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
  }

  // When NOT in admin visual edit mode: render clean native component with applied styles
  if (!isVisualEditMode) {
    if (children) {
      return (
        <Component className={className} style={inlineStyle}>
          {children}
        </Component>
      )
    }
    return (
      <Component className={className} style={inlineStyle}>
        {value}
      </Component>
    )
  }

  // --- Mover & Alignment Handlers ---
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

  // Safe clamping so text never breaks out of bounds
  const clampX = (val: number) => Math.max(-100, Math.min(100, val))
  const clampY = (val: number) => Math.max(-80, Math.min(80, val))

  const nudge = (dx: number, dy: number, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    const step = e?.shiftKey ? 12 : 4
    const newX = clampX(localOffset.x + dx * step)
    const newY = clampY(localOffset.y + dy * step)
    setLocalOffset({ x: newX, y: newY })
    updateFieldByPath(`textStyles.${styleKey}`, {
      ...savedStyle,
      x: newX,
      y: newY,
    })
  }

  const handleAlign = (align: 'left' | 'center' | 'right', e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    const newAlign = savedStyle.align === align ? undefined : align
    updateFieldByPath(`textStyles.${styleKey}`, {
      ...savedStyle,
      align: newAlign,
    })
  }

  const handleReset = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setLocalOffset({ x: 0, y: 0 })
    updateFieldByPath(`textStyles.${styleKey}`, {
      x: 0,
      y: 0,
      align: undefined,
    })
  }

  // Drag to Move handle
  const handlePointerDownDrag = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const startX = e.clientX
    const startY = e.clientY
    const initX = localOffset.x
    const initY = localOffset.y

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const deltaX = moveEvt.clientX - startX
      const deltaY = moveEvt.clientY - startY
      const newX = clampX(initX + deltaX)
      const newY = clampY(initY + deltaY)
      setLocalOffset({ x: newX, y: newY })
    }

    const handlePointerUp = (upEvt: PointerEvent) => {
      setIsDragging(false)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      const deltaX = upEvt.clientX - startX
      const deltaY = upEvt.clientY - startY
      const finalX = clampX(initX + deltaX)
      const finalY = clampY(initY + deltaY)
      updateFieldByPath(`textStyles.${styleKey}`, {
        ...savedStyle,
        x: finalX,
        y: finalY,
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const showToolbar = isHovered || isFocused || isDragging

  return (
    <span
      className="relative group/editable inline-block max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isDragging && setIsHovered(false)}
    >
      {/* WordPress-style Floating Micro Toolbar */}
      {showToolbar && (
        <span
          contentEditable={false}
          className="absolute bottom-full left-0 mb-1 z-[9999] flex items-center gap-1 rounded-full border border-[#c084fc]/70 bg-[#1e073c]/95 px-2 py-1 text-xs text-white shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-xl select-none animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle */}
          <span
            onPointerDown={handlePointerDownDrag}
            title="Click and drag to move text around safely within bounds"
            className="grid size-6 place-items-center rounded-full bg-purple-500/25 hover:bg-purple-500/50 cursor-grab active:cursor-grabbing text-purple-200 hover:text-white transition"
          >
            <Move size={12} />
          </span>

          <span className="w-px h-3.5 bg-white/20" />

          {/* Directional Nudge Arrows (← ↑ ↓ →) */}
          <button
            type="button"
            onClick={(e) => nudge(-1, 0, e)}
            title="Nudge Left (Shift+Click for 12px)"
            className="grid size-5 place-items-center rounded-md hover:bg-white/20 text-white/80 hover:text-white transition active:scale-90"
          >
            <ArrowLeft size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => nudge(0, -1, e)}
            title="Nudge Up (Shift+Click for 12px)"
            className="grid size-5 place-items-center rounded-md hover:bg-white/20 text-white/80 hover:text-white transition active:scale-90"
          >
            <ArrowUp size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => nudge(0, 1, e)}
            title="Nudge Down (Shift+Click for 12px)"
            className="grid size-5 place-items-center rounded-md hover:bg-white/20 text-white/80 hover:text-white transition active:scale-90"
          >
            <ArrowDown size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => nudge(1, 0, e)}
            title="Nudge Right (Shift+Click for 12px)"
            className="grid size-5 place-items-center rounded-md hover:bg-white/20 text-white/80 hover:text-white transition active:scale-90"
          >
            <ArrowRight size={11} />
          </button>

          <span className="w-px h-3.5 bg-white/20" />

          {/* Alignment Toggles */}
          <button
            type="button"
            onClick={(e) => handleAlign('left', e)}
            title="Align Left"
            className={`grid size-5 place-items-center rounded-md transition ${
              savedStyle.align === 'left' ? 'bg-[#9333ea] text-white' : 'hover:bg-white/20 text-white/70'
            }`}
          >
            <AlignLeft size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => handleAlign('center', e)}
            title="Align Center"
            className={`grid size-5 place-items-center rounded-md transition ${
              savedStyle.align === 'center' ? 'bg-[#9333ea] text-white' : 'hover:bg-white/20 text-white/70'
            }`}
          >
            <AlignCenter size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => handleAlign('right', e)}
            title="Align Right"
            className={`grid size-5 place-items-center rounded-md transition ${
              savedStyle.align === 'right' ? 'bg-[#9333ea] text-white' : 'hover:bg-white/20 text-white/70'
            }`}
          >
            <AlignRight size={11} />
          </button>

          {/* Offset Indicator & Reset */}
          {hasOffset && (
            <>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="font-mono text-[9px] text-[#c084fc] px-1 font-bold">
                {localOffset.x >= 0 ? `+${localOffset.x}` : localOffset.x},
                {localOffset.y >= 0 ? `+${localOffset.y}` : localOffset.y}
              </span>
              <button
                type="button"
                onClick={handleReset}
                title="Reset position to default (0, 0)"
                className="grid size-5 place-items-center rounded-md hover:bg-rose-500/30 text-rose-300 hover:text-white transition active:scale-90"
              >
                <RotateCcw size={10} />
              </button>
            </>
          )}
        </span>
      )}

      {/* Actual Editable Element */}
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
        style={inlineStyle}
        title="Click to edit text. Hover for move & align toolbar."
        className={`${className} outline-dashed outline-2 ${
          isFocused
            ? 'outline-[#c084fc] bg-purple-500/20 shadow-[0_0_15px_rgba(192,132,252,0.4)]'
            : isHovered
            ? 'outline-[#c084fc]/70 bg-purple-500/10'
            : 'outline-purple-400/40 hover:outline-purple-400'
        } cursor-text transition-all rounded px-1 -mx-1`}
      >
        {children || value || placeholder}
      </Component>
    </span>
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
