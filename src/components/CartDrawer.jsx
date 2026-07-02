import { useEffect } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../store/useCart'
import { formatPrice } from '../utils/format'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const items = useCart((s) => s.items)
  const setQuantity = useCart((s) => s.setQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const clearCart = useCart((s) => s.clearCart)
  const subtotal = useCart((s) => s.subtotal())

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-card z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h2 className="font-display font-bold text-base text-ink">Your cart</h2>
              <button onClick={onClose} aria-label="Close cart" className="p-1.5 rounded-full hover:bg-paper text-ink-dim">
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center px-6">
                <ShoppingBag className="w-9 h-9 text-ink-faint" />
                <p className="text-sm text-ink-dim">Your cart is empty.</p>
                <p className="text-xs text-ink-faint">Add a few things you like the look of.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover bg-paper shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink line-clamp-2">{item.title}</p>
                        <p className="num text-sm text-ink-dim mt-0.5">{formatPrice(item.price)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-line rounded-md">
                            <button
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-ink-dim hover:text-ink"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-ink-dim hover:text-ink"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-ink-faint hover:text-sale">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={clearCart} className="text-xs text-ink-faint hover:text-sale underline">
                    Clear cart
                  </button>
                </div>

                <div className="border-t border-line p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-dim">Subtotal</span>
                    <span className="font-display font-bold text-lg text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    onClick={onCheckout}
                    className="w-full bg-emerald hover:bg-emerald-deep text-white text-sm font-semibold rounded-lg py-3 transition-colors"
                  >
                    Proceed to checkout
                  </button>
                  <p className="text-[11px] text-ink-faint text-center">Demo cart — no real payment is processed.</p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
