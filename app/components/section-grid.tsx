import { useEffect, useRef, useState } from "react"

type Item = { label: string }

export default function SectionGrid({ items, largeFirst = false, carousel = false, featuredIndices, cols }: { items: Item[]; largeFirst?: boolean; carousel?: boolean; featuredIndices?: number[]; cols?: number }) {
  if (!items?.length) return null

  // Variant A: horizontal carousel of rectangles
  if (carousel) {
    // Create duplicated items array for infinite scrolling (3 sets: [original, original, original])
    const duplicatedItems = [...items, ...items, ...items]
    
    const containerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const isAdjustingRef = useRef(false)
    const [isInitialized, setIsInitialized] = useState(false)

    // Initialize scroll position to middle set
    useEffect(() => {
      const container = containerRef.current
      const inner = innerRef.current
      if (!container || !inner || isInitialized) return

      // Wait for layout to be ready
      const initScroll = () => {
        if (!container || !inner) return
        
        // Calculate the width of one set of items
        const firstItem = inner.children[1] as HTMLElement // Skip the first padding div
        if (!firstItem) return
        
        const itemWidth = firstItem.offsetWidth
        const gap = 20 // gap-5 = 1.25rem = 20px
        const itemWidthWithGap = itemWidth + gap
        const oneSetWidth = items.length * itemWidthWithGap
        
        // Scroll to start of middle set (second set)
        container.scrollLeft = oneSetWidth
        setIsInitialized(true)
      }

      // Use requestAnimationFrame to ensure layout is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(initScroll)
      })
    }, [items.length, isInitialized])

    // Handle infinite scroll
    useEffect(() => {
      const container = containerRef.current
      const inner = innerRef.current
      if (!container || !inner) return

      const handleScroll = () => {
        if (isAdjustingRef.current) return

        const scrollLeft = container.scrollLeft
        
        // Calculate the width of one set of items
        const firstItem = inner.children[1] as HTMLElement // Skip the first padding div
        if (!firstItem) return
        
        const itemWidth = firstItem.offsetWidth
        const gap = 20
        const itemWidthWithGap = itemWidth + gap
        const oneSetWidth = items.length * itemWidthWithGap
        
        // Calculate boundaries
        const middleSetStart = oneSetWidth
        const middleSetEnd = oneSetWidth * 2
        const threshold = itemWidthWithGap * 0.5 // Threshold for edge detection

        // If scrolled near the start of middle set, jump to corresponding position in first set
        if (scrollLeft < middleSetStart - threshold) {
          isAdjustingRef.current = true
          const targetScroll = scrollLeft + oneSetWidth
          requestAnimationFrame(() => {
            if (container) {
              container.scrollLeft = targetScroll
              // Reset flag after a brief delay to allow scroll to settle
              setTimeout(() => {
                isAdjustingRef.current = false
              }, 50)
            }
          })
          return
        }
        // If scrolled near the end of middle set, jump to corresponding position in third set
        else if (scrollLeft > middleSetEnd - threshold) {
          isAdjustingRef.current = true
          const targetScroll = scrollLeft - oneSetWidth
          requestAnimationFrame(() => {
            if (container) {
              container.scrollLeft = targetScroll
              // Reset flag after a brief delay to allow scroll to settle
              setTimeout(() => {
                isAdjustingRef.current = false
              }, 50)
            }
          })
          return
        }
      }

      container.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }, [items.length])

    return (
      <div ref={containerRef} className="text-white -mx-4 px-4 pb-4 overflow-x-auto overflow-y-visible scrollbar-none">
        <div ref={innerRef} className="flex gap-5 snap-x snap-mandatory">
          <div className="shrink-0 w-3" aria-hidden></div>
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="snap-center shrink-0" style={{ width: 140 }}>
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
