// InteractiveSketch.jsx
import { useContext, useEffect, useRef, useState } from 'react';
import { Imag, Button, CanvasSection, Canvas } from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation';
import p5 from 'p5';

export const InteractiveSketch = ({
  src,
  buttonId,
  canvasId,
  weatherData,
  scriptSrc,
}) => {
  const p5InstanceRef = useRef(null);
  const sketchRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isLandscapeMobile = useDeviceOrientation();
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (isActive && isVisible && sketchRef.current) {
      if (!p5InstanceRef.current) {
        p5InstanceRef.current = new p5(
          (p) => scriptSrc(p, theme, weatherData),
          sketchRef.current
        );
      } else {
        if (p5InstanceRef.current.updateWeatherData) {
          p5InstanceRef.current.updateWeatherData(weatherData);
        }
      }

      if (p5InstanceRef.current.updateTheme) {
        p5InstanceRef.current.updateTheme(theme);
      }
    } else if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
  }, [isActive, isVisible, theme, weatherData, scriptSrc]);

  const handleButtonClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  useEffect(() => {
    if (!isVisible && isActive) {
      setIsActive(false);
    }
  }, [isVisible, isActive]);

  return (
    <CanvasSection ref={containerRef}>
      <Imag
        src={src}
        alt="Interactive Image"
        style={{
          opacity: isActive ? 0 : 1,
          transition: 'opacity 1.5s',
        }}
      />
      <Button id={buttonId} onClick={handleButtonClick}>
        {isActive ? 'Stop' : 'Run'}
      </Button>
      <Canvas
        ref={sketchRef}
        id={canvasId}
        style={{ display: isActive ? 'block' : 'none' }}
        $isLandscapeMobile={isLandscapeMobile}
      ></Canvas>
    </CanvasSection>
  );
};
