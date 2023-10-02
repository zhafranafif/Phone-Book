import styled from '@emotion/styled'
import Button from './Button'
import { BsPersonCircle } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const NavbarStyled = styled.nav`
position: fixed;
z-index: 5;
width: 100%;
margin-bottom: 10px;
display: grid;
grid-template-columns: 1fr 2fr 1fr;
justify-items: center;
align-items: center;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
background-color: #e5e2e2;
`

const Navbar = () => {

  return (
    <NavbarStyled className='navbar-container'>
      <Link to='/'>
          <Button
              onClick={() => {}}
              icon={BsPersonCircle}
              />          
      </Link>
      <SearchBar />
      <Link to='form'>
      <Button onClick={() => {}} icon={AiOutlinePlus}/>
      </Link>
      </NavbarStyled>
  )
}

export default Navbar