import { useState, useEffect } from "react";

export const useIsMobileDevice = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
        const isMobilOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
        setIsMobileDevice(isMobilOrTablet);
    };
        const checkOrientation = () => {
          setIsLandscape(window.orientation === 90 || window.orientation === -90);
        }
        checkDevice();
        checkOrientation();
         window.addEventListener('orientationchange', checkOrientation);
         return () => window.removeEventListener('orientationchange',checkOrientation);
    },[]);

    return { isMobileDevice, isLandscape };
};