import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
max-width: 1920px;
margin-left: 50px;
margin-right: 50px;
padding-top: 7rem;


@media (min-width : 390px){
  padding-top: 5rem;
}
`

interface ContainerProps {
    children: React.ReactNode
}

const Containers: React.FC<ContainerProps> = ({children}) => {
  return (
      <Container>
        {children}
    </Container>
  )
}

export default Containers