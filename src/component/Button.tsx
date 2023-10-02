import styled from "@emotion/styled"
import { IconType } from "react-icons"
import { css } from '@emotion/react'


type ButtonColor = "red" | "pink"

interface ButtonProps {
    outline?: boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    icon?: IconType
    color?: ButtonColor
    hoverColor?: ButtonColor
}
const ButtonStyle = styled.button`
background-color: inherit;
margin-block-start: 2rem;
margin-block-end: 2rem;
border: none;
cursor: pointer;

@keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
  
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  &:hover {
  animation: shake 0.92s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  }
`
const Button: React.FC<ButtonProps> = ({
    outline,
    onClick,
    icon: Icon,
    color,
    hoverColor
}) => {
  return (
      <ButtonStyle onClick={onClick}>
          {Icon && (
        <Icon
                  size={24}
                  color={color}
          />
          )}
    </ButtonStyle>
  )
}

export default Button