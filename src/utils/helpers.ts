/** Os preços trafegam em centavos; a formatação é o único lugar que divide. */
export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
