import { Container, PanelNav, PanelText, PanelVideo, PanelSlides } from './GridLayoutStyled';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation.jsx';

export const GridLayout = ({ nav, headText, videoSection, slidswrapper }) => {
  const isLandscapeMobile = useDeviceOrientation();

  return (
   <Container $isLandscapeMobile={isLandscapeMobile}>
     {!isLandscapeMobile && (
       <>
         <PanelNav>{nav}</PanelNav>
         <PanelText>{headText}</PanelText>
         <PanelSlides>{slidswrapper}</PanelSlides>
       </>
     )}
     <PanelVideo $isLandscapeMobile={isLandscapeMobile}>{videoSection}</PanelVideo>
   </Container>
 );
};


  