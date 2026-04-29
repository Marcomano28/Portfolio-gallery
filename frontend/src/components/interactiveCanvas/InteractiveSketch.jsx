// InteractiveSketch.jsx
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Imag,
  Button,
  CanvasSection,
  Canvas,
  FullscreenButton,
} from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation';
import { Maximize2 } from 'lucide-react';
import p5 from 'p5';

export const InteractiveSketch = ({
  src,
  buttonId,
  canvasId,
  weatherData,
  scriptSrc,
  onFullScreenChange,
}) => {
  const p5InstanceRef = useRef(null);
  const sketchRef = useRef(null);
  const mountedNodeRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const isLandscapeMobile = useDeviceOrientation();
  const sketchTheme = theme === 'dark' ? 'light' : 'dark';

  const removeSketchInstance = useCallback(() => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
    mountedNodeRef.current = null;
  }, []);

  /* ── p5 instance lifecycle ──────────────────────────── */
  useEffect(() => {
    let rafId;
    let timeoutId;

    if (isActive && sketchRef.current) {
      if (p5InstanceRef.current && mountedNodeRef.current !== sketchRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
        mountedNodeRef.current = null;
      }

      if (!p5InstanceRef.current) {
        const mountSketch = () => {
          if (!sketchRef.current || p5InstanceRef.current) return;
          const { width, height } = sketchRef.current.getBoundingClientRect();
          if (width <= 0 || height <= 0) {
            timeoutId = window.setTimeout(mountSketch, 60);
            return;
          }

          p5InstanceRef.current = new p5(
            (p) => scriptSrc(p, sketchTheme, weatherData),
            sketchRef.current
          );
          mountedNodeRef.current = sketchRef.current;
        };

        rafId = window.requestAnimationFrame(mountSketch);
      } else {
        if (p5InstanceRef.current.updateWeatherData) {
          p5InstanceRef.current.updateWeatherData(weatherData);
        }

        if (p5InstanceRef.current.updateTheme) {
          p5InstanceRef.current.updateTheme(sketchTheme);
        }
      }
    } else if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
      mountedNodeRef.current = null;
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isActive, isFullscreen, sketchTheme, weatherData, scriptSrc]);

  /* ── Notify parent + scroll lock ────────────────────── */
  useEffect(() => {
    if (onFullScreenChange) {
      onFullScreenChange(isFullscreen);
    }

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, onFullScreenChange]);

  /* ── ResizeObserver – resize canvas on run/fullscreen ─ */
  useEffect(() => {
    if (!sketchRef.current || !isActive) return;

    const resizeSketch = (width, height) => {
      if (!p5InstanceRef.current) return;
      p5InstanceRef.current.resizeCanvas(width, height);
      if (typeof p5InstanceRef.current.windowResized === 'function') {
        p5InstanceRef.current.windowResized();
        p5InstanceRef.current.resizeCanvas(width, height);
      } else {
        p5InstanceRef.current.resizeCanvas(width, height);
      }
      if (p5InstanceRef.current.canvas) {
        p5InstanceRef.current.canvas.style.width = `${width}px`;
        p5InstanceRef.current.canvas.style.height = `${height}px`;
        p5InstanceRef.current.canvas.style.display = 'block';
        if (isFullscreen) {
          p5InstanceRef.current.canvas.style.position = 'absolute';
          p5InstanceRef.current.canvas.style.inset = '0';
        }
      }
    };

    const applyContainerSize = () => {
      if (!sketchRef.current) return;
      const { width, height } = sketchRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) resizeSketch(width, height);
    };

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        resizeSketch(width, height);
      }
    });

    ro.observe(sketchRef.current);
    applyContainerSize();
    const rafId = window.requestAnimationFrame(applyContainerSize);
    const timeoutId = window.setTimeout(applyContainerSize, 120);
    window.addEventListener('resize', applyContainerSize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', applyContainerSize);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      if (p5InstanceRef.current?.canvas) {
        p5InstanceRef.current.canvas.style.display = '';
        p5InstanceRef.current.canvas.style.position = '';
        p5InstanceRef.current.canvas.style.inset = '';
        p5InstanceRef.current.canvas.style.width = '';
        p5InstanceRef.current.canvas.style.height = '';
      }
    };
  }, [isActive, isFullscreen]);

  /* ── Button handler ─────────────────────────────────── */
  const handleButtonClick = useCallback(() => {
    if (isActive) {
      removeSketchInstance();
      setIsFullscreen(false);
      setIsActive(false);
      return;
    }

    setIsActive(true);
  }, [isActive, removeSketchInstance]);

  const handleFullscreenClick = useCallback(() => {
    removeSketchInstance();
    setIsActive(true);
    setIsFullscreen(true);
  }, [removeSketchInstance]);

  const fullscreenSketch = isFullscreen && typeof document !== 'undefined'
    ? createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            zIndex: 9999,
          }}
        >
          <button
            id={buttonId}
            type="button"
            onClick={handleButtonClick}
            style={{
              position: 'fixed',
              top: '0.9rem',
              right: '1rem',
              zIndex: 10025,
              minWidth: '64px',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(240, 240, 240, 0.26)',
              backgroundColor: 'rgba(10, 10, 10, 0.34)',
              color: 'rgba(242, 242, 242, 0.85)',
              fontSize: '0.72rem',
              fontWeight: 500,
              lineHeight: 1,
              textTransform: 'lowercase',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.24)',
              backdropFilter: 'blur(5px)',
              cursor: 'pointer',
            }}
          >
            stop
          </button>
          <div
            ref={sketchRef}
            id={canvasId}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
            }}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <CanvasSection ref={containerRef}>
        <Imag
          src={src}
          alt="Interactive Image"
          style={{
            opacity: isActive ? 0 : 1,
            transition: 'opacity 1.5s',
          }}
        />
        {!isFullscreen && (
          <Canvas
            ref={sketchRef}
            id={canvasId}
            $isActive={isActive}
            $isLandscapeMobile={isLandscapeMobile}
          />
        )}
        {!isFullscreen && (
          <Button id={buttonId} type="button" onClick={handleButtonClick}>
            {isActive ? 'stop' : 'run'}
          </Button>
        )}
        {!isFullscreen && (
          <FullscreenButton
            type="button"
            onClick={handleFullscreenClick}
            aria-label="Open fullscreen"
            title="Open fullscreen"
          >
            <Maximize2 size={15} strokeWidth={1.8} />
          </FullscreenButton>
        )}
      </CanvasSection>
      {fullscreenSketch}
    </>
  );
};
