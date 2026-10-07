import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  width: max-content;
  max-width: 100%;

  .cart-btn {
    color: #ffffff48;
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
    min-height: 2.75rem;
    white-space: nowrap;
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
