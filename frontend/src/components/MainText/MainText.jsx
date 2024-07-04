import { Section, Text, Intro, Span, IntroContainer} from "./MainTextStyled";
import { useDynamicFontWeight } from '../../utils/FontDynamic';

export const MainText = () => {
  const fontWeight = useDynamicFontWeight(400, 1200, 700, 170);

  return (
    <Section>
        <IntroContainer>
          <Intro>ArtByCode:</Intro>
          <Span style={{fontWeight}}>Exploring Digital Dreams</Span>
        </IntroContainer>
        <Text>As lines of code converge
                with the vivid landscapes of imagination, the Art of Coding Dreams opens
                new dimensions of storytelling, innovation, and wonder, inviting us to
                envision and construct the impossible with every keystroke. This process, it is kind of magical. You
                start with a
                blank screen, and then, bit by bit, you bring something new into existence. It is a journey full of
                challenges, but
                when you finally see your idea working, it is incredibly fulfilling. It is not just the satisfaction of
                solving a
                problem. It is the joy of creation.
                In this portfolio, you will see pieces of my journey. Each project is a story, a learning experience, a
                little part
                of my dream made real. These are not just demonstrations of skill. They are expressions of creativity,
                each line of
                code a brushstroke in larger picture.</Text>
    </Section>
  )
}
