import { useEffect, useState } from 'react'
import { X, Heart, Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import StarRating from './StarRating'
import { useWishlist } from '../store/useWishlist'
import { useCart } from '../store/useCart'
import { formatPrice, getSalePrice, capitalize } from '../utils/format'

export default function QuickViewModal({ product, onClose, onAdded }) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const isWishlisted = useWishlist((s) => s.isWishlisted(product.id))
  const toggleWishlist = useWishlist((s) => s.toggle)
  const addItem = useCart((s) => s.addItem)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const images = product.images?.length ? product.images : [product.thumbnail]
  const salePrice = getSalePrice(product)
  const hasDiscount = product.discountPercentage > 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl bg-card max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-end p-3 sm:hidden">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-paper text-ink-dim">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-0">
          <div className="p-4 sm:p-6">
            <div className="aspect-square bg-paper rounded-xl overflow-hidden mb-3">
              <img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-emerald' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 sm:pl-0 relative">
            <button onClick={onClose} className="hidden sm:flex absolute top-5 right-5 p-1.5 rounded-full hover:bg-paper text-ink-dim">
              <X className="w-5 h-5" />
            </button>

            <p className="text-[11px] uppercase tracking-wide text-emerald font-semibold mb-1.5">
              {capitalize(product.category?.replace(/-/g, ' '))} {product.brand ? `· ${product.brand}` : ''}
            </p>
            <h2 className="font-display font-bold text-lg sm:text-xl text-ink mb-2 pr-8">{product.title}</h2>
            <StarRating rating={product.rating} />

            <div className="flex items-baseline gap-2 mt-3 mb-3">
              <span className="font-display font-bold text-2xl text-ink">{formatPrice(salePrice)}</span>
              {hasDiscount && <span className="text-sm text-ink-faint line-through">{formatPrice(product.price)}</span>}
              {hasDiscount && (
                <span className="text-xs font-semibold text-sale">-{Math.round(product.discountPercentage)}%</span>
              )}
            </div>

            <p className="text-sm text-ink-dim leading-relaxed mb-4">{product.description}</p>

            <p className="text-xs text-ink-faint mb-4">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-line rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-ink-dim hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-ink-dim hover:text-ink"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  addItem(product, quantity)
                  onAdded?.()
                }}
                className="flex-1 bg-emerald hover:bg-emerald-deep text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
              >
                Add to cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="p-2.5 rounded-lg border border-line hover:border-sale/50"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-sale text-sale' : 'text-ink-dim'}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
