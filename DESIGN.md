# DESIGN.md — Impeccable Design Context

## Schema & Version
- **Schema Version**: 2.0.0
- **Framework**: Impeccable AI Design System
- **Style Variant**: Bold Neo-Modern & Bento-Grid
- **Last Updated**: 2026-08-17

## Design Philosophy & Aesthetic Pillars
- **Aesthetic Direction**: **Bold Neo-Modern & Bento-Grid**. Combines modular asymmetric bento grid architecture with punchy high-contrast typography, refined dark obsidian slate backgrounds, tactile interactive surfaces, vibrant glowing accents (`cyan`, `indigo`, `purple`, `emerald`), and micro-interactions.
- **Key Visual Pillars**:
  1. **Bento Grid Modularity**: High visual hierarchy, varied card spans (featured 2-col spans, mini stat tiles, interactive code/terminal cards), clean 16px–24px gaps, and consistent corner radii.
  2. **Punchy Geometric Typography**: Ultra-bold display headings (`Outfit` / `Plus Jakarta Sans`), crisp monospace micro-labels with uppercase tracking, and clean body copy (`DM Sans` / `Inter`).
  3. **Tactile Surfaces & Glassmorphic Depth**: Subtle hairline borders (`1px solid rgba(56, 189, 248, 0.14)` in dark mode), multi-layer box shadows, backdrop-filter blur, and smooth spring hover lifts (`translateY(-4px)`).
  4. **Anti-AI Slop Defense**:
     - ❌ No generic flat boxes with low contrast or clunky default borders.
     - ❌ No chaotic uncoordinated rainbow gradients; use curated cyan/indigo/purple brand glow.
     - ❌ No sluggish transitions or unstyled native form elements.

## Typography System
- **Heading Font**: `'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` (Bold geometric sans)
- **Body Font**: `'DM Sans', 'Inter', system-ui, -apple-system, sans-serif` (Modern legible sans)
- **Code / Monospace Font**: `'JetBrains Mono', 'Fira Code', ui-monospace, monospace` (Terminal & stack tags)
- **Scale**:
  - **Hero Display**: `clamp(2.75rem, 6vw + 1rem, 4.4rem)` / Weight: `900` / Tracking: `-0.04em`
  - **Section Title (H2)**: `clamp(1.9rem, 3.5vw + 0.5rem, 2.75rem)` / Weight: `850` / Tracking: `-0.03em`
  - **Card Title (H3)**: `1.25rem` (20px) / Weight: `750` / Tracking: `-0.015em`
  - **Body Text**: `1rem` (16px) / Line Height: `1.75` / Weight: `400`
  - **Micro Badges / Overlines**: `0.72rem` (11.5px) / Weight: `800` / Tracking: `0.08em` / Uppercase

## Color Tokens & Palette
### Dark Theme (Obsidian Cyber-Slate)
- **Background Main**: `#030712` (Ultra-deep obsidian black)
- **Background Surface**: `#0b132b` (Deep slate navy)
- **Bento Card Background**: `rgba(11, 19, 43, 0.72)` (Tactile glass surface)
- **Bento Card Hover**: `rgba(15, 26, 56, 0.92)`
- **Border Default**: `rgba(56, 189, 248, 0.14)`
- **Border Hover**: `rgba(56, 189, 248, 0.55)`
- **Text Main**: `#F8FAFC` (Crisp white)
- **Text Muted**: `#94A3B8` (Silver slate)
- **Text Dim**: `#64748B` (Muted subtext)

### Light Theme (Crisp Clean-Slate)
- **Background Main**: `#F8FAFC` (Slate 50)
- **Background Surface**: `#F1F5F9` (Slate 100)
- **Bento Card Background**: `rgba(255, 255, 255, 0.88)`
- **Bento Card Hover**: `rgba(255, 255, 255, 0.98)`
- **Border Default**: `rgba(15, 23, 42, 0.08)`
- **Border Hover**: `rgba(99, 102, 241, 0.45)`
- **Text Main**: `#0F172A` (Slate 900)
- **Text Muted**: `#475569` (Slate 600)
- **Text Dim**: `#64748B` (Slate 500)

### Vibrant Accents & Gradients
- **Accent Cyan**: `#06B6D4` (Systems & IoT)
- **Accent Indigo**: `#6366F1` (Backend Architecture & APIs)
- **Accent Purple**: `#A855F7` (Full-Stack & Cloud)
- **Accent Emerald**: `#10B981` (Online Availability & Verified Credentials)
- **Accent Amber**: `#F59E0B` (Certifications & Badges)
- **Brand Gradient**: `linear-gradient(135deg, #06B6D4 0%, #6366F1 50%, #A855F7 100%)`
- **Card Gradient Overlay**: `linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)`

## Bento Grid & Layout Rules
- **Container Max-Width**: `1180px`
- **Section Spacing**: `6rem 0` desktop, `4rem 0` mobile
- **Bento Card Radii**: `--radius-md: 18px`, `--radius-lg: 24px`, `--radius-full: 9999px`
- **Transitions**: `--transition-spring: 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
