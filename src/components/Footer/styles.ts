import styled from 'styled-components'

export const Wrapper = styled.footer`
  min-height: 5rem;
  padding: 1.5rem 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;

  .credits,
  .social-links,
  .copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }
  .credits {
    color: var(--clr-white);
    font-weight: 400;
    line-height: 1.5;
    font-size: 0.9rem;
  }
  .copyright {
    column-gap: 0.75rem;
  }
  @media (max-width: 575px) {
    .credits,
    .copyright {
      flex-direction: column;
    }
  }
`

export const SocialLink = styled.a`
  color: #ff5e00f1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;

  &:hover {
    color: var(--clr-white);
  }
`
