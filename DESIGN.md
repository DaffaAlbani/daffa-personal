# DESIGN.md — Impeccable Design Context

## Schema & Version
- **Schema Version**: 1.1.0
- **Framework**: Impeccable AI Design System
- **Style Variant**: Minimalist Ultra-Clean Slate
- **Last Updated**: 2026-08-12

## Design Philosophy & Anti-Pattern Defense
- **Philosophy**: Minimalist Ultra-Clean Slate. Focus on high-legibility typography, spacious layout margins, refined monochrome slate tones with subtle gradient text highlights, and smooth glassmorphism.
- **Anti-Patterns Prohibited (No AI Slop)**:
  - ❌ Loud, uncoordinated rainbow gradients without visual purpose.
  - ❌ Cramped padding, heavy black shadows, or thick visible card borders.
  - ❌ Low-contrast text on dark backgrounds (failing WCAG AA).
  - ❌ Unresponsive or jarring hover jump effects.
  - ❌ Hardcoded pixel magic numbers for layout offsets.

## Typography System
- **Heading Font**: `'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif` (Crisp, premium geometric editorial sans)
- **Body Font**: `'DM Sans', 'Inter', system-ui, sans-serif` (Highly legible, modern workhorse)
- **Scale**:
  - **Hero Display**: `clamp(2.75rem, 6vw + 1rem, 4.5rem)` / Weight: `800` / Tracking: `-0.035em`
  - **Section Heading (H2)**: `clamp(1.85rem, 3.2vw + 0.5rem, 2.65rem)` / Weight: `750` / Tracking: `-0.025em`
  - **Card Title (H3)**: `1.2rem` (19.2px) / Weight: `650`
  - **Body Text**: `1rem` (16px) / Line Height: `1.7` / Weight: `400`
  - **Subtext & Badges**: `0.85rem` (13.6px) / Weight: `600` / Tracking: `0.04em`

## Color Tokens & Palette (Minimalist Slate)
### Dark Theme (Default)
- **Main Background**: `#0b0f17` (Deep Obsidian Slate)
- **Surface Elevation**: `#111726` (Slate Navy)
- **Card Background**: `rgba(17, 23, 38, 0.65)` (Refined Glass Slate)
- **Card Hover Background**: `rgba(24, 32, 52, 0.85)`
- **Border Default**: `rgba(255, 255, 255, 0.08)` (Hairline Glass Border)
- **Border Active/Hover**: `rgba(129, 140, 248, 0.45)`
- **Text Main**: `#F8FAFC` (Slate 50 - Crisp White)
- **Text Muted**: `#94A3B8` (Slate 400 - Refined Silver)
- **Text Dim**: `#64748B` (Slate 500 - Subtext)

### Light Theme
- **Main Background**: `#F8FAFC` (Slate 50)
- **Surface Elevation**: `#F1F5F9` (Slate 100)
- **Card Background**: `rgba(255, 255, 255, 0.85)`
- **Card Hover Background**: `rgba(255, 255, 255, 0.98)`
- **Border Default**: `rgba(0, 0, 0, 0.08)`
- **Text Main**: `#0F172A` (Slate 900)
- **Text Muted**: `#475569` (Slate 600)
- **Text Dim**: `#64748B` (Slate 500)

### Refined Accents & Gradients
- **Slate Silver Gradient**: `linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #94A3B8 100%)`
- **Indigo Accent**: `#818CF8` (Backend & Systems)
- **Cyan Accent**: `#38BDF8` (IoT & Energy)
- **Emerald Accent**: `#34D399` (Availability Badge)
- **Purple Accent**: `#C084FC` (Architecture)

## Spacing & Elevation System
- **Section Padding**: `6.5rem 0` (Spacious editorial spacing)
- **Radii Tokens**:
  - `--radius-xs`: `6px`
  - `--radius-sm`: `10px`
  - `--radius-md`: `16px`
  - `--radius-lg`: `24px`
  - `--radius-xl`: `32px`
  - `--radius-full`: `9999px`
- **Glassmorphism Spec**: `backdrop-filter: blur(24px) saturate(180%)`
- **Shadow Tokens**:
  - `--shadow-card`: `0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`
  - `--shadow-glow`: `0 0 35px rgba(129,140,248,0.18)`

## Motion & Interaction Rules
- **Scroll Reveal**: Native CSS `animation-timeline: view()` supported with Fallback IntersectionObserver `.reveal-on-scroll` class.
- **Transitions**: `--transition-fast` (0.15s), `--transition-normal` (0.3s), `--transition-spring` (`cubic-bezier(0.16, 1, 0.3, 1)`).
