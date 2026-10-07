import styled from 'styled-components'

export const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-5);
    border-radius: var(--radius);
    padding: 1.5rem clamp(1rem, 4vw, 3rem);
    max-width: 100%;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  hr {
    border-color: var(--clr-grey-3);
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`
