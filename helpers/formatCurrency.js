export const formatPrice = (price) => {
  return `${Math.floor(price / 1000)},${(price % 1000)}`
}