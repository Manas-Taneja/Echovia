import SearchBar from "../components/search-bar"
import SectionGrid from "../components/section-grid"
import WideCard from "../components/wide-card"

export default function AboutTheAppPage() {
  return (
    <main
      className="min-h-dvh pb-12 pt-0 -mt-4 mt-[2px] bg-eco-beige"
    >
      {/* Header */}
      <header className="text-black text-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-pretty">Echovia</h1>
        <p className="text-sm opacity-80 mt-1">You can always turn things around</p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Guided Instructions */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Guided Instructions</h2>
        <SectionGrid
          items={[{ label: "What’s it about for?" }, { label: "Application" }, { label: "Access via Bluetooth" }]}
          carousel
        />
      </section>

      {/* Breast self-exam */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Breast self-exam</h2>
        <SectionGrid
          items={[{ label: "Why & How to?" }, { label: "How to check for Lumps?" }, { label: "Step-by-Step process" }]}
          carousel
        />
      </section>

      {/* FAQ’s answered */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">FAQ’s answered</h2>
        <div className="space-y-5 px-5">
          {[
            "What is the ideal time to do breast self-examination?",
            "Can I scan during cycle?",
          ].map((label, idx) => (
            <WideCard key={idx} label={label} />
          ))}
        </div>
      </section>
    </main>
  )
}


