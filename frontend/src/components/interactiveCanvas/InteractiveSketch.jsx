import { useContext, useEffect, useRef, useState} from 'react';
import { Imag, Button, CanvasSection, Canvas } from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { ImageContext } from '../../contexts/ImageContext';
import p5 from 'p5';

export const InteractiveSketch = ({ src, buttonId, canvasId, weatherData, scriptSrc }) => {

    const { images, loading, error } = useContext(ImageContext);
    const p5InstanceRef  = useRef(null);
    const sketchRef = useRef(null);
    const [sketchStarted, setSketchStarted] = useState(false); 
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        if (sketchStarted && sketchRef.current) {
            if (!p5InstanceRef.current) {
                p5InstanceRef.current = new p5((p) => scriptSrc(p, theme, weatherData), sketchRef.current);
            }else {
                p5InstanceRef.current.updateWeatherData(weatherData);
              }
            // Siempre actualiza el tema inmediatamente después de instanciar o cuando cambia el tema
            if (p5InstanceRef.current.updateTheme) {
                p5InstanceRef.current.updateTheme(theme);
            }
    
            return () => {
                if (p5InstanceRef.current) {
                    p5InstanceRef.current.remove();
                    p5InstanceRef.current = null;
                }
            };
        }
    }, [sketchStarted, theme, weatherData]);

    const handleButtonClick = () => {
        setSketchStarted(!sketchStarted);
    };

    if (loading) return <div>Loading images...</div>;
    if (error) return <div>Error loading images: {error}</div>;
    if (!images[src]) return <div>No image found</div>;

    return (
        <CanvasSection>
            <Imag src={`data:image/jpeg;base64,${images[src]}`} alt="Interactive Image" style={{ opacity: sketchStarted ? 0 : 1, transition: 'opacity 1.5s' }}/>
            <Button id={buttonId} onClick={handleButtonClick}>{sketchStarted ? 'Stop' : 'Run'}</Button>
            <Canvas ref={sketchRef} id={canvasId} style={{display: sketchStarted ? 'block' : 'none' }} ></Canvas>
        </CanvasSection>
    );
};

