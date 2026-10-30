'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Edit3, ExternalLink, Check, Link as LinkIcon, X } from 'lucide-react'
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
 * In Edit Mode, clicking the button opens a mini-popover to change Text AND Link URL directly on the live page!
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [draftText, setDraftText] = useState(text)
  const [draftLink, setDraftLink] = useState(link)

  useEffect(() => {
    setDraftText(text)
    setDraftLink(link)
  }, [text, link])

  if (!isVisualEditMode) {
    return (
      <a href={link} target={target} rel={rel} className={className}>
        {children || <span>{text}</span>}
        {icon}
      </a>
    )
  }

  const handleSavePopover = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateFieldByPath(textPath, draftText)
    updateFieldByPath(linkPath, draftLink)
    setIsPopoverOpen(false)
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsPopoverOpen(!isPopoverOpen)
        }}
        title="Click to edit button text & link"
        className={`${className} outline-dashed outline-2 outline-amber-400/70 hover:outline-amber-400 hover:bg-amber-500/10 cursor-pointer relative group`}
      >
        {children || <span>{text}</span>}
        {icon}
        <span className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-amber-400 text-black grid place-items-center text-[10px] font-bold shadow-md">
          <Edit3 size={11} />
        </span>
      </button>

      {/* Popover editor modal */}
      {isPopoverOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 top-full left-0 mt-3 w-72 sm:w-80 rounded-2xl border border-purple-400/60 bg-[#16062c]/95 p-4 shadow-2xl backdrop-blur-2xl text-white text-left space-y-3 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Edit3 size={13} /> Edit Button & Link
            </span>
            <button
              onClick={() => setIsPopoverOpen(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-purple-200/80 mb-1">
              Button Label
            </label>
            <input
              type="text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-1.5 text-xs text-white focus:border-[#c084fc] focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-purple-200/80 mb-1">
              Destination URL / Anchor
            </label>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/50 px-3 py-1.5">
              <LinkIcon size={12} className="text-purple-300 shrink-0" />
              <input
                type="text"
                value={draftLink}
                onChange={(e) => setDraftLink(e.target.value)}
                placeholder="https://... or #anchor"
                className="w-full bg-transparent text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsPopoverOpen(false)}
              className="px-3 py-1 text-xs text-white/70 hover:text-white rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSavePopover}
              className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] px-3.5 py-1.5 text-xs font-bold text-white shadow-md active:scale-95"
            >
              <Check size={13} />
              <span>Apply</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
