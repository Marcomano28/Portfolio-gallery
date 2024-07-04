import { Window } from '../../components/window/Window'
import { WindowContainer } from './GenericPageStyled'

export const GenericPage = ({ windowData }) => {
  return (
    <WindowContainer>
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
