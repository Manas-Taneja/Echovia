export default function WideCard({ label }: { label: string }) {
  return (
    <div
      className="relative rounded-[28px] aspect-[16/9] flex items-end"
      style={{ backgroundColor: "var(--eco-green)", boxShadow: "var(--eco-shadow)" }}
      
    >
      <span className="px-4 pb-3 font-semibold text-white/95 select-none">{label}</span>
    </div>
  )
}
