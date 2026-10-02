import { Link } from 'react-router-dom'

import { Wrapper } from './styles'

export default function ErrorPage() {
  return (
    <Wrapper className="page-100">
      <section>
        <h1>EiTA!</h1>
        <h4>Página não encontrada</h4>
        <Link to="/" className="btn">
          voltar para a home
        </Link>
      </section>
    </Wrapper>
  )
}
