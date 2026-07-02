import { Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import StarRating from './StarRating'
import PriceTagBadge from './PriceTagBadge'
import { useWishlist } from '../store/useWishlist'
import { useCart } from '../store/useCart'
import { formatPrice, getSalePrice, capitalize } from '../utils/format'

export default function ProductCard({ product, onSelect }) {
  const isWishlisted = useWishlist((s) => s.isWishlisted(product.id))
  const toggleWishlist = useWishlist((s) => s.toggle)
  const addItem = useCart((s) => s.addItem)

  const salePrice = getSalePrice(product)
  const hasDiscount = product.discountPercentage > 1

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-line rounded-xl overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-square bg-paper overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <PriceTagBadge percent={product.discountPercentage} />
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-sale text-sale' : 'text-ink-dim'}`} />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-[10px] uppercase tracking-wide text-emerald font-semibold mb-1">
          {capitalize(product.category?.replace(/-/g, ' '))}
        </p>
        <h3 className="font-display font-semibold text-sm text-ink leading-snug line-clamp-2 mb-1.5 min-h-[2.4em]">
          {product.title}
        </h3>
        <StarRating rating={product.rating} />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-base text-ink">{formatPrice(salePrice)}</span>
            {hasDiscount && (
              <span className="text-xs text-ink-faint line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              addItem(product, 1)
            }}
            aria-label="Add to cart"
            className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center hover:bg-emerald-deep transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
