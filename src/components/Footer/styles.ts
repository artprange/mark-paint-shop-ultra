import styled from 'styled-components'

export const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;

  .credits {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.9rem;
  }

  span {
    padding: 1.5rem;
  }

  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export const SocialLink = styled.a`
  color: #ff5e00f1;
  text-decoration: none;
  padding-right: 3rem;

  &:hover {
    text-decoration: underline;
  }
`
