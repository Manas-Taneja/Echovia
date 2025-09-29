import type React from "react"

type Props = {
  children?: React.ReactNode
  title?: string
  className?: string
  style?: React.CSSProperties
}

export default function ScanPanel({ children, title, className, style }: Props) {
  return (
    <section
      className={["relative text-white", className ?? ""].join(" ")}
      style={{ width: 343, minHeight: 180, flexShrink: 0, filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))", ...style }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="351" height="188" viewBox="0 0 351 188" fill="none" preserveAspectRatio="none" className="absolute -left-1 top-0 h-full w-[351px]" aria-hidden>
        <g filter="url(#filter0_dn_2037_89)">
          <rect x="4" width="343" height="180" rx="18" fill="#324B02" fillOpacity="0.9" shapeRendering="crispEdges"/>
        </g>
        <defs>
          <filter id="filter0_dn_2037_89" x="0" y="0" width="351" height="188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2037_89"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="1941"/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
            </feComponentTransfer>
            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood floodColor="rgba(0, 0, 0, 0.1)" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge result="effect2_noise_2037_89">
              <feMergeNode in="shape"/>
              <feMergeNode in="color1"/>
            </feMerge>
            <feBlend mode="normal" in="effect2_noise_2037_89" in2="effect1_dropShadow_2037_89" result="effect2_noise_2037_89"/>
          </filter>
        </defs>
      </svg>
      <div className="relative z-10 h-full w-full pb-4 pt-3 flex flex-col">
        {title ? <h3 className="px-4 text-base font-medium">{title}</h3> : null}
        {/* edge-to-edge divider in background color */}
        <div className="mt-2 h-px w-full bg-eco-beige" />
        <div className="mt-3 flex-1 overflow-hidden px-4">
          {children}
        </div>
      </div>
    </section>
  )
}


