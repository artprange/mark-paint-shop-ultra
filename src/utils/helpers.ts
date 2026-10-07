
export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
