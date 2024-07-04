import { Slide } from "./Slide"
import { CardSlide} from "./SliderStyled"


export const Slider = ({slides, windowId}) => {

  return (    
       <CardSlide>
         {slides.map((slide)=>(
          <Slide key={`slide-${slide.icon}-${windowId}`}  content={slide} windowId={windowId} />
         ))}
       </CardSlide>
     
  )
}
