import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper className="page-100">
      <section>
        <h1>EiTA!</h1>
        <h4>Página não encontrada</h4>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: #232728;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 10rem;
    color: #ff5e00f1;
  }
  h4 {
    text-transform: none;
    margin-bottom: 2rem;
    color: #ff5e00f1;
  }
`;

export default ErrorPage;
