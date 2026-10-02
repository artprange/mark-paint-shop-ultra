import { Link } from 'react-router-dom'

import heroBcg from '../../assets/voando_hero.png'
import heroBcg2 from '../../assets/mark_pistola_hero.png'
import { Wrapper } from './styles'

export default function Hero() {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h2>
          Adrenalina & <br />
        </h2>
        <h1>pintura</h1>
        <p>
          Preparação e pintura de peças sob medida — rodas, pinças, quadros,
          capacetes e componentes de motor. Cada peça passa por decapagem,
          correção e acabamento em verniz automotivo.
        </p>
        <Link to="/products" className="btn hero-btn">
          ver loja
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="voando" className="main-img" />
        <img src={heroBcg2} alt="segurando a pistola" className="accent-img" />
      </article>
    </Wrapper>
  )
}
