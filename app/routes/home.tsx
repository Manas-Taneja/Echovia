import BlobCard from "../components/blob-card"
import NextCheckIn from "../components/next-checkin"
import SectionCard from "../components/section-card"
import TopNav from "../components/top-nav"
import ScanPanel from "../components/scan-panel"

export default function Home() {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")
  const yy = String(now.getFullYear()).slice(-2)
  const todayLabel = `${mm}/${dd}/${yy}`

  // Generate two random dates one month apart
  const formatDate = (d: Date) => {
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const y = String(d.getFullYear()).slice(-2)
    return `${m}/${day}/${y}`
  }
  const base = new Date()
  base.setMonth(base.getMonth() - (1 + Math.floor(Math.random() * 6)))
  base.setDate(base.getDate() - Math.floor(Math.random() * 27))
  const date1Label = formatDate(base)
  const date2 = new Date(base)
  date2.setMonth(date2.getMonth() + 1)
  const date2Label = formatDate(date2)

  return (
    <>
      {/* Use global root background with grain; no local background override */}
      <main className="min-h-dvh" style={{ ["--app-content-padding-bottom" as any]: "0px" }}>
      <div className="mx-auto max-w-md px-4 pb-20 pt- -mt-4 mt-[2px]">
        <TopNav greeting="Hello, Luna" />

        <div className="mt-2 flex flex-col items-center">
          <NextCheckIn dateLabel={todayLabel} />
        </div>

        {/* Slim green bar */}
        <div className="mt-4">
          <SectionCard title="Feel your Lumps, Save your Bumps" size="bar" className="text-xs pt-4 text-center flex items-center justify-center" />
        </div>

        {/* Checking In blob with daily emojis and action */}
        <div className="mt-6">
          <BlobCard title="Checking In?">
            <div className="mt-2 grid gap-4">
              {/* Days of week as columns with date below */}
              <div className="flex items-start justify-center gap-8">
                {[
                  { d: "M", n: "3" },
                  { d: "T", n: "4" },
                  { d: "W", n: "5" },
                  { d: "T", n: "6" },
                  { d: "F", n: "7" },
                ].map((it, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-wide text-eco-ink/70">{it.d}</span>
                    <span className="text-sm text-eco-ink">{it.n}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">😊</div>
                  <div className="text-xs text-eco-ink/70">Good</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">😖</div>
                  <div className="text-xs text-eco-ink/70">Uneasy</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">💧</div>
                  <div className="text-xs text-eco-ink/70">Swelling</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">🌙</div>
                  <div className="text-xs text-eco-ink/70">Fatigue</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="relative grid place-items-center text-center text-white text-xs leading-none"
                  style={{ width: 93, height: 28, flexShrink: 0, filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 101 28"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M4 14C4 6.26801 10.268 0 18 0H83C90.732 0 97 6.26801 97 14C97 21.732 90.732 28 83 28H18C10.268 28 4 21.732 4 14Z" fill="#324B02" fillOpacity="0.9" shapeRendering="crispEdges"/>
                  </svg>
                  <span className="relative z-10 leading-none" style={{ lineHeight: "28px" }}>Log scan</span>
                </button>
              </div>
            </div>
          </BlobCard>
        </div>

        {/* Your Scans */}
        <div className="mt-6 flex justify-center">
          <ScanPanel title="Your Scans">
            <div className="space-y-4 text-sm">
              <div className="relative text-black flex items-center justify-between rounded-[26px] px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                <svg className="absolute inset-0 -z-10" width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <filter id="pill-grain-1" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="111" result="noise"/>
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                      <feComponentTransfer in="alphaNoise" result="grain">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
                      </feComponentTransfer>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="#E8DCCA" rx="26" ry="26" />
                  <rect width="100%" height="100%" filter="url(#pill-grain-1)" opacity="0.02" rx="26" ry="26" />
                </svg>
                <span className="opacity-95">Latest scan</span>
                <button className="underline underline-offset-2 opacity-95" type="button">View report</button>
              </div>
              <div className="relative text-black flex items-center justify-between rounded-[26px] px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                <svg className="absolute inset-0 -z-10" width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <filter id="pill-grain-2" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="222" result="noise"/>
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                      <feComponentTransfer in="alphaNoise" result="grain">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
                      </feComponentTransfer>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="#E8DCCA" rx="26" ry="26" />
                  <rect width="100%" height="100%" filter="url(#pill-grain-2)" opacity="0.02" rx="26" ry="26" />
                </svg>
                <span className="opacity-95">View all</span>
                <button className="opacity-95 p-1" aria-label="View all" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </ScanPanel>
        </div>

        {/* Scan History */}
        <div className="mt-6 flex justify-center">
          <ScanPanel title="Scan History">
            <div className="space-y-4 text-sm">
              <div className="relative text-black flex items-center justify-between rounded-[26px] px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                <svg className="absolute inset-0 -z-10" width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <filter id="pill-grain-3" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="333" result="noise"/>
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                      <feComponentTransfer in="alphaNoise" result="grain">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
                      </feComponentTransfer>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="#E8DCCA" rx="26" ry="26" />
                  <rect width="100%" height="100%" filter="url(#pill-grain-3)" opacity="0.02" rx="26" ry="26" />
                </svg>
                <span className="opacity-95">{date1Label}</span>
                <button className="underline underline-offset-2 opacity-95" type="button">Report</button>
              </div>
              <div className="relative text-black flex items-center justify-between rounded-[26px] px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                <svg className="absolute inset-0 -z-10" width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <filter id="pill-grain-4" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="444" result="noise"/>
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                      <feComponentTransfer in="alphaNoise" result="grain">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
                      </feComponentTransfer>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="#E8DCCA" rx="26" ry="26" />
                  <rect width="100%" height="100%" filter="url(#pill-grain-4)" opacity="0.02" rx="26" ry="26" />
                </svg>
                <span className="opacity-95">{date2Label}</span>
                <button className="underline underline-offset-2 opacity-95" type="button">Report</button>
              </div>
            </div>
          </ScanPanel>
        </div>

        {/* About Echovia section removed per request */}
      </div>
      </main>
    </>
  )
}
