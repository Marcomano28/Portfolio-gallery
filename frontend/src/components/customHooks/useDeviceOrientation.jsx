import { useState, useLayoutEffect } from "react";

export const useDeviceOrientation = () => {
    const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);

    useLayoutEffect(() => {
        let mounted = true;
        let timeoutId = null;

        const isTouchDevice = () => {
            return (
                'ontouchstart' in window || 
                navigator.maxTouchPoints > 0 || 
                window.matchMedia('(pointer: coarse)').matches ||
                // Helpers para desarrollo
                (process.env.NODE_ENV === 'development' && 
                 window.matchMedia('(hover: none)').matches)
            );
        };

        const isLandscape = () => {
            return window.matchMedia('(orientation: landscape)').matches &&
                   window.innerWidth > window.innerHeight;
        };

        const handleOrientationChange = () => {
            if (!mounted) return;
            
            const update = () => {
                if (mounted) {
                    setIsLandscapeMobile(isTouchDevice() && isLandscape());
                }
            };

            // Actualizaciones escalonadas para mejor estabilidad
            update();
            setTimeout(update, 50);
            setTimeout(update, 150);
        };

        const debouncedHandler = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(handleOrientationChange, 100);
        };

        // Listeners principales
        window.addEventListener('resize', debouncedHandler, { passive: true });
        window.addEventListener('orientationchange', debouncedHandler, { passive: true });

        // Configuración inicial
        handleOrientationChange();

        return () => {
            mounted = false;
            if (timeoutId) clearTimeout(timeoutId);
            window.removeEventListener('resize', debouncedHandler);
            window.removeEventListener('orientationchange', debouncedHandler);
        };
    }, []);

    return isLandscapeMobile;
};