import { Search, X, Heart } from 'lucide-react'
import { capitalize } from '../utils/format'

const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Name: A to Z' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: highest' },
]

export default function FilterBar({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  wishlistOnly,
  onWishlistToggle,
  wishlistCount,
  priceRange,
  onPriceRangeChange,
  sortValue,
  onSortChange,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="w-full bg-card border border-line rounded-lg pl-9 pr-9 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald transition-colors"
          />
          {search && (
            <button onClick={() => onSearchChange('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-card border border-line rounded-lg px-2.5 py-2">
            <span className="text-xs text-ink-faint">$</span>
            <input
              type="number"
              min="0"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
              placeholder="Min"
              aria-label="Minimum price"
              className="w-14 text-sm outline-none bg-transparent"
            />
            <span className="text-ink-faint">–</span>
            <input
              type="number"
              min="0"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
              placeholder="Max"
              aria-label="Maximum price"
              className="w-14 text-sm outline-none bg-transparent"
            />
          </div>

          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products"
            className="bg-card border border-line rounded-lg px-3 py-2.5 text-sm text-ink-dim outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button
          onClick={() => onCategoryChange('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            activeCategory === 'all'
              ? 'bg-emerald text-white border-emerald'
              : 'bg-card text-ink-dim border-line hover:border-emerald/50'
          }`}
        >
          All
        </button>

        <button
          onClick={onWishlistToggle}
          className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            wishlistOnly
              ? 'bg-sale text-white border-sale'
              : 'bg-card text-ink-dim border-line hover:border-sale/50'
          }`}
        >
          <Heart className="w-3 h-3" /> Wishlist
          {wishlistCount > 0 && <span className="opacity-80">({wishlistCount})</span>}
        </button>

        <span className="w-px h-5 bg-line shrink-0" />

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeCategory === cat.slug
                ? 'bg-emerald text-white border-emerald'
                : 'bg-card text-ink-dim border-line hover:border-emerald/50'
            }`}
          >
            {capitalize(cat.name)}
          </button>
        ))}
      </div>
    </div>
  )
}
