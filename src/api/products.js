import axios from 'axios'

const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
})

/**
 * Fetches products for a given category/search combo with sorting.
 * Uses limit=0 (no limit) since the full catalog is small (~194 items) -
 * this lets price-range filtering and "load more" be done instantly
 * client-side instead of juggling server pagination against client filters.
 */
export async function fetchProducts({ category, search, sortBy = 'title', order = 'asc' } = {}) {
  const params = { sortBy, order, limit: 0 }
  const trimmedSearch = search?.trim()
  const hasCategory = Boolean(category && category !== 'all')
  let path = '/products'

  if (trimmedSearch) {
    path = '/products/search'
    params.q = trimmedSearch
  } else if (hasCategory) {
    path = `/products/category/${category}`
  }

  const { data } = await client.get(path, { params })
  let products = data.products ?? []

  // DummyJSON's /products/search endpoint has no category param, so it
  // can't filter by category server-side. When both a search term and a
  // category chip are active, narrow the search results down to that
  // category client-side so the selected chip is actually respected.
  if (trimmedSearch && hasCategory) {
    products = products.filter((p) => p.category === category)
  }

  return products
}

export async function fetchCategories() {
  const { data } = await client.get('/products/categories')
  return data ?? []
}
