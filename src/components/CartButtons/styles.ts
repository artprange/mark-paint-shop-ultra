import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: #ffffff48;
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #ff5e00f1;
    /* width/height fixos com padding de 12px se contradiziam: o badge
       inflava para 40px e invadia o botão de login ao lado. */
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-size: 0.75rem;
    line-height: 1;
    color: var(--clr-white);
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: #ffffff48;
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
