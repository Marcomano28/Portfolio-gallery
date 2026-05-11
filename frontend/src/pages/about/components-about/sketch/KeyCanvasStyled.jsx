import styled from "styled-components";

export const MyImgSketch = styled.div`
            position: relative;
            /* grid-column:1; */
            grid-row:1;
            border-radius: 50%;
            padding: 0.2rem;
            /* margin-left:9rem; */
            z-index:1;
            box-shadow:${props => props.theme.modalBxShadow};
         &::before{
            content: '';
            width: 3vw;
            height: 3vw;
            /* border: 4px solid red; */
            border-radius: 50%;
            position: absolute;
            left: 5%;
            top: 45%;
            box-shadow:  inset -3px -3px 10px #951616b2,
            inset 3px 13px 7px rgba(36, 50, 2, 0.945);
         }
         @media (min-width: 340px) {                
             margin:2rem;
             margin-left:5rem;
             width: 60vw;
             height: 60vw;
         }
         @media (min-width: 360px) {                
             margin:2rem;
             margin-left:5rem;
             width: 60vw;
             height: 60vw;
         }
         @media (min-width: 375px) {                
             margin:2rem;
             margin-left:5rem;
             width: 60vw;
             height: 60vw;
         }
         @media (min-width: 768px) {
             margin:1.2rem;
             margin-left:0rem;
             width: 35vw;
             height: 35vw;
         }
         @media (min-width: 1024px) {
             width: 38vw;
             height: 38vw;      
         }
         @media (min-width: 1280px) {
             margin:0.2rem;
             margin-top:2rem;
             margin-left:1rem;
             width: 42vw;
             height: 42vw;            
         }
         @media (min-width: 1440px) {
             margin:0.2rem;
             margin-top:2rem;
             margin-left:1rem;
             width: 35vw;
              height: 35vw;         
         } 
         @media (min-width: 1920px) {
          margin:0.2rem;
             margin-top:2rem;
             margin-left:1rem;
             width: 40vw;
             height: 40vw;                       
         }
         @media (min-width: 2560px) { 
          margin:0.2rem;
             margin-top:2rem;
             margin-left:1rem;
             width: 40vw;
             height: 40vw;              
         } 
         @media (min-width: 3840px) { 
          margin:0.2rem;
             margin-top:2rem;
             margin-left:1rem;
             width: 40vw;
             height: 40vw;               
         } 
         @media (min-width: 4096px) {                
         } 
`;
export const MiCanvas = styled.div` 
             width:clamp(20vw,30vw,50vw);
             height:clamp(20vw,30vw,50vw);
             border-radius: 50%;
             filter:drop-shadow(20px -20px);
             filter:hue-rotate(20%);
             -webkit-mask-image: radial-gradient(ellipse 90% 80% at 48% 78%, black 40%, transparent 50%);
             mask-image: radial-gradient(ellipse 125% 120% at 58% 78%, black 20%, transparent 50%);
            @media (min-width: 340px) {                
             width: 60vw;
             height: 60vw;
            }
            @media (min-width: 360px) {                
             width: 50vw;
             height: 50vw;
            }
            @media (min-width: 375px) {                
              width: 50vw;
              height: 50vw;
             }
            @media (min-width: 768px) {
              width: 35vw;
              height: 35vw;
             }
            @media (min-width: 1024px) {
              width: 38vw;
              height: 38vw;          
             }
            @media (min-width: 1280px) {
              width: 42vw;
              height: 42vw;           
             }
            @media (min-width: 1440px) {
              width: 35vw;
              height: 35vw;          
             } 
            @media (min-width: 1920px) { 
              width: 40vw;
              height: 40vw;                       
             }
            @media (min-width: 2560px) {              
             } 
            @media (min-width: 3840px) {               
             } 
            @media (min-width: 4096px) {                
             } 
`;
export const Imag = styled.img`
             display:none;
`
export const Img = styled.img`
             /* position:absolute;
             top:0;
             left:0;
             right:0;
             bottom:0;
             width:100%;
             height:100%; */
             display:flex;
             align-items: center;
             justify-content: space-around;
             transform-origin:center;
             object-fit:cover;
             border-radius:50%;
             z-index:3;
`