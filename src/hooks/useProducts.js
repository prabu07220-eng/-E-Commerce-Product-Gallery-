import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

export function useProducts({ category, search, sortBy, order }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProducts({ category, search, sortBy, order })
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load products. Try again in a moment.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [category, search, sortBy, order])

  return { products, loading, error }
}
