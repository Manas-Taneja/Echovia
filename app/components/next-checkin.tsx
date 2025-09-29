type Props = {
  dateLabel: string
}

export default function NextCheckIn({ dateLabel }: Props) {
  return (
    <div className="text-center">
      <div className="text-black text-[10px] uppercase tracking-[0.12em] text-eco-ink/80">NEXT CHECK-IN</div>
      <div className="mt-1 inline-flex items-center justify-center rounded-full bg-eco-green px-4 py-1 text-[13px] font-semibold leading-6 text-white shadow-bottom-pseudo">
        {dateLabel}
      </div>
    </div>
  )
}
