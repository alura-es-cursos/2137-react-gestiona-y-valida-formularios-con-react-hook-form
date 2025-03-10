import styled from 'styled-components'
import logo from './Logo.png'

const StyledImg = styled.img`
  margin-top: 1.5rem;
`

const Logo = () => {
  return <StyledImg src={logo} alt="Logo de Voll" />
}

export default Logo
