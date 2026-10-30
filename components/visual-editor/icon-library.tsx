'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Heart,
  HeartHandshake,
  HandHeart,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  PawPrint,
  Coins,
  DollarSign,
  Wallet,
  TrendingUp,
  Flame,
  Zap,
  Target,
  Rocket,
  Flag,
  Star,
  Sparkles,
  Trophy,
  Crown,
  Award,
  Medal,
  Gem,
  Gift,
  Smile,
  Globe,
  Lock,
  Unlock,
  Check,
  CheckCircle2,
  Bell,
  Send,
  Mail,
  Megaphone,
  Compass,
  Milestone,
  Route,
  Activity,
  Layers,
  Database,
  Eye,
  Key,
  Bookmark,
  Coffee,
  Sun,
  Moon,
  PiggyBank,
  BadgeDollarSign,
  CircleDollarSign,
  ArrowUpRight,
  LifeBuoy,
  Home,
  Clock,
  ThumbsUp,
  Cpu,
  FileText,
  Edit3,
  Search,
  X,
  CircleDot,
  CheckSquare,
} from 'lucide-react'
import { useContent } from '@/context/content-context'

// Custom Coin Stack Icon
export function CoinStackIcon({
  className = 'size-6',
  fill,
}: {
  className?: string
  fill?: string
}) {
  const isFilled = fill && fill !== 'none'
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="7" ry="2.2" fill="currentColor" fillOpacity={isFilled ? 0.8 : 0.25} />
      <path d="M5 5v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V5" fill={isFilled ? 'currentColor' : 'none'} fillOpacity={isFilled ? 0.3 : 0} />
      <path d="M5 10.5v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2v-3.5" fill={isFilled ? 'currentColor' : 'none'} fillOpacity={isFilled ? 0.3 : 0} />
      <path d="M5 16v3.5c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V16" fill={isFilled ? 'currentColor' : 'none'} fillOpacity={isFilled ? 0.3 : 0} />
    </svg>
  )
}

// Master Icon Registry
export const ICON_REGISTRY: Record<string, React.ComponentType<{ className?: string; fill?: string; stroke?: string }>> = {
  // Coin Stack
  CoinStack: CoinStackIcon,

  // Charity & Love
  Heart,
  HeartHandshake,
  HandHeart,
  PawPrint,
  Gift,
  Smile,
  LifeBuoy,
  Home,
  ThumbsUp,

  // Finance & Crypto
  Coins,
  DollarSign,
  Wallet,
  TrendingUp,
  PiggyBank,
  BadgeDollarSign,
  CircleDollarSign,
  ArrowUpRight,
  Gem,

  // Trust & Security
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  Check,
  CheckCircle2,
  Award,
  Medal,
  Trophy,
  Crown,
  Star,

  // Growth & Roadmap
  Rocket,
  Flag,
  Target,
  Flame,
  Zap,
  Sparkles,
  Compass,
  Milestone,
  Route,
  Activity,
  Clock,

  // Community & Social
  Users,
  UserCheck,
  Send,
  Mail,
  Megaphone,
  Globe,
  Bell,

  // Tech & Infrastructure
  Layers,
  Database,
  Cpu,
  FileText,
  Eye,
  Bookmark,
  Sun,
  Moon,
  Coffee,
}

export interface IconInfo {
  name: string
  label: string
  category: 'Charity' | 'Finance' | 'Trust' | 'Growth' | 'Community' | 'General'
}

export const ICON_LIST: IconInfo[] = [
  // CoinStack
  { name: 'CoinStack', label: 'POT Coin Stack', category: 'Finance' },

  // Charity
  { name: 'Heart', label: 'Heart', category: 'Charity' },
  { name: 'HeartHandshake', label: 'Heart Handshake', category: 'Charity' },
  { name: 'HandHeart', label: 'Hand Holding Heart', category: 'Charity' },
  { name: 'PawPrint', label: 'Paw Print', category: 'Charity' },
  { name: 'Gift', label: 'Gift', category: 'Charity' },
  { name: 'Smile', label: 'Smile', category: 'Charity' },
  { name: 'LifeBuoy', label: 'Life Buoy', category: 'Charity' },
  { name: 'Home', label: 'Home Shelter', category: 'Charity' },
  { name: 'ThumbsUp', label: 'Thumbs Up', category: 'Charity' },

  // Finance
  { name: 'Coins', label: 'Gold Coins', category: 'Finance' },
  { name: 'Wallet', label: 'Crypto Wallet', category: 'Finance' },
  { name: 'TrendingUp', label: 'Bullish Chart', category: 'Finance' },
  { name: 'DollarSign', label: 'Dollar Currency', category: 'Finance' },
  { name: 'PiggyBank', label: 'Savings Piggy', category: 'Finance' },
  { name: 'BadgeDollarSign', label: 'Badge Dollar', category: 'Finance' },
  { name: 'CircleDollarSign', label: 'Coin Token', category: 'Finance' },
  { name: 'ArrowUpRight', label: 'Market Pump', category: 'Finance' },
  { name: 'Gem', label: 'Gem Diamond', category: 'Finance' },

  // Trust & Security
  { name: 'ShieldCheck', label: 'Shield Verified', category: 'Trust' },
  { name: 'Shield', label: 'Security Shield', category: 'Trust' },
  { name: 'ShieldAlert', label: 'Shield Alert', category: 'Trust' },
  { name: 'Lock', label: 'Locked Liquidity', category: 'Trust' },
  { name: 'Unlock', label: 'Unlocked', category: 'Trust' },
  { name: 'Key', label: 'Secret Key', category: 'Trust' },
  { name: 'CheckCircle2', label: 'Audited Check', category: 'Trust' },
  { name: 'Award', label: 'Award Ribbon', category: 'Trust' },
  { name: 'Medal', label: 'Honor Medal', category: 'Trust' },
  { name: 'Trophy', label: 'Winner Trophy', category: 'Trust' },
  { name: 'Crown', label: 'King Crown', category: 'Trust' },
  { name: 'Star', label: 'Five Star', category: 'Trust' },

  // Growth & Roadmap
  { name: 'Rocket', label: 'Moon Rocket', category: 'Growth' },
  { name: 'Target', label: 'Bullseye Target', category: 'Growth' },
  { name: 'Flag', label: 'Milestone Flag', category: 'Growth' },
  { name: 'Flame', label: 'Burn Flame', category: 'Growth' },
  { name: 'Zap', label: 'Lightning Zap', category: 'Growth' },
  { name: 'Sparkles', label: 'Magic Sparkles', category: 'Growth' },
  { name: 'Compass', label: 'Compass Roadmap', category: 'Growth' },
  { name: 'Milestone', label: 'Milestone Post', category: 'Growth' },
  { name: 'Route', label: 'Journey Route', category: 'Growth' },
  { name: 'Activity', label: 'Heartbeat Activity', category: 'Growth' },
  { name: 'Clock', label: 'Launch Timer', category: 'Growth' },

  // Community
  { name: 'Users', label: 'Community Group', category: 'Community' },
  { name: 'UserCheck', label: 'Verified Member', category: 'Community' },
  { name: 'Send', label: 'Telegram Send', category: 'Community' },
  { name: 'Mail', label: 'Direct Mail', category: 'Community' },
  { name: 'Megaphone', label: 'Marketing Loudspeaker', category: 'Community' },
  { name: 'Globe', label: 'Worldwide Web', category: 'Community' },
  { name: 'Bell', label: 'Alert Bell', category: 'Community' },

  // Tech / General
  { name: 'Layers', label: 'Blockchain Layers', category: 'General' },
  { name: 'Database', label: 'Ledger Storage', category: 'General' },
  { name: 'Cpu', label: 'Solana Processor', category: 'General' },
  { name: 'FileText', label: 'Whitepaper Doc', category: 'General' },
  { name: 'Eye', label: 'Transparency View', category: 'General' },
  { name: 'Sun', label: 'Bright Sun', category: 'General' },
  { name: 'Moon', label: 'Night Moon', category: 'General' },
]

/**
 * Dynamic Icon renderer by string name with outline or filled support
 */
export function DynamicIcon({
  name,
  filled = false,
  className = 'size-6',
}: {
  name: string
  filled?: boolean
  className?: string
}) {
  const IconComponent = ICON_REGISTRY[name] || Heart
  return (
    <IconComponent
      className={className}
      fill={filled ? 'currentColor' : 'none'}
    />
  )
}

interface EditableIconProps {
  name?: string
  namePath: string
  defaultIcon?: string
  filled?: boolean
  fillPath: string
  defaultFilled?: boolean
  className?: string
  wrapperClassName?: string
}

/**
 * Visual Editable Icon Component.
 * In Edit Mode (inside /admin), clicking this icon opens a full-featured Icon Picker Modal
 * via React Portal with search, categories, and Outline vs Filled toggles!
 */
export function EditableIcon({
  name,
  namePath,
  defaultIcon = 'Heart',
  filled,
  fillPath,
  defaultFilled = false,
  className = 'size-6',
  wrapperClassName = '',
}: EditableIconProps) {
  const { isVisualEditMode, updateFieldByPath } = useContent()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Determine active icon and filled status with fallback
  const activeIconName = name || defaultIcon
  const activeFilled = filled !== undefined ? filled : defaultFilled

  // Local draft state inside modal
  const [selectedName, setSelectedName] = useState(activeIconName)
  const [selectedFilled, setSelectedFilled] = useState(activeFilled)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setSelectedName(activeIconName)
    setSelectedFilled(activeFilled)
  }, [activeIconName, activeFilled])

  // Handle escape key
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

  // Filtered icons
  const filteredIcons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return ICON_LIST.filter((icon) => {
      const matchQuery =
        !q ||
        icon.name.toLowerCase().includes(q) ||
        icon.label.toLowerCase().includes(q) ||
        icon.category.toLowerCase().includes(q)
      const matchCat = activeCategory === 'All' || icon.category === activeCategory
      return matchQuery && matchCat
    })
  }, [searchQuery, activeCategory])

  if (!isVisualEditMode) {
    return <DynamicIcon name={activeIconName} filled={activeFilled} className={className} />
  }

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateFieldByPath(namePath, selectedName)
    updateFieldByPath(fillPath, selectedFilled)
    setIsModalOpen(false)
  }

  const modalContent = isModalOpen && mounted ? (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation()
        setIsModalOpen(false)
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-purple-400/50 bg-[#16062c] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(168,85,247,0.35)] text-white text-left overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6 shrink-0 bg-[#180731]">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-2xl bg-gradient-to-br from-[#c084fc] to-[#7c2ae8] grid place-items-center text-white shadow-md">
              <DynamicIcon name={selectedName} filled={selectedFilled} className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Choose Icon &amp; Style
              </h3>
              <p className="text-xs text-purple-200/70">
                Selected: <strong className="text-white">{selectedName}</strong> ({selectedFilled ? 'Filled' : 'Outline'})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="grid size-9 place-items-center rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Controls: Search, Style Switcher & Categories */}
        <div className="p-4 sm:p-5 border-b border-white/10 space-y-3 shrink-0 bg-[#140527]">
          {/* Row 1: Search & Outline/Fill Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 focus-within:border-[#c084fc] shadow-inner">
              <Search size={15} className="text-purple-300 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons (e.g. heart, rocket, shield, coins)..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-white/50 hover:text-white p-0.5">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Outline vs Filled Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/15 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedFilled(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  !selectedFilled
                    ? 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] text-white shadow-md'
                    : 'text-purple-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <CircleDot size={13} />
                <span>Outline</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilled(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedFilled
                    ? 'bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] text-white shadow-md'
                    : 'text-purple-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <CheckSquare size={13} />
                <span>Filled</span>
              </button>
            </div>
          </div>

          {/* Row 2: Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {['All', 'Charity', 'Finance', 'Trust', 'Growth', 'Community', 'General'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-purple-600/50 border border-purple-400 text-white'
                    : 'bg-white/5 border border-white/10 text-purple-200/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Scrollable Icon Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0f0322]">
          {filteredIcons.length === 0 ? (
            <div className="py-12 text-center text-purple-300/60 text-xs sm:text-sm">
              No icons found matching "{searchQuery}". Try another keyword!
            </div>
          ) : (
            <div className="grid grid-cols-3 min-[440px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3">
              {filteredIcons.map((item) => {
                const isSelected = selectedName === item.name
                const Comp = ICON_REGISTRY[item.name] || Heart
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedName(item.name)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition group active:scale-95 ${
                      isSelected
                        ? 'border-[#c084fc] bg-gradient-to-b from-purple-600/35 to-purple-800/30 text-white shadow-[0_0_20px_rgba(192,132,252,0.4)] ring-2 ring-[#c084fc]/50'
                        : 'border-white/10 bg-white/[0.03] text-purple-200/80 hover:border-purple-400/60 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="size-8 flex items-center justify-center mb-1.5">
                      <Comp
                        className={`size-6 transition-transform group-hover:scale-110 ${
                          isSelected ? 'text-white' : 'text-purple-300 group-hover:text-white'
                        }`}
                        fill={selectedFilled ? 'currentColor' : 'none'}
                      />
                    </div>
                    <span className="block w-full truncate text-[10px] sm:text-[11px] font-semibold">
                      {item.label}
                    </span>

                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-emerald-400 text-black grid place-items-center text-[9px] font-black shadow-md">
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between border-t border-white/10 p-4 sm:p-5 shrink-0 bg-[#140528]">
          <div className="flex items-center gap-2 text-xs text-purple-300/70">
            <span>Preview:</span>
            <div className="size-7 rounded-lg bg-white/10 grid place-items-center text-white">
              <DynamicIcon name={selectedName} filled={selectedFilled} className="size-4" />
            </div>
            <span className="font-bold text-white">{selectedName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl px-4 py-2 text-xs font-bold text-white/70 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9c3eff] to-[#cb7dff] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.02] active:scale-95"
            >
              <Check size={14} />
              <span>Apply Icon</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  ) : null

  return (
    <div className={`relative inline-flex items-center justify-center ${wrapperClassName}`}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsModalOpen(true)
        }}
        title="Click to change icon &amp; style (Outline / Fill)"
        className="group relative cursor-pointer outline-dashed outline-2 outline-amber-400/80 hover:outline-amber-400 hover:bg-amber-500/15 rounded-xl transition-all p-1 -m-1"
      >
        <DynamicIcon name={activeIconName} filled={activeFilled} className={className} />
        
        {/* Floating Mini Pen Indicator */}
        <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-amber-400 text-black grid place-items-center text-[9px] font-black shadow-md transition-transform group-hover:scale-125">
          <Edit3 size={9} />
        </span>
      </button>

      {/* Render modal directly in document.body via Portal */}
      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </div>
  )
}

