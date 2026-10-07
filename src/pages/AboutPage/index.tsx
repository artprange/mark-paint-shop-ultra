import PageHero from '../../components/PageHero'
import aboutImg from '../../assets/markCofre.webp'
import { Wrapper } from './styles'

export default function AboutPage() {
  return (
    <main>
      <PageHero title="sobre" />

      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="Peça pintada em azul mica" />
        <article>
          <div className="title">
            <h2>Minha história</h2>
            <div className="underline" />
          </div>
          <p>
            A Mark Paint Shop nasceu da vontade de fazer pintura de peça do
            jeito certo: sem atalho na preparação, sem adesivo fingindo ser
            pintura, sem verniz que amarela no primeiro verão. Cada peça que
            entra aqui passa por decapagem, correção das imperfeições, pintura
            e acabamento — e só sai quando está como eu gostaria de receber.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}
