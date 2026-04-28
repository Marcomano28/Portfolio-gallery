// InteractiveSketch.jsx
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
  Imag,
  Button,
  CanvasSection,
  Canvas,
  FullscreenButton,
} from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation';
import { Maximize2, Minimize2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const isLandscapeMobile = useDeviceOrientation();
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
      if (typeof p5InstanceRef.current.windowResized === 'function') {
        p5InstanceRef.current.windowResized();
      } else {
        p5InstanceRef.current.resizeCanvas(width, height);
      }
      if (p5InstanceRef.current.canvas) {
        p5InstanceRef.current.canvas.style.display = 'block';
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
      }
    };
  }, [isActive, isFullscreen]);

  /* ── Button handler ─────────────────────────────────── */
  const handleButtonClick = useCallback(() => {
    setIsActive((prev) => {
      const nextIsActive = !prev;
      if (!nextIsActive) {
        setIsFullscreen(false);
      }
      return nextIsActive;
    });
  }, []);

  const handleFullscreenClick = useCallback(() => {
    setIsActive(true);
    setIsFullscreen((prev) => !prev);
  }, []);

  return (
    <CanvasSection ref={containerRef} $isFullscreen={isFullscreen}>
      <Imag
        src={src}
        alt="Interactive Image"
        style={{
          opacity: isActive ? 0 : 1,
          transition: 'opacity 1.5s',
        }}
      />
      <Canvas
        ref={sketchRef}
        id={canvasId}
        style={{ display: isActive ? 'block' : 'none' }}
        $isLandscapeMobile={isLandscapeMobile}
        $isFullscreen={isFullscreen}
      />
      <Button
        id={buttonId}
        type="button"
        onClick={handleButtonClick}
        $isFullscreen={isFullscreen}
      >
        {isActive ? 'stop' : 'run'}
      </Button>
      <FullscreenButton
        type="button"
        onClick={handleFullscreenClick}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Open fullscreen'}
        title={isFullscreen ? 'Exit fullscreen' : 'Open fullscreen'}
        $isFullscreen={isFullscreen}
      >
        {isFullscreen ? <Minimize2 size={15} strokeWidth={1.8} /> : <Maximize2 size={15} strokeWidth={1.8} />}
      </FullscreenButton>
    </CanvasSection>
  );
};
