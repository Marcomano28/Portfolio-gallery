
import { Container } from './GridContainerStyled'
import { useIsMobileDevice } from '../customHooks/useIsMobiledDevice'

export const GridContainer = ({children}) => {
  const { isMobileDevice, isLandscape }= useIsMobileDevice();

  return (
    <Container $isMobileDevice={isMobileDevice}>{children}</Container>
  )
}
