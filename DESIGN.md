# DESIGN.md — Impeccable Design Context

## Schema & Version
- **Schema Version**: 3.0.0
- **Framework**: Impeccable AI Design System
- **Style Variant**: Minimalist Craft & Editorial Slate (Linear / Vercel Aesthetic)
- **Last Updated**: 2026-08-17

## Design Philosophy & Anti-AI Slop Defense
- **Philosophy**: Minimalist Craft & Editorial Slate. Prioritizes authentic engineering substance over decorative gimmicks. Uses solid matte dark surfaces, precision grotesque typography, subtle hairline borders, and understated micro-interactions.
- **Strict Anti-AI Slop Prohibitions**:
  - ❌ **NO** spinning conic rainbow gradient halos or pulsating neon rings.
  - ❌ **NO** fake JSON terminal gimmick cards (`engineer_spec.json`).
  - ❌ **NO** rainbow animated text gradient shimmers.
  - ❌ **NO** noisy particle canvas constellations running in the background.
  - ❌ **NO** oversaturated cyan/purple glows or excessive sparkle icons.

## Typography System
- **Heading Font**: `'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif` (Precision geometric grotesque)
- **Body Font**: `'Inter', 'DM Sans', system-ui, -apple-system, sans-serif` (Clean, highly legible)
- **Code Font**: `'JetBrains Mono', ui-monospace, monospace` (For technical badges and tags)
- **Scale & Rhythm**:
  - **Display (Hero H1)**: `clamp(2.5rem, 5.5vw, 4rem)` / Weight: `800` / Tracking: `-0.035em` / Solid High Contrast
  - **Section Title (H2)**: `clamp(1.75rem, 3.2vw, 2.5rem)` / Weight: `750` / Tracking: `-0.025em`
  - **Card Title (H3)**: `1.15rem` (18.4px) / Weight: `700` / Tracking: `-0.01em`
  - **Body Text**: `0.95rem` (15.2px) / Line Height: `1.7` / Weight: `400` / Color: `#A1A1AA`
  - **Meta / Overline**: `0.72rem` (11.5px) / Weight: `700` / Tracking: `0.06em` / Uppercase

## Color Tokens & Palette
### Dark Theme (Matte Obsidian & Zinc — Default)
- **Main Background**: `#09090b` (Zinc 950 - Deep matte dark)
- **Surface Elevation**: `#121216` (Zinc 900)
- **Card Background**: `#141418` (Solid matte card with subtle depth)
- **Card Hover Background**: `#191920`
- **Border Default**: `rgba(255, 255, 255, 0.08)` (Clean neutral hairline border)
- **Border Hover**: `rgba(255, 255, 255, 0.20)`
- **Text Main**: `#FAFAFA` (Zinc 50 - Crisp solid white)
- **Text Muted**: `#A1A1AA` (Zinc 400 - Silver neutral)
- **Text Dim**: `#71717A` (Zinc 500 - Subtext)
- **Subtle Accent**: `#3B82F6` (Linear Blue - Used sparingly for active states)
- **Success Accent**: `#10B981` (Emerald - Status & availability)

### Light Theme (Crisp Clean-Slate)
- **Main Background**: `#FFFFFF`
- **Surface Elevation**: `#F4F4F5` (Zinc 100)
- **Card Background**: `#FFFFFF`
- **Card Hover Background**: `#FAFAFA`
- **Border Default**: `rgba(0, 0, 0, 0.08)`
- **Border Hover**: `rgba(0, 0, 0, 0.18)`
- **Text Main**: `#09090B` (Zinc 950)
- **Text Muted**: `#52525B` (Zinc 600)
- **Text Dim**: `#71717A` (Zinc 500)

## Elevation & Component Tokens
- **Card Inset Highlight**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06)`
- **Radii Tokens**:
  - `--radius-xs`: `6px`
  - `--radius-sm`: `10px`
  - `--radius-md`: `14px`
  - `--radius-lg`: `20px`
  - `--radius-full`: `9999px`
- **Transitions**: `--transition-fast: 0.15s ease`, `--transition-normal: 0.25s cubic-bezier(0.16, 1, 0.3, 1)`
