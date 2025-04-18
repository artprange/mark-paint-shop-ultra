import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = ({ title }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to={'/'}>Home</Link>/ {title}
        </h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: #222;
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: #232728;
  a {
    color: #fffff48;
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: #ffffff48;
  }
  a:visited {
    color: gray;
  }
  h3 {
    color: #ffffff48;
  }
`

export default PageHero
