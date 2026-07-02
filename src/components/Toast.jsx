import { CheckCircle2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ message }) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 bg-ink text-white text-sm px-4 py-2.5 rounded-full shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-soft" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
