import { Wrapper } from './styles'

export default function Contact() {
  return (
    <Wrapper>
      <section className="section-center">
        <h3>Inscreva-se em nossa newsletter e receba 20% de desconto!</h3>

        <div className="content">
          <p>
            Avisamos quando abrimos agenda, e mandamos as peças que saíram da
            cabine no mês. Sem spam.
          </p>
          <form
            className="contact-form"
            action="https://formspree.io/f/mdovbwor"
            method="POST"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="form-input"
              placeholder="Digite seu email"
              name="email"
              required
            />
            <button type="submit" className="submit-btn">
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </Wrapper>
  )
}
