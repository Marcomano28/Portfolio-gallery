import { Container, PanelNav, PanelText, PanelVideo, PanelSlides } from "./GridLayoutStyled"


export const GridLayout = ({nav, headText, videoSection, slidswrapper}) => {
  return (
    <Container>
        <PanelNav >
           {nav}
        </PanelNav>
        <PanelText >
           {headText}
        </PanelText>
        <PanelVideo >
           {videoSection}
        </PanelVideo>
        <PanelSlides >
           {slidswrapper}
        </PanelSlides>
    </Container>
  )
}
