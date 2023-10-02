import styled from '@emotion/styled'
import { MoonLoader } from 'react-spinners'

const StyledLoader = styled.div(`
display: flex;
flex-direction: flex-column;
justify-content: center;
align-items: center;
`)

const Loader = () => {
  return (
      <StyledLoader>
          {<MoonLoader
             size={100}
              color='#03AC0E'
          />}
      </StyledLoader>
  )
}

export default Loader