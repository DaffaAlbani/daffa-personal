# DESIGN.md — Impeccable Design Context

## Schema & Version
- **Schema Version**: 1.0.0
- **Framework**: Impeccable AI Design System
- **Last Updated**: 2026-08-10

## Design Philosophy & Anti-Pattern Defense
- **Philosophy**: Cybernetic Precision & Glassmorphic Depth. Every element must communicate intent, technical sophistication, and high performance.
- **Anti-Patterns Prohibited (No AI Slop)**:
  - ❌ Standard generic blue/purple linear gradients without spatial context or depth.
  - ❌ Over-nested generic cards with flat grey borders or harsh unblended dropshadows.
  - ❌ Browser default fonts or unproportional typography hierarchy.
  - ❌ Static, lifeless layouts without micro-interactions or hover motion triggers.
  - ❌ Hardcoded magic numbers for positioning and layout offsets.

## Typography System
- **Heading Font**: `'Outfit', system-ui, -apple-system, sans-serif` (High legibility, futuristic geometric sans)
- **Body Font**: `'DM Sans', system-ui, -apple-system, sans-serif` (Clean, highly readable workhorse)
- **Scale**:
  - **Hero Display**: `clamp(2.5rem, 5vw + 1rem, 4.25rem)` / Weight: `800` / Tracking: `-0.02em`
  - **Section Heading (H2)**: `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` / Weight: `700` / Tracking: `-0.01em`
  - **Card Title (H3)**: `1.25rem` (20px) / Weight: `600`
  - **Body Text**: `1rem` (16px) / Line Height: `1.65` / Weight: `400`
  - **Subtext & Badges**: `0.875rem` (14px) or `0.75rem` (12px) / Weight: `500` / Uppercase tracking: `0.05em`

## Color Tokens & Palette
### Dark Theme (Default)
- **Main Background**: `#060a12` (Deep Space Navy)
- **Surface Elevation**: `#0b1120` (Midnight Slate)
- **Card Background**: `rgba(13, 20, 38, 0.72)` (Translucent Glass Slate)
- **Card Hover Background**: `rgba(22, 34, 60, 0.90)`
- **Border Default**: `rgba(255, 255, 255, 0.07)`
- **Border Active/Hover**: `rgba(99, 102, 241, 0.5)`
- **Border Glow**: `rgba(56, 189, 248, 0.4)`
- **Text Main**: `#F1F5FE`
- **Text Muted**: `#8B95B0`
- **Text Dim**: `#55627A`

### Light Theme
- **Main Background**: `#F8FAFF`
- **Surface Elevation**: `#EEF2FB`
- **Card Background**: `rgba(255, 255, 255, 0.88)`
- **Card Hover Background**: `rgba(255, 255, 255, 0.98)`
- **Border Default**: `rgba(0, 0, 0, 0.07)`
- **Text Main**: `#0F172A`
- **Text Muted**: `#4B5680`

### Brand Accents
- **Cyan Accent**: `#38BDF8` (IoT / Hardware / Energy)
- **Indigo Accent**: `#818CF8` (Backend / System Logic)
- **Purple Accent**: `#C084FC` (Architecture / Innovation)
- **Emerald Accent**: `#34D399` (Success / Availability Status)
- **Rose Accent**: `#FB7185` (Security / picoCTF)
- **Amber Accent**: `#FBBF24` (Certificates & Awards)

## Spacing & Elevation System
- **Radii Tokens**:
  - `--radius-xs`: `6px`
  - `--radius-sm`: `10px`
  - `--radius-md`: `16px`
  - `--radius-lg`: `24px`
  - `--radius-xl`: `32px`
  - `--radius-full`: `9999px`
- **Glassmorphism Spec**: `backdrop-filter: blur(16px) saturate(180%)`
- **Shadow Tokens**:
  - `--shadow-card`: `0 20px 50px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)`
  - `--shadow-glow`: `0 0 40px rgba(56,189,248,0.28)`
  - `--shadow-glow-lg`: `0 0 80px rgba(129,140,248,0.35)`

## Motion & Interaction Rules
- **Scroll Reveal**: Native CSS `animation-timeline: view()` supported with Fallback IntersectionObserver `.reveal-on-scroll` class.
- **Particle Canvas**: HTML5 Canvas backdrop featuring distance-based constellation connections reacting to pointer position.
- **Transitions**: `--transition-fast` (0.18s), `--transition-normal` (0.32s), `--transition-spring` (`cubic-bezier(0.16, 1, 0.3, 1)`).
