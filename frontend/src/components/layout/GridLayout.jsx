import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Container, PanelNav, PanelText, PanelVideo, PanelSlides, DismissButton } from './GridLayoutStyled';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation.jsx';

export const GridLayout = ({ nav, headText, videoSection, slidswrapper, sketchStarted }) => {
  const isLandscapeMobile = useDeviceOrientation();
  const [slidesHidden, setSlidesHidden] = useState(false);
  const [overlayBounds, setOverlayBounds] = useState({ slides: null });
  const slidesRef = useRef(null);

  // Reset overlay visibility when sketch stops
  useEffect(() => {
    if (!sketchStarted) {
      setSlidesHidden(false);
    }
  }, [sketchStarted]);

  useLayoutEffect(() => {
    if (sketchStarted) return;

    const updateBounds = () => {
      const nextSlidesBounds = slidesRef.current?.getBoundingClientRect();

      setOverlayBounds({
        slides: nextSlidesBounds
          ? {
              top: nextSlidesBounds.top,
              left: nextSlidesBounds.left,
              width: nextSlidesBounds.width,
              height: nextSlidesBounds.height,
            }
          : null,
      });
    };

    updateBounds();
    const rafId = window.requestAnimationFrame(updateBounds);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
      window.cancelAnimationFrame(rafId);
    };
  }, [sketchStarted, isLandscapeMobile, headText, slidswrapper]);

  const overlayPanel = sketchStarted && typeof document !== 'undefined'
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
      {!sketchStarted && (
        <>
          {nav ? <PanelNav>{nav}</PanelNav> : null}
          <PanelText>{headText}</PanelText>
          <PanelSlides ref={slidesRef}>{slidswrapper}</PanelSlides>
        </>
      )}
      <PanelVideo $isLandscapeMobile={isLandscapeMobile} $isStarted={sketchStarted}>
        {videoSection}
      </PanelVideo>
      {overlayPanel}
    </Container>
  );
};


  
