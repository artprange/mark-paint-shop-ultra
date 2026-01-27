import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <section className="section-center">
        <h3>Inscreva-se em nossa newsletter e receba 20% de desconto!</h3>

        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            corporis ducimus voluptates ex? Assumenda, eius?
          </p>
          <form
            className="contact-form"
            action="https://formspree.io/f/mdovbwor"
            method="POST"
          >
            <input
              type="email"
              className="form-input"
              placeholder="Digite seu email"
              name="email"
            ></input>
            <button type="submit" className="submit-btn">
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: #ffffff48;
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: #ffffff48;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
    font-weight: 500;
  }
  .submit-btn:hover {
    background: #ff5e0090;
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
