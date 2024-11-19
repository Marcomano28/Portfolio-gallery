import styled from "styled-components";
import { device } from "../../utils/breakPoints"; 

export const SlideWrapper = styled.div`
       width: 100%;
       height: 100%;
       display: flex;
       align-items: end;
       justify-content: center;
       /* border: 2px solid red; */
       grid-column: 1 / span 2;
       grid-row: 2/span 2;
       z-index: 5;
       position: relative;
`;

export const CardSlide = styled.div`
       /* border: 2px solid lightblue; */
       margin-top: 0.8rem;
       z-index: 2;
       width: 87%; 
       height: 53%;
       display: flex;
       flex-wrap: nowrap;
       flex-direction: column;    
       justify-content: start;
       gap: 0.2rem;
       margin-bottom: 0.8rem;

       /* @media ${device.mobileL} { // 425
        gap: 0.5rem;       
        width: 87%; 
        height: 53%;
        margin-top: 0.2rem;
       } */
       @media ${device.tablet} { // 767
        gap: 0.5rem;       
        width: 75%; 
        height: 35%;
        margin-top: 0.5rem;
       } 
       @media ${device.laptop} { // 1024    
        overflow-y: auto;
        margin-top: 0.5rem;
        width: 85%; 
        height: 90%;
         
       }
       @media ${device.laptopL} { // 1440
          
       }
       @media ${device.desktop} { // 2560
       
       }  
`;



