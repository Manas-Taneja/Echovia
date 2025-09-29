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

  return (
    <>
      {/* Use global root background with grain; no local background override */}
      <main className="min-h-dvh">
      <div className="mx-auto max-w-md px-4 pb-20 pt-4">
        <TopNav greeting="Hello, Luna" />

        <div className="mt-2 flex flex-col items-center">
          <NextCheckIn dateLabel={todayLabel} />
        </div>

        {/* Slim green bar */}
        <div className="mt-4">
          <SectionCard title="Feel your Lumps, Save your Bumps" size="bar" className="text-center flex items-center justify-center" />
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
                    viewBox="0 0 101 36"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <g filter="url(#filter0_dn_2037_134)">
                      <path d="M4 14C4 6.26801 10.268 0 18 0H83C90.732 0 97 6.26801 97 14C97 21.732 90.732 28 83 28H18C10.268 28 4 21.732 4 14Z" fill="#324B02" fillOpacity="0.9" shapeRendering="crispEdges"/>
                    </g>
                    <defs>
                      <filter id="filter0_dn_2037_134" x="0" y="0" width="101" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2037_134"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="6073"/>
                        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
                        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                          <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                        </feComponentTransfer>
                        <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
                        <feFlood floodColor="rgba(0, 0, 0, 0.1)" result="color1Flood"/>
                        <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
                        <feMerge result="effect2_noise_2037_134">
                          <feMergeNode in="shape"/>
                          <feMergeNode in="color1"/>
                        </feMerge>
                        <feBlend mode="normal" in="effect2_noise_2037_134" in2="effect1_dropShadow_2037_134" result="effect2_noise_2037_134"/>
                      </filter>
                    </defs>
                  </svg>
                  <span className="relative z-10 leading-none" style={{ lineHeight: 1, transform: "translateY(-0.5px)" }}>Log scan</span>
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
                <span className="opacity-95">Latest Scan</span>
                <button className="underline underline-offset-2 opacity-95" type="button">Report</button>
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
                <span className="opacity-95">Previous Scan</span>
                <button className="underline underline-offset-2 opacity-95" type="button">Report</button>
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
                <span className="opacity-95">Latest Scan</span>
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
                <span className="opacity-95">Previous Scan</span>
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
