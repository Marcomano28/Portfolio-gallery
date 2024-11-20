import { Window } from '../../components/window/Window'
import { WindowContainer } from './GenericPageStyled'
import { useIsMobileDevice } from '../customHooks/useIsMobiledDevice'

export const GenericPage = ({ windowData }) => {
  const { isMobileDevice, isLandscape }= useIsMobileDevice();
  return (
    <WindowContainer $isMobileDevice={isMobileDevice}>
        { windowData.map(window =>(
            <Window 
               key={window.id}
               showNav={window.showNav}
               headText={window.headText}
               videoData={window.videoData}
               slidesData={window.slidesData}
               id={window.id}
               VideoComponent={window.videoComponent}
             />
        ))}
    </WindowContainer>
  )
}
