import { Wrapper } from './styles'

export default function CartColumns() {
  return (
    <Wrapper>
      <div className="content">
        <h5>item</h5>
        <h5>preço</h5>
        <h5>quantidade</h5>
        <h5>subtotal</h5>
        <span />
      </div>
      <hr />
    </Wrapper>
  )
}
