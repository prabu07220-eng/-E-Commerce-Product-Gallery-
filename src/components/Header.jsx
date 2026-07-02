import { ShoppingBag } from 'lucide-react'
import { useCart } from '../store/useCart'

export default function Header({ onCartClick }) {
  const totalItems = useCart((s) => s.totalItems())

  return (
    <header className="bg-card border-b border-line sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center text-white font-display font-bold text-sm">
            C
          </span>
          <span className="font-display font-bold text-lg text-ink tracking-tight">Catalogue</span>
        </div>

        <button
          onClick={onCartClick}
          aria-label="Open cart"
          className="relative p-2 rounded-lg hover:bg-paper transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-ink" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sale text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
