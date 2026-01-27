import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/markCofre.png'

const AboutPage = () => {
  return (
    <main>
      <PageHero title="Sobre" />
      <Wrapper className="page sction section-center">
        <img src={aboutImg} alt="blue mica" />
        <article>
          <div className="title">
            <h2> Minha história</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero id,
            molestiae tempore, dignissimos commodi laudantium, quidem rerum
            magnam quasi molestias beatae officia porro ex numquam perferendis
            magni maiores a nemo sed aliquid dolor? Architecto iste doloribus
            non eaque quia reiciendis delectus recusandae. Officiis alias enim
            illum, sequi quaerat vero id.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: #ffffff48;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
