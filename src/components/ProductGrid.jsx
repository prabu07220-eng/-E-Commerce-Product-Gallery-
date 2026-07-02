import { PackageSearch } from 'lucide-react'
import ProductCard from './ProductCard'

function CardSkeleton() {
  return (
    <div className="bg-card border border-line rounded-xl overflow-hidden">
      <div className="skeleton aspect-square" />
      <div className="p-3 sm:p-4 space-y-2">
        <div className="skeleton h-2.5 w-16" />
        <div className="skeleton h-3.5 w-full" />
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-5 w-24 mt-2" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, onSelect }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-2 py-20">
        <PackageSearch className="w-9 h-9 text-ink-faint" />
        <p className="text-sm text-ink-dim">No products match these filters.</p>
        <p className="text-xs text-ink-faint">Try a different search, category, or price range.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  )
}
