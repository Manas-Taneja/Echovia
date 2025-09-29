import type React from "react"
import { cn } from "../lib/utils"

type Props = {
  title?: string
  size?: "bar" | "tall"
  className?: string
  children?: React.ReactNode
}

export default function SectionCard({ title, size = "tall", className, children }: Props) {
  const base = "bg-eco-green text-white shadow-eco"
  const sizing = size === "bar" ? "h-11 rounded-full" : "min-h-44 rounded-2xl"

  return (
    <section className={cn(base, sizing, "px-4 pb-4 pt-3", className)}>
      {title ? (
        size === "bar" ? (
          <h2 className="w-full text-center text-base font-medium">{title}</h2>
        ) : (
          <>
            <h2 className="text-base font-medium">{title}</h2>
            <hr className="mt-2 border-eco-ink/20" />
          </>
        )
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </section>
  )
}
