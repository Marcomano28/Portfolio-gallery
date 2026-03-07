// InteractiveSketch.jsx
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Imag,
  Button,
  CanvasSection,
} from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
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
  const { theme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const sketchTheme = theme === 'dark' ? 'light' : 'dark';

  /* ── p5 instance lifecycle ──────────────────────────── */
  useEffect(() => {
    let rafId;
    let timeoutId;

    if (isActive && sketchRef.current) {
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
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isActive, sketchTheme, weatherData, scriptSrc]);

  /* ── Notify parent + scroll lock ────────────────────── */
  useEffect(() => {
    if (onFullScreenChange) {
      onFullScreenChange(isActive);
    }

    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive, onFullScreenChange]);

  /* ── ResizeObserver – resize canvas on fullscreen ───── */
  useEffect(() => {
    if (!sketchRef.current || !isActive) return;

    const resizeSketch = (width, height) => {
      if (!p5InstanceRef.current) return;
      p5InstanceRef.current.resizeCanvas(width, height);
      if (typeof p5InstanceRef.current.windowResized === 'function') {
        p5InstanceRef.current.windowResized();
        p5InstanceRef.current.resizeCanvas(width, height);
      }
      if (p5InstanceRef.current.canvas) {
        p5InstanceRef.current.canvas.style.width = `${width}px`;
        p5InstanceRef.current.canvas.style.height = `${height}px`;
        p5InstanceRef.current.canvas.style.display = 'block';
        p5InstanceRef.current.canvas.style.position = 'absolute';
        p5InstanceRef.current.canvas.style.inset = '0';
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
        p5InstanceRef.current.canvas.style.width = '';
        p5InstanceRef.current.canvas.style.height = '';
        p5InstanceRef.current.canvas.style.position = '';
        p5InstanceRef.current.canvas.style.inset = '';
      }
    };
  }, [isActive]);

  /* ── Button handler ─────────────────────────────────── */
  const handleButtonClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const preview = (
    <CanvasSection ref={containerRef} $isStarted={false}>
      <Imag
        src={src}
        alt="Interactive Image"
        style={{
          opacity: isActive ? 0 : 1,
          transition: 'opacity 1.5s',
        }}
      />
      {!isActive && (
        <Button id={buttonId} onClick={handleButtonClick}>
          run
        </Button>
      )}
    </CanvasSection>
  );

  const fullscreenSketch = (
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
    </div>
  );

  return (
    <>
      {preview}
      {isActive && typeof document !== 'undefined'
        ? createPortal(fullscreenSketch, document.body)
        : null}
    </>
  );
};
