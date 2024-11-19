import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const CanvasSection = styled.div`
       width:100%;
       height:100%;
       /* border: 2px solid red; */
       /* position:relative; */     
`;

export const Imag = styled.img`
       position:absolute;
       top:0;
       left:0;
       right:0;
       bottom:0;
       width: 100%;
       height: 100%;
       object-fit: cover;
       padding:0.5rem;
       padding-bottom:1.5rem;

       @media ${device.mobileL} { // 425
    
       }
       @media ${device.tablet} { // 768
       
       } 
       @media ${device.laptop} { // 1024
        padding: 1rem;
        padding-bottom: 2rem;
       }
       @media ${device.laptopL} { // 1440
          /* margin-bottom: 2rem; */
          
       }
       @media ${device.desktop} { // 2560
       
       }     
`;
export const Button = styled.button`
       margin: 0rem auto;
       position:absolute;
       left:50%;
       transform: translate(-50%, -50%);
       top: 97%;
       z-index:2;
       font-size:0.7rem;
       padding: 2px 15px;
       color: rgb(112, 112, 67);
       border-radius: 6px;
       border: none;
       background-color: transparent;
       box-shadow: inset 4px 5px 5px -4px #d3a065;
       transition: background-color 0.3s;
       transition-duration: 0.4s;
       text-shadow: 2px 2px 4px black;
       cursor: pointer;
      &:hover{
        box-shadow: inset 1px 9px 8px -6px #312325;
        color: rgb(204, 204, 121);     
      }
      @media ${device.mobileL} { // 425
    
      }
      @media ${device.tablet} { // 768
      
      } 
      @media ${device.laptop} { // 1024
       top: 98%;
      }
      @media ${device.laptopL} { // 1440
         
      }
      @media ${device.desktop} { // 2560
      
      }
`;
export const Canvas = styled.div`
       position:absolute;
       top:0;
       left:0;
       right:0;
       bottom:0;
       width:100%;
       height:100%;
       padding:0.4rem;       
`;