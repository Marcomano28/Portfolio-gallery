import styled from "styled-components"
import { Link } from "react-router-dom"
import { device } from "../../utils/breakPoints"

export const Navy = styled.nav`
             /* border: 2px solid lightblue; */
             display: flex;
             justify-content: center;
             align-items: center;
             width:fit-content;
             /* box-shadow: inset 0 8px 10px -6px #000000; */
             margin-top: 0;
             z-index: 2;            
             box-shadow:${props => props.theme.navShadowBox};

             @media ${device.mobileL} { // 425
      
             }
             @media ${device.tablet} { // 767
              
             } 
             @media ${device.laptop} { // 1024   
              margin-top: 0.6rem;
             }
             @media ${device.laptopL} { // 1440
               
             }
             @media ${device.desktop} { // 2560
               
             }                       
`
export const Btn = styled.button`
             padding-block: 0.2rem;
             border-radius: 0.4rem;
             padding-inline: 0.2rem;
             flex-shrink: 0;
             border: none;
             background-color: transparent;
             box-shadow: inset 0 5px 8px -6px #907557;
             /* box-shadow: 0 -2px 6px rgb(69, 29, 24); */
             transition-duration: 0.4s;

             @media ${device.mobileL} { // 425
      
             }
             @media ${device.tablet} { // 767
              font-size: 0.8rem; 
              padding-inline: 0.6rem;
              padding-block:0.3rem;
             } 
             @media ${device.laptop} { // 1024   
              font-size: 1rem;
              padding-inline: 1rem;
              padding-block:0.3rem;
             }
             @media ${device.laptopL} { // 1440
              font-size: 1rem;
              padding-inline: 0.3rem; 
              padding-block:0.2rem;
             }
             @media ${device.desktop} { // 2560
              font-size: 0.85rem; 
              padding-inline: 0.9rem;
             }
    
            &:hover{
             box-shadow: ${props => props.theme.onHoverShadowMainBtn};
             
            }
`
export const BtnLink = styled(Link)`
             color: ${props => props.theme.navButtonColor};
             text-shadow: 1px 1px #68523a;
             padding: 0 0.1rem;
             text-decoration: none;
             border-radius:4px;
             padding-inline: 0.1rem;
             box-shadow: inset 0 8px 10px -6px #000000;
           &:hover{
             margin: 0.7rem 0;
             color: ${props => props.theme.onHoverColorAbout};
           }
`