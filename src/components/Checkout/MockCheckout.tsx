import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCartContext } from '../../context/cartContext/useCartContext'
import { useUserContext } from '../../context/userContext'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

const REDIRECT_DELAY_MS = 5000

/**
 * Checkout simulado, usado quando a Stripe não está configurada. Não cobra
 * nada e não fala com backend nenhum — só exercita o fluxo de "finalizou a
 * compra" para a aplicação rodar ponta a ponta sem credencial.
 */
export default function MockCheckout() {
  const { total_amount, shipping_fee, clearCart } = useCartContext()
  const { myUser } = useUserContext()
  const navigate = useNavigate()

  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  useEffect(() => {
    if (!succeeded) return
    const timer = setTimeout(() => {
      clearCart()
      navigate('/')
    }, REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [succeeded, clearCart, navigate])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSucceeded(true)
    }, 800)
  }

  return (
    <Wrapper>
      {succeeded ? (
        <article>
          <h4>Obrigado!</h4>
          <h4>Pagamento simulado concluído.</h4>
          <h4>Voltando para a home...</h4>
        </article>
      ) : (
        <article>
          <h4>Olá, {myUser?.name}</h4>
          <p>Seu total: {formatPrice(total_amount + shipping_fee)}</p>
          <p>
            Pagamento simulado — a Stripe não está configurada nesta
            instalação. Nada é cobrado.
          </p>
        </article>
      )}
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={processing || succeeded}>
          {processing ? <span className="spinner" /> : 'Simular pagamento'}
        </button>
      </form>
    </Wrapper>
  )
}
