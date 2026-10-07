import { services } from '../../utils/constants'
import { Wrapper } from './styles'

export default function Services() {
  return (
    <Wrapper>
      <div className="section-center">
        <article className="header">
          <h3>
            Pinturas personalizadas <br />
            para sua aventura
          </h3>
          <p>
            Cada peça passa pelas mesmas etapas: decapagem, correção das
            imperfeições, pintura e verniz. O que muda é o acabamento que você
            escolhe no fim.
          </p>
        </article>
        <div className="services-center">
          {services.map(({ id, icon, title, text }) => (
            <article key={id} className="service">
              <span className="icon">{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}
