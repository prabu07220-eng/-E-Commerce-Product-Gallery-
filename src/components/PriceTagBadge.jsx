export default function PriceTagBadge({ percent }) {
  if (!percent || percent < 1) return null

  return (
    <div className="absolute top-2 left-2 drop-shadow-sm" aria-label={`${Math.round(percent)}% off`}>
      <svg width="54" height="26" viewBox="0 0 54 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 4 C2 2.9 2.9 2 4 2 H38 L52 13 L38 24 H4 C2.9 24 2 23.1 2 22 Z"
          fill="#D6502B"
        />
        <circle cx="9" cy="13" r="2.4" fill="#F6F5F1" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center pl-3.5 text-white text-[11px] font-display font-bold tracking-tight">
        -{Math.round(percent)}%
      </span>
    </div>
  )
}
