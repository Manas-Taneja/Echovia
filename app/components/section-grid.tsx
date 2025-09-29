"use client"

import { useEffect, useRef } from "react"

type Item = { label: string }

export default function SectionGrid({ items, largeFirst = false, carousel = false, featuredIndices, cols }: { items: Item[]; largeFirst?: boolean; carousel?: boolean; featuredIndices?: number[]; cols?: number }) {
  if (!items?.length) return null

  // Variant A: horizontal carousel of rectangles
  if (carousel) {
    // Center the middle item initially so it's obvious this is a carousel
    const containerRef = useRef<HTMLDivElement>(null)
    const middleIndex = Math.floor(items.length / 2)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
      const container = containerRef.current
      const middleEl = itemRefs.current?.[middleIndex] ?? null
      if (!container || !middleEl) return
      // Use scrollIntoView with inline:center for modern browsers
      try {
        middleEl.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" })
      } catch {
        // Fallback: compute approximate center
        const containerRect = container.getBoundingClientRect()
        const itemRect = middleEl.getBoundingClientRect()
        const offset = (itemRect.left + itemRect.width / 2) - (containerRect.left + containerRect.width / 2)
        container.scrollLeft += offset
      }
    }, [items.length, middleIndex])

    return (
      <div ref={containerRef} className="text-white -mx-4 px-4 pb-4 overflow-x-auto overflow-y-visible scrollbar-none">
        <div className="flex gap-5 snap-x snap-mandatory">
          <div className="shrink-0 w-3" aria-hidden></div>
          {items.map((item, idx) => (
            <div key={idx} ref={(el) => { itemRefs.current[idx] = el }} className="snap-center shrink-0" style={{ width: 140 }}>
              <div
                className="relative rounded-[26px] aspect-[4/3] overflow-visible"
                style={{ boxShadow: "0 6px 12px rgba(0,0,0,0.12)" }}
              >
                <div
                  className="absolute inset-0 rounded-[26px] flex items-end overflow-hidden"
                  style={{ backgroundColor: "var(--eco-green)" }}
                >
                  <span className="block px-4 pb-3 font-semibold text-white/95 select-none text-sm leading-tight break-words text-pretty w-full">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-3" aria-hidden></div>
        </div>
      </div>
    )
  }

  // Variant B: 3-up grid on mobile, with optional large first card
  // Map allowed column counts (keep classes static for Tailwind)
  const gridColsClass = cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-4" : "grid-cols-3"

  return (
    <div className={`grid ${gridColsClass} gap-5`}>
      {items.map((item, idx) => {
        const isLarge = (largeFirst && idx === 0) || (featuredIndices?.includes(idx) ?? false)
        return (
          <div key={idx} className={isLarge ? "col-span-3" : ""} style={{}}>
            <div className="relative rounded-[26px] aspect-[4/3] overflow-visible" style={{ boxShadow: "0 6px 12px rgba(0,0,0,0.12)" }}>
              <div className="absolute inset-0 rounded-[26px] flex items-end overflow-hidden" style={{ backgroundColor: "var(--eco-green)" }}>
                <span className="block px-4 pb-3 font-semibold text-white/95 select-none text-sm leading-tight break-words text-pretty w-full">
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
