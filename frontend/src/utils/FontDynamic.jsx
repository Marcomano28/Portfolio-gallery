import { useEffect, useState } from "react";
import { calculateFontWeight } from "./Utils";

export const useDynamicFontWeight = (maxW ,minW ,maxWg ,minWg) => {
    const [fontWeight , setFontWeight] = useState(calculateFontWeight(maxW, minW, maxWg, minWg));
  useEffect(() => {
    const handleResize = () => {
        setFontWeight(calculateFontWeight(maxW, minW, maxWg, minWg));
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, [maxW, minW, maxWg, minWg]);
  return fontWeight;
  }