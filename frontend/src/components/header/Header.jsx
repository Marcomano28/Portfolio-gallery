import { StyledHeader, BgVideo, Title} from './HeaderStyles.jsx';
import videoSrc from '/media/galax.mp4';
import { useDynamicFontWeight } from '../../utils/FontDynamic.jsx';
export const Header = () => {
  const fontWeight = useDynamicFontWeight(500 ,1400 ,690 ,100);
  return (
        <StyledHeader>
          <BgVideo className='bg' autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
          </BgVideo>
          <Title id='heading' style={{fontWeight}}>
            Digita
          <span>l</span><span><span>D</span>reams</span>
          </Title>
        </StyledHeader> 
  )
}
