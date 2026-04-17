import { useEffect, useRef, useContext, useCallback } from "react"
import { MyImgSketch, MiCanvas } from "./KeyCanvasStyled"
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import useResizeCheck from "../../../../utils/useResizeCheck";
import p5 from "p5";
 
 export const KeyCanvas = ({ sketch }) => {
    const canvasRef = useRef();
    const instanceRef = useRef(null);
    const {theme} = useContext(ThemeContext);
    
    const handleResize = useCallback((entries) => {
      const {width, height} = entries[0].contentRect;
      if(width <= 0 || height <= 0){
        return;
      }
      const sketchInstance = instanceRef.current;
      if(sketchInstance){
        if(typeof sketchInstance.windowResized === 'function'){
          sketchInstance.windowResized();
        } else {
          sketchInstance.resizeCanvas(width, height);
        }
      }
    }, []);

    useResizeCheck(canvasRef, handleResize);

    useEffect(() => {
      let mySketch = null;

      if(canvasRef.current){
        mySketch = new p5((p) => sketch(p, theme), canvasRef.current);
        instanceRef.current = mySketch;
        window.myP5Instance = mySketch;
        if(typeof mySketch.updateTheme === 'function'){
          mySketch.updateTheme(theme);
        }
      }

      return () => {
        if(mySketch){
          mySketch.remove();
        }
        if(instanceRef.current === mySketch){
          instanceRef.current = null;
        }
        if(window.myP5Instance === mySketch){
          window.myP5Instance = null;
        }
      };
    }, [sketch, theme]);

   return (
     <MyImgSketch>
        <MiCanvas ref={canvasRef} />
     </MyImgSketch>
   )
 }
 
