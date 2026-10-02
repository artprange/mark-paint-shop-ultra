import styled from 'styled-components'

export const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input,
  .company {
    /* Fundo claro em tema escuro: o texto precisa ser escuro explicitamente,
       senão herda a cor clara do body e some. */
    background: var(--clr-grey-10);
    color: var(--clr-grey-1);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input {
    padding: 0.5rem;
  }
  .search-input::placeholder {
    text-transform: capitalize;
    color: var(--clr-grey-5);
  }
  .company {
    padding: 0.25rem;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: #ffffff80;
    cursor: pointer;
  }
  .active {
    border-color: #ff5e00f1;
    opacity: 1;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  /* Era '.all-btn .active' — seletor descendente, nunca casava: a classe
     está no próprio botão, não num filho. */
  .all-btn.active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
