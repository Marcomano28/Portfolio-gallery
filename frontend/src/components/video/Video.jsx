import { useRef, useEffect } from "react";
import { ScreenContainer, Title, Title1, Title2, Title3, Title4, SomeVideo, Pane } from "./VideoStyled"
import PropTypes from 'prop-types';
export const Video = ({ src, title, title1, title2, title3, title4}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    }, []);
  return (
    <>
        <ScreenContainer>
            <Pane></Pane>
            <SomeVideo ref={videoRef} src={src} controls>
            </SomeVideo>
        </ScreenContainer>
        <div>
            {title && <Title>{title}</Title>}
            {title1 && <Title1>{title1}</Title1>}
            {title2 && <Title2>{title2}</Title2>}
            {title3 && <Title3>{title3}</Title3>}
            {title4 && <Title4>{title4}</Title4>}            
        </div>
    </>
  )
};
Video.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    title1: PropTypes.string,
    title2: PropTypes.string,
    title3: PropTypes.string,
    title4: PropTypes.string,
};
