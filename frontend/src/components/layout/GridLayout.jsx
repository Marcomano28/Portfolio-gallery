import { cloneElement, isValidElement, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Container, PanelNav, PanelText, PanelVideo, PanelSlides, DismissButton } from './GridLayoutStyled';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation.jsx';

export const GridLayout = ({ nav, headText, videoSection, slidswrapper, sketchFullscreen }) => {
  const isLandscapeMobile = useDeviceOrientation();
  const [slidesHidden, setSlidesHidden] = useState(false);
  const [overlayBounds, setOverlayBounds] = useState({ slides: null });
  const slidesRef = useRef(null);

  const updateOverlayBounds = useCallback(() => {
    const nextSlidesBounds = slidesRef.current?.getBoundingClientRect();
    const nextSlides = nextSlidesBounds
      ? {
          top: nextSlidesBounds.top,
          left: nextSlidesBounds.left,
          width: nextSlidesBounds.width,
          height: nextSlidesBounds.height,
        }
      : null;

    setOverlayBounds((prev) => {
      const current = prev.slides;
      const sameBounds =
        (!current && !nextSlides) ||
        (current &&
          nextSlides &&
          Math.abs(current.top - nextSlides.top) < 0.5 &&
          Math.abs(current.left - nextSlides.left) < 0.5 &&
          Math.abs(current.width - nextSlides.width) < 0.5 &&
          Math.abs(current.height - nextSlides.height) < 0.5);

      return sameBounds ? prev : { slides: nextSlides };
    });
  }, []);

  // Reset overlay visibility when sketch stops
  useEffect(() => {
    if (!sketchFullscreen) {
      setSlidesHidden(false);
    }
  }, [sketchFullscreen]);

  useLayoutEffect(() => {
    if (sketchFullscreen) return;

    updateOverlayBounds();
    const rafId = window.requestAnimationFrame(updateOverlayBounds);
    window.addEventListener('resize', updateOverlayBounds);

    return () => {
      window.removeEventListener('resize', updateOverlayBounds);
      window.cancelAnimationFrame(rafId);
    };
  }, [sketchFullscreen, isLandscapeMobile, headText, slidswrapper, updateOverlayBounds]);

  const videoSectionWithOverlayCapture = isValidElement(videoSection)
    ? cloneElement(videoSection, { onBeforeFullscreen: updateOverlayBounds })
    : videoSection;

  const overlayPanel = sketchFullscreen && typeof document !== 'undefined'
    ? createPortal(
        <>
          {overlayBounds.slides && (
            <div
              style={{
                position: 'fixed',
                top: `${overlayBounds.slides.top}px`,
                left: `${overlayBounds.slides.left}px`,
                width: `${overlayBounds.slides.width}px`,
                height: `${overlayBounds.slides.height}px`,
                zIndex: 10000,
                opacity: slidesHidden ? 0 : 1,
                filter: slidesHidden ? 'blur(10px) saturate(0.65)' : 'blur(0) saturate(1)',
                transform: slidesHidden ? 'translateY(18px) scale(0.985)' : 'translateY(0) scale(1)',
                pointerEvents: slidesHidden ? 'none' : 'auto',
                transition: 'opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease',
              }}
            >
              <PanelSlides style={{ paddingTop: 0, width: '100%', height: '100%' }}>
                {slidswrapper}
              </PanelSlides>
            </div>
          )}
          <DismissButton
            onClick={() => setSlidesHidden((prev) => !prev)}
            aria-label={slidesHidden ? 'Show overlay panel' : 'Hide overlay panel'}
            title={slidesHidden ? 'Show panel' : 'Hide panel'}
          >
            X
          </DismissButton>
        </>,
        document.body
      )
    : null;

  return (
    <Container $isLandscapeMobile={isLandscapeMobile}>
      {!sketchFullscreen && (
        <>
          {nav ? <PanelNav>{nav}</PanelNav> : null}
          <PanelText>{headText}</PanelText>
          <PanelSlides ref={slidesRef}>{slidswrapper}</PanelSlides>
        </>
      )}
      <PanelVideo $isLandscapeMobile={isLandscapeMobile} $isStarted={sketchFullscreen}>
        {videoSectionWithOverlayCapture}
      </PanelVideo>
      {overlayPanel}
    </Container>
  );
};


  
