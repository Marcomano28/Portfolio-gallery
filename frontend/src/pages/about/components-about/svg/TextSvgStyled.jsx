import styled from "styled-components";

export const SvgContainer = styled.div`
      /* border: 2px solid green; */
        width:100%;
        display:flex;
        justify-content: flex-start;
        /* border: 2px solid black; */
      @media (min-width: 375px) {                
                
        }
      @media (min-width: 768px) {
        /* transform: scaleY(0.8) translateY(50px);  */
        }
      @media (min-width: 1024px) {
        order:3;          
        }
      @media (min-width: 1280px) {
        order:3;            
        }
      @media (min-width: 1440px) {
         order:3;
        } 
      @media (min-width: 2560px) {
         padding: 0.5rem 0.8rem;
       
        } 
      @media (min-width: 3840px) {
         padding: 0.6rem 0.9rem;
       
        } 
      @media (min-width: 4096px) {
         padding: 0.7rem 1rem;
       
        } 
`
export const Svg = styled.svg`
       display:block;
       z-index: 0;
       
       filter: drop-shadow( -10px 16px 16px rgba(59, 31, 35, 0.486));     
         /* background-color: #0c305b57;
         
       color:  #2697d9 ;  */
      /* -webkit-mask-image: linear-gradient(to top, transparent 15%, #f1895c 85%); */
      @media (min-width: 375px) {                
        transform: rotateX(180deg) scale(1.07, 0.7) translateY(50px);     
        order:1; 
        /* background-color:lightblue;  */
        defs {
        linearGradient {
        stop:first-child {
          stop-color: ${props => props.$startColor}; 
          stop-opacity: 1;
        }
        stop:last-child {
          stop-color: ${props => props.$endColor}; 
          stop-opacity: 1;
        }
       }
      }   
      }
      @media (min-width: 768px) {
      transform: rotateX(180deg) scaleY(0.7) scaleX(1.05) translateY(50px); 
    
      }
      @media (min-width: 1024px) {
        transform: rotateX(0deg) scaleY(0.8) translateY(-80px) translateX(-12px);
               
      }
      @media (min-width: 1280px) {
        transform: rotateX(0deg) scale(1) translateX(-20px) translateY(-50px);              
      }
      @media (min-width: 1440px) {
        width:100%;
        height:100%;
        /* border: 4px solid salmon; */
        transform-origin: top;
        transform: rotateX(0deg) scale(1) translateX(-25px) translateY(-60px); 
        filter: ${props => props.theme.svgShadow};      
      } 
`
export const Path = styled.path`
        fill:${props => props.theme.fill}; 
        stroke:${props => props.theme.stroke}; 
         
   
`