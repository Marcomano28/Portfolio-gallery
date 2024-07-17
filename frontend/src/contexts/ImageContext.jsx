import { createContext, useState, useEffect } from "react";

export const ImageContext = createContext();
const baseUrl = import.meta.env.VITE_API_URL;

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(baseUrl);
        const fetchImages = async () => {
            try {
                const responses = await Promise.all([
                    fetch(`${baseUrl}/ima/miImagen`),
                    fetch(`${baseUrl}/ima/miImagen1`),
                    fetch(`${baseUrl}/ima/miImagen4`),
                    fetch(`${baseUrl}/ima/miImagen5`),
                    fetch(`${baseUrl}/ima/miImagen6`),
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