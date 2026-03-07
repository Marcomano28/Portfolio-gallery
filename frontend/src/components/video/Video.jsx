import { useRef, useEffect } from "react";
import { ScreenContainer, Title, Title1, Title2, Title3, Title4, Text, SomeVideo, Pane } from "./VideoStyled"
import PropTypes from 'prop-types';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation';

export const Video = ({ src, title, title1, title2, title3, title4}) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const isLandscapeMobile = useDeviceOrientation();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current || !videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

  return (
    <>
        {isLandscapeMobile ? (
          <ScreenContainer ref={containerRef} $isLandscapeMobile={isLandscapeMobile}>
            <Pane></Pane>
            <SomeVideo ref={videoRef} src={src} controls>
            </SomeVideo>
          </ScreenContainer>
        ) : (
          <>
            <ScreenContainer ref={containerRef}>
             <Pane></Pane>
             <SomeVideo ref={videoRef} src={src} controls>
             </SomeVideo>
            </ScreenContainer>
            <Text>
             {title && <Title>{title}</Title>}
             {title1 && <Title1>{title1}</Title1>}
             {title2 && <Title2>{title2}</Title2>}
             {title3 && <Title3>{title3}</Title3>}
             {title4 && <Title4>{title4}</Title4>}            
            </Text>
         </>
        )}
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
