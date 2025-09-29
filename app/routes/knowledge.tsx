import { useEffect } from "react"
import SearchBar from "../components/search-bar"
import SectionGrid from "../components/section-grid"
import WideCard from "../components/wide-card"

export default function KnowledgePage() {
  useEffect(() => {
    // Ensure page loads at top; override any restoration quirks
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [])
  return (
    <main className="min-h-dvh pb-0 pt-0 -mt-4 mt-[2px] bg-eco-beige">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-black text-3xl font-semibold tracking-tight text-pretty">Knowledge Center</h1>
        <p className="text-black text-sm opacity-80 mt-1">Learn with gentle, clear guides</p>
      </header>

      {/* Content */}

      {/* Search */}
      <div className="mb-8 px-5">
        <SearchBar />
      </div>

      {/* Signs & Symptoms */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Signs & Symptoms</h2>
        <WideCard label="Feeling lumpy?" />
      </section>

      {/* Risk Factors & Prevention */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Risk Factors & Prevention</h2>
        <SectionGrid
          items={[{ label: "Radiation" }, { label: "Reproductive Factors" }, { label: "Family History" }]}
          carousel
        />
      </section>

      {/* When to worry? */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">When to worry?</h2>
        <WideCard label="Breast pain?" />
      </section>

      {/* Lifestyle Choices */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Lifestyle Choices</h2>
        <SectionGrid items={[{ label: "Diet & Nutrition" }, { label: "Exercising regularly" }, { label: "Alcohol & Smoking" }]} carousel />
      </section>

      {/* Secretions */}
      <section className="mb-10">
        <h2 className="text-black text-xl font-semibold mb-4">Secretions</h2>
        <SectionGrid
          items={[{ label: "Milky" }, { label: "Bloody" }, { label: "Clear" }]}
          carousel
        />
      </section>
    </main>
  )
}
