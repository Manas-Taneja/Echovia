export default function SearchBar() {
  return (
    <div
      className="w-full rounded-full px-4 py-3"
      style={{
        backgroundColor: "var(--eco-green)",
        boxShadow: "var(--eco-shadow)",
      }}
      role="search"
      aria-label="Site search"
    >
      <div className="flex items-center gap-3">
        {/* Hamburger icon */}
        <span aria-hidden="true" className="shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/90">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none placeholder:text-white/90 text-white/95 text-[18px]"
          aria-label="Search"
        />

        {/* Search icon removed per request */}
      </div>
    </div>
  )
}
