export const formatPrice = (price) => {
  return `${(price / 1000).toFixed(0)},${(price % 1000)}`
}