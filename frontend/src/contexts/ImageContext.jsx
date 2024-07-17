import { createContext, useState, useEffect } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const responses = await Promise.all([
                    fetch('http://localhost:4000/api/ima/miImagen'),
                    fetch('http://localhost:4000/api/ima/miImagen1'),
                    fetch('http://localhost:4000/api/ima/miImagen4'),
                    fetch('http://localhost:4000/api/ima/miImagen5'),
                    fetch('http://localhost:4000/api/ima/miImagen6'),
                ]);
                const images = await Promise.all(responses.map(res => {
                    if (res.ok) return res.text(); // Asumiendo base64
                    console.log(res);
                    throw new Error('Network response was not ok.');
                }));
                setImages(images);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);
    
    return (
        <ImageContext.Provider value={{ images, loading, error }}>
            {children}
        </ImageContext.Provider>
    );
}