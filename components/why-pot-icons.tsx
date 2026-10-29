import React from 'react'

/**
 * Custom SVG Paw Print Icon
 * Perfectly balanced canine/feline paw print with 4 toe pads and a tri-lobed palm pad.
 */
export function CustomPawPrint({ className = 'size-6', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Toe 1 (Far Left) */}
      <ellipse cx="4.8" cy="8.6" rx="2.2" ry="3.1" transform="rotate(-24 4.8 8.6)" />
      {/* Toe 2 (Center Left) */}
      <ellipse cx="9.2" cy="5.2" rx="2.3" ry="3.3" transform="rotate(-8 9.2 5.2)" />
      {/* Toe 3 (Center Right) */}
      <ellipse cx="14.8" cy="5.2" rx="2.3" ry="3.3" transform="rotate(8 14.8 5.2)" />
      {/* Toe 4 (Far Right) */}
      <ellipse cx="19.2" cy="8.6" rx="2.2" ry="3.1" transform="rotate(24 19.2 8.6)" />
      {/* Main Palm Pad */}
      <path d="M7.4 12.8C5.2 14.4 4.8 17.5 6.6 19.4C8.2 21.1 11.2 21.5 12 21.5C12.8 21.5 15.8 21.1 17.4 19.4C19.2 17.5 18.8 14.4 16.6 12.8C14.8 11.5 13.2 12.6 12 12.8C10.8 12.6 9.2 11.5 7.4 12.8Z" />
    </svg>
  )
}

/**
 * Custom SVG Stacked Coins Icon (Financial SOL Reflection Utility)
 */
export function StackedCoinsIcon({ className = 'size-6', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top coin */}
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor" fillOpacity="0.25" />
      {/* Middle coin */}
      <path d="M4 10.5C4 12.16 7.58 13.5 12 13.5C16.42 13.5 20 12.16 20 10.5" />
      <path d="M4 6V10.5" />
      <path d="M20 6V10.5" />
      {/* Bottom coin */}
      <path d="M4 15C4 16.66 7.58 18 12 18C16.42 18 20 16.66 20 15" />
      <path d="M4 10.5V15" />
      <path d="M20 10.5V15" />
    </svg>
  )
}

/**
 * Custom SVG Leaf Icon (Organic Growth)
 */
export function OrganicLeafIcon({ className = 'size-6', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.5 3.5C14.5 3 7.5 6.5 4.5 12.5C3.5 14.5 3.5 17 4.5 18.5C5.5 20 8 20.5 10.5 19.5C16.5 16.5 20 9.5 20.5 3.5Z" />
      <path
        d="M5 19L12.5 11.5"
        stroke="rgba(60, 15, 100, 0.85)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * 3D Sculpted Purple Paw Print Background Watermark
 * Features realistic 3D lighting, bevel highlights, specular reflections, and ambient shadows.
 */
export function PawPrint3DWatermark({ className = 'w-96 h-96' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Soft shadow filter */}
        <filter id="paw-shadow" x="-20%" y="-20%" width="150%" height="150%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="12" dy="18" stdDeviation="16" floodColor="#080114" floodOpacity="0.75" />
          <feDropShadow dx="-4" dy="-4" stdDeviation="8" floodColor="#c084fc" floodOpacity="0.12" />
        </filter>

        {/* 3D Gradient for Toe Pads */}
        <radialGradient id="toe-gradient-1" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8d3fe6" />
          <stop offset="35%" stopColor="#6720bf" />
          <stop offset="70%" stopColor="#431085" />
          <stop offset="100%" stopColor="#250550" />
        </radialGradient>

        <radialGradient id="toe-gradient-2" cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#9b4ef0" />
          <stop offset="35%" stopColor="#7125cf" />
          <stop offset="75%" stopColor="#46108b" />
          <stop offset="100%" stopColor="#24054e" />
        </radialGradient>

        {/* 3D Gradient for Main Palm Pad */}
        <radialGradient id="palm-gradient" cx="42%" cy="35%" r="68%">
          <stop offset="0%" stopColor="#9847ee" />
          <stop offset="30%" stopColor="#6e22c8" />
          <stop offset="65%" stopColor="#461285" />
          <stop offset="100%" stopColor="#22054a" />
        </radialGradient>

        {/* Rim Light Linear Gradients */}
        <linearGradient id="rim-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#a855f7" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter="url(#paw-shadow)">
        {/* Outer ambient glow silhouette */}
        <g opacity="0.35" filter="blur(14px)">
          <ellipse cx="95" cy="140" rx="34" ry="48" transform="rotate(-26 95 140)" fill="#7e22ce" />
          <ellipse cx="165" cy="85" rx="36" ry="52" transform="rotate(-8 165 85)" fill="#7e22ce" />
          <ellipse cx="250" cy="88" rx="36" ry="52" transform="rotate(10 250 88)" fill="#7e22ce" />
          <ellipse cx="320" cy="148" rx="34" ry="48" transform="rotate(28 320 148)" fill="#7e22ce" />
          <path
            d="M125 210 C85 240 75 295 110 335 C140 370 200 375 215 375 C230 375 285 370 315 335 C350 295 340 240 300 210 C265 185 235 205 215 208 C195 205 160 185 125 210 Z"
            fill="#7e22ce"
          />
        </g>

        {/* Toe 1 (Far Left) */}
        <g transform="rotate(-26 95 140)">
          <ellipse cx="95" cy="140" rx="33" ry="46" fill="url(#toe-gradient-1)" stroke="url(#rim-light)" strokeWidth="1.5" />
          {/* Specular Highlight */}
          <ellipse cx="88" cy="126" rx="14" ry="22" fill="#c084fc" opacity="0.25" filter="blur(3px)" />
        </g>

        {/* Toe 2 (Middle Left) */}
        <g transform="rotate(-8 165 85)">
          <ellipse cx="165" cy="85" rx="35" ry="50" fill="url(#toe-gradient-2)" stroke="url(#rim-light)" strokeWidth="1.5" />
          {/* Specular Highlight */}
          <ellipse cx="158" cy="70" rx="16" ry="24" fill="#d8b4fe" opacity="0.3" filter="blur(3px)" />
        </g>

        {/* Toe 3 (Middle Right) */}
        <g transform="rotate(10 250 88)">
          <ellipse cx="250" cy="88" rx="35" ry="50" fill="url(#toe-gradient-2)" stroke="url(#rim-light)" strokeWidth="1.5" />
          {/* Specular Highlight */}
          <ellipse cx="242" cy="72" rx="16" ry="24" fill="#d8b4fe" opacity="0.28" filter="blur(3px)" />
        </g>

        {/* Toe 4 (Far Right) */}
        <g transform="rotate(28 320 148)">
          <ellipse cx="320" cy="148" rx="33" ry="46" fill="url(#toe-gradient-1)" stroke="url(#rim-light)" strokeWidth="1.5" />
          {/* Specular Highlight */}
          <ellipse cx="312" cy="134" rx="14" ry="22" fill="#c084fc" opacity="0.25" filter="blur(3px)" />
        </g>

        {/* Main Palm Pad */}
        <path
          d="M130 215 C95 242 85 292 118 328 C145 358 198 365 215 365 C232 365 285 358 312 328 C345 292 335 242 300 215 C268 192 238 210 215 212 C192 210 162 192 130 215 Z"
          fill="url(#palm-gradient)"
          stroke="url(#rim-light)"
          strokeWidth="2"
        />

        {/* Main Palm Pad Specular Top Highlight */}
        <path
          d="M145 230 C130 248 135 275 160 282 C185 288 208 275 215 260 C222 275 245 288 270 282 C295 275 300 248 285 230 C262 208 235 224 215 225 C195 224 168 208 145 230 Z"
          fill="#d8b4fe"
          opacity="0.18"
          filter="blur(5px)"
        />

        {/* Subtle Bottom Deep Crease */}
        <path
          d="M175 330 C195 342 235 342 255 330"
          stroke="#160233"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
          filter="blur(2px)"
        />
      </g>
    </svg>
  )
}

