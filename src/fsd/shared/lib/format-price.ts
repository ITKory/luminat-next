export function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU").replace(/\u00A0/g, " ")}₽`
}
