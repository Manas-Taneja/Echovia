import { useEffect, useMemo, useRef, useState } from "react"
import BlobCard from "../components/blob-card"
import NextCheckIn from "../components/next-checkin"
import SectionCard from "../components/section-card"
import TopNav from "../components/top-nav"
import ScanPanel from "../components/scan-panel"

export default function Home() {
  const [connectState, setConnectState] = useState<"idle" | "searching" | "connected">("idle")
  const [connectMessage, setConnectMessage] = useState("Ready to pair with your Echovia digital twin.")
  const [simStatus, setSimStatus] = useState<"idle" | "scanning" | "done">("idle")
  const [simProgress, setSimProgress] = useState(0)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [motionProgress, setMotionProgress] = useState(0)
  const [motionActive, setMotionActive] = useState(false)
  const [motionError, setMotionError] = useState<string | null>(null)
  const [sensorConsent, setSensorConsent] = useState<"unknown" | "granted" | "dismissed">("unknown")
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const simTimerRef = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const motionHandlerRef = useRef<((ev: DeviceMotionEvent) => void) | undefined>(undefined)

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

  const scenarios = useMemo(
    () => [
      { name: "Healthy", detail: "No concerning patterns detected.", guidance: "Keep monthly self-checks going." },
      { name: "Benign Cyst", detail: "Soft, movable tissue signature.", guidance: "Log and monitor over the next week." },
      { name: "Consult Doctor", detail: "Irregular density cluster observed.", guidance: "Schedule a professional screening." },
    ],
    [],
  )

  useEffect(() => {
    const consent = typeof window !== "undefined" ? localStorage.getItem("echovia-sensor-consent") : null
    if (consent === "granted") setSensorConsent("granted")
    else if (consent === "dismissed") setSensorConsent("dismissed")
  }, [])

  useEffect(() => {
    return () => {
      if (simTimerRef.current) window.clearInterval(simTimerRef.current)
      stopMotionListener()
      stopCamera()
    }
  }, [])

  const quadrantLabel = useMemo(() => {
    if (motionProgress >= 100) return "Quadrant 4"
    if (motionProgress >= 75) return "Quadrant 3"
    if (motionProgress >= 50) return "Quadrant 2"
    if (motionProgress >= 25) return "Quadrant 1"
    return "Starting"
  }, [motionProgress])

  function handleConnect() {
    setConnectState("searching")
    setConnectMessage("Searching for your Echovia device...")
    window.setTimeout(() => {
      setConnectState("connected")
      setConnectMessage("Digital twin paired • streaming simulated data.")
    }, 1500)
  }

  function startSimulatedScan() {
    if (simStatus === "scanning") return
    if (connectState !== "connected") return
    setSimStatus("scanning")
    setSimProgress(0)
    const start = performance.now()
    const total = 3000
    if (simTimerRef.current) window.clearInterval(simTimerRef.current)
    simTimerRef.current = window.setInterval(() => {
      const pct = Math.min(100, ((performance.now() - start) / total) * 100)
      setSimProgress(pct)
      if (pct >= 100) {
        if (simTimerRef.current) window.clearInterval(simTimerRef.current)
        const next = (scenarioIndex + 1) % scenarios.length
        setScenarioIndex(next)
        setSimStatus("done")
      }
    }, 120)
  }

  async function ensureMotionPermission() {
    if (typeof window === "undefined") return false
    
    // Check HTTPS requirement
    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      setMotionError("Motion sensors require HTTPS. Use https:// or localhost.")
      return false
    }
    
    if (typeof DeviceMotionEvent === "undefined") {
      setMotionError("Device motion not supported. Try Chrome, Safari, or Firefox on mobile.")
      return false
    }
    // iOS requires explicit permission
    // @ts-expect-error: requestPermission exists on iOS Safari
    const needsRequest = typeof DeviceMotionEvent.requestPermission === "function"
    if (needsRequest) {
      try {
        // @ts-expect-error: TS does not know about this API
        const res = await DeviceMotionEvent.requestPermission()
        if (res !== "granted") {
          setMotionError("Motion access denied. Please allow in browser settings.")
          return false
        }
      } catch (err) {
        setMotionError(`Motion permission failed: ${err instanceof Error ? err.message : "Unknown error"}`)
        return false
      }
    }
    return true
  }

  function stopMotionListener() {
    if (motionHandlerRef.current) {
      window.removeEventListener("devicemotion", motionHandlerRef.current)
      motionHandlerRef.current = undefined
    }
    setMotionActive(false)
  }

  async function startMotionListener() {
    if (connectState !== "connected") {
      setMotionError("Please connect Echovia device first.")
      return
    }
    setMotionError(null)
    const ok = await ensureMotionPermission()
    if (!ok) return
    setMotionActive(true)
    setMotionProgress(0)
    let lastBoost = 0
    const handler = (ev: DeviceMotionEvent) => {
      const alpha = Math.abs(ev.rotationRate?.alpha || 0)
      const beta = Math.abs(ev.rotationRate?.beta || 0)
      const gamma = Math.abs(ev.rotationRate?.gamma || 0)
      const magnitude = alpha + beta + gamma
      const nowTs = performance.now()
      if (magnitude > 45 && nowTs - lastBoost > 300) {
        setMotionProgress((p: number) => Math.min(100, p + 3))
        lastBoost = nowTs
      } else if (magnitude > 20 && nowTs - lastBoost > 500) {
        setMotionProgress((p: number) => Math.min(100, p + 1.5))
        lastBoost = nowTs
      }
    }
    motionHandlerRef.current = handler
    window.addEventListener("devicemotion", handler)
  }

  useEffect(() => {
    if (motionProgress >= 100 && motionActive) {
      stopMotionListener()
    }
  }, [motionProgress, motionActive])

  async function startCamera() {
    setCameraError(null)
    
    if (typeof window === "undefined") return
    
    // Check HTTPS requirement
    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      setCameraError("Camera requires HTTPS. Use https:// or localhost.")
      return
    }
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API not supported. Try Chrome, Safari, or Firefox on mobile.")
      return
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 960 }, height: { ideal: 720 } },
        audio: false,
      })
      setCameraStream(stream)
      const track = stream.getVideoTracks()[0]
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        void videoRef.current.play()
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setCameraError("Camera permission denied. Please allow in browser settings.")
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setCameraError("No camera found on this device.")
        } else {
          setCameraError(`Camera error: ${err.message}`)
        }
      } else {
        setCameraError("Camera unavailable. Check permissions and try again.")
      }
    }
  }

  function stopCamera() {
    cameraStream?.getTracks().forEach((t: MediaStreamTrack) => t.stop())
    setCameraStream(null)
  }

  async function enableSensorProxy() {
    setSensorConsent("granted")
    localStorage.setItem("echovia-sensor-consent", "granted")
    await startMotionListener()
    await startCamera()
  }

  function dismissSensorProxy() {
    setSensorConsent("dismissed")
    localStorage.setItem("echovia-sensor-consent", "dismissed")
  }

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
                  <div className="text-2xl">•</div>
                  <div className="text-xs text-eco-ink/70">Good</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">•</div>
                  <div className="text-xs text-eco-ink/70">Uneasy</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">•</div>
                  <div className="text-xs text-eco-ink/70">Swelling</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">•</div>
                  <div className="text-xs text-eco-ink/70">Fatigue</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={handleConnect}
                    className="relative grid place-items-center text-center text-white text-xs leading-none px-4 py-2 rounded-full bg-eco-green shadow-bottom-pseudo"
                    style={{ minWidth: 140, filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))" }}
                  >
                    {connectState === "searching" ? "Searching..." : connectState === "connected" ? "Connected" : "Connect Echovia"}
                  </button>
                  <p className="text-[11px] text-eco-ink/80 text-center">{connectMessage}</p>
                  {connectState === "searching" && <div className="scan-spinner" aria-hidden />}
                </div>
              </div>

            </div>
          </BlobCard>
        </div>

        <div className="mt-6 flex justify-center">
          <ScanPanel title="Sensor Proxy (Phone-as-Device)" className="text-sm" style={{ minHeight: 260 }}>
            <div className="space-y-3">
              {sensorConsent !== "granted" && (
                <div className="rounded-xl bg-white/15 border border-white/30 p-3 text-white text-xs">
                  <p className="font-medium text-white">Use your phone as the Echovia device</p>
                  <p className="text-white/80 mt-1">
                    We need motion + camera to guide the scan. Permissions are only used locally and never leave your phone.
                  </p>
                  {typeof window !== "undefined" && window.location.protocol !== "https:" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" && (
                    <p className="text-yellow-200 mt-2 text-[11px]">
                      ⚠️ Sensors require HTTPS. Use https:// or access via localhost.
                    </p>
                  )}
                  {typeof window !== "undefined" && typeof DeviceMotionEvent === "undefined" && (
                    <p className="text-yellow-200 mt-2 text-[11px]">
                      ⚠️ Motion sensors not supported in this browser. Try Chrome, Safari, or Firefox.
                    </p>
                  )}
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={enableSensorProxy}
                      className="px-4 py-2 rounded-full bg-white/80 text-eco-ink text-xs font-semibold"
                    >
                      Enable sensors
                    </button>
                    <button
                      type="button"
                      onClick={dismissSensorProxy}
                      className="px-3 py-2 rounded-full bg-white/10 text-white/70 text-xs"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              )}

              {sensorConsent === "granted" && (
                <>
                  <div className="rounded-xl bg-white/10 border border-white/30 p-3 text-white/90">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Motion</p>
                        <p className="text-sm font-medium">{quadrantLabel}</p>
                        <p className="text-[11px] text-white/70">Move in slow circles against your chest to fill the bar.</p>
                      </div>
                      <button
                        type="button"
                        onClick={motionActive ? stopMotionListener : startMotionListener}
                        className="px-3 py-2 rounded-full bg-white/80 text-eco-ink text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!motionActive && connectState !== "connected"}
                      >
                        {motionActive ? "Pause" : motionProgress >= 100 ? "Restart" : "Start"}
                      </button>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${motionProgress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[11px] flex justify-between text-white/70">
                      <span>{motionProgress >= 100 ? "Quadrants complete" : "Scanning..."}</span>
                      {motionError ? <span className="text-red-200">{motionError}</span> : null}
                    </div>
                  </div>

                  <div className="rounded-xl bg-black/40 border border-white/20 overflow-hidden relative mt-4 mb-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Camera</p>
                        <p className="text-sm font-medium text-white">Live heatmap preview</p>
                      </div>
                      <button
                        type="button"
                        onClick={cameraStream ? stopCamera : startCamera}
                        className="px-3 py-1 rounded-full bg-white/80 text-eco-ink text-xs font-semibold"
                      >
                        {cameraStream ? "Stop" : "Start"}
                      </button>
                    </div>
                    <div className="relative aspect-video bg-black/60">
                      <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                        playsInline
                        muted
                        autoPlay
                      />
                      <div className="heatmap-overlay" aria-hidden />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                      {!cameraStream && (
                        <div className="absolute inset-0 grid place-items-center text-white/70 text-xs">
                          <span>{cameraError ?? "Camera preview will appear here after you start."}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScanPanel>
        </div>

        <div className="mt-6 flex justify-center">
          <ScanPanel title="Digital Twin (Simulated Device)" className="text-sm" style={{ minHeight: 140 }}>
            <div className="space-y-3 text-white">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Status</p>
                <p className="text-sm font-medium text-white">
                  {simStatus === "scanning" ? "Scanning..." : `Scenario: ${scenarios[scenarioIndex].name}`}
                </p>
                <p className="text-[12px] text-white/70">{scenarios[scenarioIndex].detail}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={startSimulatedScan}
                  className="px-4 py-2 rounded-full bg-white text-eco-ink text-xs font-semibold shadow-bottom-pseudo disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={simStatus === "scanning" || connectState !== "connected"}
                >
                  {simStatus === "scanning" ? "Scanning..." : "Run Simulated Scan"}
                </button>
              </div>
              <div className="h-2 w-full rounded-full bg-eco-ink/10 overflow-hidden">
                <div
                  className="h-full bg-eco-green transition-all"
                  style={{ width: `${simStatus === "done" ? 100 : simProgress}%` }}
                />
              </div>
              <div className="flex flex-col gap-1 text-[11px] text-white/70">
                <div className="flex items-center justify-between">
                  <span>Guidance:</span>
                  <span className="text-right">
                    Status: {simStatus === "scanning" ? "Scanning..." : simStatus === "done" ? "Stream ready" : "Idle"}
                  </span>
                </div>
                <p className="text-white/90">{scenarios[scenarioIndex].guidance}</p>
              </div>
            </div>
          </ScanPanel>
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

        {/* About Echovia section removed per request */}
      </div>
      </main>
    </>
  )
}
