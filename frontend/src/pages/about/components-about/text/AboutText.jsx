import { TextSvg } from "../svg/TextSvg";
import { FunnyText, KeyText, MainText, Span, AboutTextContainer, Button, InfoWrap} from "./AboutTextStyled";
import { useDynamicFontWeight } from '../../../../utils/FontDynamic';
import { TextParagraph } from '../comentary/TextParagraph';

export const AboutText = ({toggleModal}) => {

  const fontWeightH3 = useDynamicFontWeight(400, 1200, 700, 100);
  const fontWeight = useDynamicFontWeight(400, 1200, 900, 100);

  const ArtText = ({ text }) => {
    const characters = [...text].map((char, index) => (
      <Span key={index} style={{ '--index': index + 1 }}>{char}</Span>
    ));
    return <FunnyText style={{fontWeight}}>{characters}</FunnyText>;
  };
  
  return (
    <AboutTextContainer>
      <InfoWrap>
        <KeyText>
          <MainText style={{fontWeightH3}}>Developer & Designer</MainText>
          <ArtText text="with an artistic twist"/>
        </KeyText>
        <TextParagraph/>
        <TextSvg/>
        <Button onClick={toggleModal}>Let&apos;s Talk</Button>
      </InfoWrap>  
    </AboutTextContainer>
  );
};
