import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        <CustomLink
          className="link"
          to="https://www.facebook.com/mark.paint.shop"
        >
          <FaFacebook />
        </CustomLink>
        <CustomLink
          className="link"
          to="https://www.instagram.com/markpaintshop/"
        >
          <FaInstagram />
        </CustomLink>
        <CustomLink className="link" to="https://wa.me/<5511986667681>">
          <FaWhatsapp />
        </CustomLink>
        {new Date().getFullYear()}
        <span> Mark Paint Shop </span>
        <h5>Todos os direitos reservados</h5>
      </h5>
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  height: 5rem;
  display: flex;

  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;

  h5 {
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

  @media (min-width: 776px) {
    flex-direction: row;
  }

  span {
    padding: 1.5rem;
  }
`

const CustomLink = styled(Link)`
  color: #ff5e00f1;
  text-decoration: none;

  padding-right: 3rem;

  &:hover {
    text-decoration: underline;
  }
`

export default Footer
