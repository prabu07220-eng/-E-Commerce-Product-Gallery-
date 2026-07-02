import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, size = 13 }) {
  const rounded = Math.round(rating * 2) / 2

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= rounded
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={filled ? 'fill-emerald text-emerald' : 'fill-none text-line'}
          />
        )
      })}
      <span className="text-[11px] text-ink-faint ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}
