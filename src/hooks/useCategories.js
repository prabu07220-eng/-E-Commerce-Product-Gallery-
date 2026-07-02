import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/products'

export function useCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  return categories
}
