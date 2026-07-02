import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import { useProducts } from './hooks/useProducts'
import { useCategories } from './hooks/useCategories'
import { useWishlist } from './store/useWishlist'
import { useCart } from './store/useCart'
import { getSalePrice } from './utils/format'

const PAGE_SIZE = 20

const SORT_MAP = {
  'title-asc': { sortBy: 'title', order: 'asc' },
  'price-asc': { sortBy: 'price', order: 'asc' },
  'price-desc': { sortBy: 'price', order: 'desc' },
  'rating-desc': { sortBy: 'rating', order: 'desc' },
}

export default function App() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortValue, setSortValue] = useState('title-asc')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  const categories = useCategories()
  const wishlistIds = useWishlist((s) => s.ids)
  const { sortBy, order } = SORT_MAP[sortValue]
  const { products, loading, error } = useProducts({ category, search: debouncedSearch, sortBy, order })

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [category, debouncedSearch, sortValue, priceRange, wishlistOnly])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const filtered = useMemo(() => {
    const min = parseFloat(priceRange.min)
    const max = parseFloat(priceRange.max)

    return products.filter((p) => {
      if (wishlistOnly && !wishlistIds.includes(p.id)) return false
      const price = getSalePrice(p)
      if (!Number.isNaN(min) && price < min) return false
      if (!Number.isNaN(max) && price > max) return false
      return true
    })
  }, [products, wishlistOnly, wishlistIds, priceRange])

  const visible = filtered.slice(0, visibleCount)

  function showToast(message) {
    setToast(message)
  }

  function handleCheckout() {
    useCart.getState().clearCart()
    setCartOpen(false)
    showToast('Order placed — this is a demo, no real payment was made.')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="mb-5">
          <h1 className="font-display font-bold text-xl sm:text-2xl text-ink">Browse the catalogue</h1>
          <p className="text-sm text-ink-dim mt-0.5">Search, filter, and add things to your cart or wishlist.</p>
        </div>

        <div className="mb-5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            wishlistOnly={wishlistOnly}
            onWishlistToggle={() => setWishlistOnly((w) => !w)}
            wishlistCount={wishlistIds.length}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
        </div>

        {error && <div className="mb-4 text-sm text-sale">{error}</div>}

        <ProductGrid products={visible} loading={loading} onSelect={setSelectedProduct} />

        {!loading && visibleCount < filtered.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-5 py-2.5 rounded-lg border border-line bg-card text-sm font-medium text-ink hover:border-emerald transition-colors"
            >
              Load more ({filtered.length - visibleCount} more)
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-line py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-ink-faint">
          <span>Product data from DummyJSON</span>
          <span>Built with React, Vite &amp; Tailwind CSS</span>
        </div>
      </footer>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdded={() => {
            showToast('Added to cart')
            setSelectedProduct(null)
          }}
        />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      <Toast message={toast} />
    </div>
  )
}
