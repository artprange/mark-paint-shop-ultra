import styled from 'styled-components'

export const Wrapper = styled.section`
  background: #222;
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  a {
    color: #ffffff80;
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-white);
  }
  h3 {
    color: #ffffff48;
  }
  .separator {
    padding: 0 0.5rem;
  }
`
