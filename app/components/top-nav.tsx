"use client"

import type React from "react"
import { NavLink } from "react-router"

type Props = {
  greeting: string
}

function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 2.5V7.5M10 2.5V7.5M3.75 12.5H26.25M6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5C3.75 6.11929 4.86929 5 6.25 5Z"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}



export default function TopNav({ greeting }: Props) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-balance text-2xl font-semibold text-eco-ink">{greeting}</h1>
      <nav aria-label="Primary" className="flex items-center gap-3 text-eco-ink">
        <NavLink to="/timeline" className="rounded-full p-1 hover:bg-black/5">
          <IconCalendar />
        </NavLink>
      </nav>
    </header>
  )
}
