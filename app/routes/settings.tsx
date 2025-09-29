import { useState } from "react"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main className="min-h-dvh bg-eco-beige">
      <div className="mx-auto max-w-[520px] px-5 pb-24">
        <header className="mb-6">
          <h1 className="text-black text-3xl font-semibold">Settings</h1>
          <p className="text-black/70 text-sm mt-1">Manage your account and preferences</p>
        </header>

        {/* Account */}
        <section className="mb-6">
          <h2 className="text-black text-base font-semibold mb-3">Account</h2>
          <div className="rounded-2xl bg-white/60 shadow-eco divide-y divide-black/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-black font-medium">Name</p>
                <p className="text-black/70 text-sm">Luna Bloom</p>
              </div>
              <button className="text-eco-ink underline underline-offset-2" type="button">Edit</button>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-black font-medium">Email</p>
                <p className="text-black/70 text-sm">luna@example.com</p>
              </div>
              <button className="text-eco-ink underline underline-offset-2" type="button">Change</button>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="mb-6">
          <h2 className="text-black text-base font-semibold mb-3">Preferences</h2>
          <div className="rounded-2xl bg-white/60 shadow-eco divide-y divide-black/10 overflow-hidden">
            <label className="flex items-center justify-between px-4 py-4">
              <span className="text-black">Enable notifications</span>
              <Toggle checked={notificationsEnabled} onChange={setNotificationsEnabled} />
            </label>
            <label className="flex items-center justify-between px-4 py-4">
              <span className="text-black">Dark mode</span>
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-6">
          <h2 className="text-black text-base font-semibold mb-3">Privacy</h2>
          <div className="rounded-2xl bg-white/60 shadow-eco divide-y divide-black/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-black">Two-factor authentication</span>
              <button className="text-eco-ink underline underline-offset-2" type="button">Set up</button>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-black">Download my data</span>
              <button className="text-eco-ink underline underline-offset-2" type="button">Request</button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mb-6">
          <h2 className="text-black text-base font-semibold mb-3">About</h2>
          <div className="rounded-2xl bg-white/60 shadow-eco overflow-hidden">
            <div className="px-4 py-4">
              <p className="text-black">Echovia App</p>
              <p className="text-black/70 text-sm">Version 1.0.0</p>
            </div>
          </div>
        </section>

        
      </div>
    </main>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-6 w-11 rounded-full"
      style={{ backgroundColor: checked ? "var(--eco-green)" : "#c9c9c9", boxShadow: "var(--eco-shadow)" }}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition-all"
        style={{ left: checked ? "calc(100% - 22px)" : 3 }}
      />
    </button>
  )
}


