import styled from "styled-components"
import { Link } from "react-router-dom"

export const Navy = styled.nav`
             display: flex;
             justify-content: center;
             align-items: center;
             width:fit-content;
             /* box-shadow: inset 0 8px 10px -6px #000000; */
             margin-top: 0.6rem;
             z-index: 2;            
             box-shadow:${props => props.theme.navShadowBox};
             
             
`
export const Btn = styled.button`
             padding-block: 2px;
             border-radius: 6px;
             flex-shrink: 0;
             border: none;
             background-color: transparent;
             box-shadow: inset 0 5px 8px -6px #907557;
             /* box-shadow: 0 -2px 6px rgb(69, 29, 24); */
             transition-duration: 0.4s;
             
             @media (min-width: 375px) {
              font-size: 0.6rem;
              padding-inline: 0.1rem;
              padding-block:0.2rem;
            }
            @media (min-width: 768px) {
              font-size: 0.8rem; 
              padding-inline: 0.6rem;
              margin-inline:0.4rem;
              padding-block:0.3rem;   
            }
            @media (min-width: 1024px) {
              font-size: 1rem;
              padding-inline: 0.7rem;
              margin-inline:0.5rem;
              padding-block:0.3rem;            
            }
            @media (min-width: 1280px) {
              font-size: 0.8rem;
              padding-inline: 0.2rem; 
              margin-inline:0.2rem;
              padding-block:0.2rem;              
            }
            @media (min-width: 1440px) {
              font-size: 0.85rem; 
              padding-inline: 0.9rem;            
            }
            @media (min-width: 1920px) {
              font-size: 0.9rem; 
              padding-inline: 0.5rem;            
            }
            &:hover{
             box-shadow: ${props => props.theme.onHoverShadowMainBtn};
             
            }
`
export const BtnLink = styled(Link)`
             color: rgba(215, 214, 187, 0.617);
             text-shadow: 1px 1px #68523a;
             padding: 0 0.1rem;
             text-decoration: none;
             border-radius:4px;
             box-shadow: inset 0 8px 10px -6px #000000;
           &:hover{
             margin: 0.7rem 0;
             color: ${props => props.theme.onHoverColorAbout};
           }
`