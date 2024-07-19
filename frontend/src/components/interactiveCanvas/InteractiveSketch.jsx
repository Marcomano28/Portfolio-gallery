import { useContext, useEffect, useRef, useState} from 'react';
import { Imag, Button, CanvasSection, Canvas } from './InteractiveSketchStyled';
import { ThemeContext } from '../../contexts/ThemeProvider';
import p5 from 'p5';

export const InteractiveSketch = ({ src, buttonId, canvasId, weatherData, scriptSrc }) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [imageUrl, setImageUrl] = useState(null);
    const p5InstanceRef  = useRef(null);
    const sketchRef = useRef(null);
    const [sketchStarted, setSketchStarted] = useState(false); 
    const {theme} = useContext(ThemeContext);
    
    useEffect(() => {
        const fetchImageData = async (title) => {
            try {
                const response = await fetch(`${baseUrl}/imageurl/${title}`);
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.url;
            } catch (error) {
                console.error('Error fetching image data:', error);
                return null;
            }
        };
console.log(src);
        const loadImage = async () => {
            const url = await fetchImageData(src);
            setImageUrl(url);
        };

        if (src) {
            loadImage();
        }
    }, [src]);

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

    return (
        <CanvasSection>
             {imageUrl ? (
                <Imag src={imageUrl} alt="Interactive Image" style={{ opacity: sketchStarted ? 0 : 1, transition: 'opacity 1.5s' }} />
            ) : (
                <p>Loading image...</p>
            )}
            <Button id={buttonId} onClick={handleButtonClick}>{sketchStarted ? 'Stop' : 'Run'}</Button>
            <Canvas ref={sketchRef} id={canvasId} style={{display: sketchStarted ? 'block' : 'none' }} ></Canvas>
        </CanvasSection>
    );
};

