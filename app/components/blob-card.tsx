import type React from "react"
type Props = {
  title: string
  className?: string
  children?: React.ReactNode
}

export default function BlobCard({ title, className, children }: Props) {
  return (
    <section
      className={["relative mx-auto text-center text-eco-ink", className ?? ""].join(" ")}
      aria-label={title}
      style={{ width: "min(100%, 430.5px)", aspectRatio: "344 / 248" }}
    >
      {/* Exact trapezoid-with-rounded-corners shape from provided SVG */}
      <svg viewBox="0 0 344 217" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M102.511 18.2946C110.993 6.79036 124.437 0 138.73 0H206.515C220.951 0 234.511 6.92613 242.973 18.6223L334.858 145.622C356.386 175.378 335.127 217 298.4 217H45.0894C8.17631 217 -13.0359 175.005 8.8703 145.295L102.511 18.2946Z" fill="#F5E9E5"/>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-4 py-5">
        <div className="pointer-events-auto text-base font-medium">{title}</div>
        {children ? <div className="pointer-events-auto mt-3 text-sm text-eco-ink/80">{children}</div> : null}
      </div>
    </section>
  )
}
