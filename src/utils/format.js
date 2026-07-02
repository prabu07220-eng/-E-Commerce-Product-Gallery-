export function formatPrice(value) {
  if (value == null) return '—'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function getSalePrice(product) {
  if (!product.discountPercentage) return product.price
  return product.price * (1 - product.discountPercentage / 100)
}

export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
