import { useEffect, useRef, useContext } from "react"
import { MyImgSketch, MiCanvas } from "./KeyCanvasStyled"
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import useResizeCheck from "../../../../utils/useResizeCheck";
import p5 from "p5";
 
 export const KeyCanvas = ({ sketch }) => {
    const canvasRef = useRef();
    const {theme} = useContext(ThemeContext);
    
    useResizeCheck(canvasRef ,(entries) => {
      const {width, height} = entries[0].contentRect;
      if(window.myP5Instance){
        window.myP5Instance.resizeCanvas(width, height);
      }
    });
    useEffect(() => {
      if(canvasRef.current){
        let mySketch = new p5((p) => sketch(p, theme), canvasRef.current);
        window.myP5Instance = mySketch;
        mySketch.updateTheme(theme);
      }
       return () => {
            // canvas.remove();
        };
    },[sketch]);

   return (
     <MyImgSketch>
        <MiCanvas ref={canvasRef} />
     </MyImgSketch>
   )
 }
 