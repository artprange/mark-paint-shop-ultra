import { FaPlus, FaMinus } from 'react-icons/fa'

import { Wrapper } from './styles'
import type { AmountButtonsProps } from './types'

export default function AmountButtons({
  increase,
  decrease,
  amount,
}: AmountButtonsProps) {
  return (
    <Wrapper className="amount-btns">
      <button type="button" className="amount-btn" onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button type="button" className="amount-btn" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  )
}
