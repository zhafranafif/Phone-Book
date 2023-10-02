import styled from "@emotion/styled"
import PhoneBookLogo from "../assets/Logo-PhoneBook.png"
const ImageLogo = styled.img`
width: 50px;
height: 50px;
`

const Logo = () => {
  return (
      <ImageLogo
          alt="Logo"
      src={PhoneBookLogo}
      />
      
  )
}

export default Logo