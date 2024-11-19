import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const Wrapper = styled.div`
     /* border: 2px solid red;  */
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction:column;
     margin-top: 0.2rem;
     padding: 0.2rem 0rem;
     
     @media ${device.mobileL} { // 425
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.2rem;
      
     }
     @media ${device.tablet} { // 767
      justify-content: start;
      align-items: center;
      margin-top: 0.2rem;
      
     } 
     @media ${device.laptop} { // 1024   
       justify-content: space-between;
      
     }
     @media ${device.laptopL} { // 1440
       justify-content: space-between;
     }
     @media ${device.desktop} { // 2560
       
     }
`
export const Paragraph = styled.p`
      font-size: 0.8rem;

      @media ${device.mobileL} { // 425
      
     }
     @media ${device.tablet} { // 767
      
     } 
     @media ${device.laptop} { // 1024   
      font-size: 1.1rem;
     }
     @media ${device.laptopL} { // 1440
       
     }
     @media ${device.desktop} { // 2560
       
     }
  
`
export const InputContainer = styled.div`
     display:flex;
     justify-content:center;
     align-items: start;
     margin-top:0.3rem;
     font-size: 1rem;
     gap: 0.8rem;
     @media ${device.mobileL} { // 425
    
     }
     @media ${device.tablet} { // 768
      font-size: 1rem;
     } 
     @media ${device.laptop} { // 1024
       margin-top:1.2rem; 
        gap: 1rem;  
     }
     /* @media ${device.laptopL} { // 1440
       margin-top:1.2rem;
       
     }
     @media ${device.desktop} { // 2560
       
     }  */
 
`
export const Input = styled.input`
     color: ${props => props.theme.inputColorOnHover};
     background-color: ${props => props.theme.inputBackground};
     border-bottom: 2px solid #1e2e1f; 
     border-left:none;
     border-top:none;
     border-radius: 4px;
     padding:0.2rem 0.4rem; 
     font-size: 0.7rem;
     z-index:10;
     cursor: default;
     box-shadow:inset 0px -2px 7px rgba(75, 93, 152, 0.39);    
     transition: border-color 0.3s, box-shadow 0.3s; 
     &:focus{
      border-color: #434825;
      outline: none;
      border-bottom: #0a0c00;
      box-shadow:inset 2px 2px 3px rgba(31, 37, 17, 0.99); /* Sombra verde al enfocar */
     }
     &:hover{
       background-color: ${props => props.theme.inputBackgroundOnHover}; 
     }
     &::placeholder{
          color: ${props => props.theme.inputButtonColor};   
     }
     @media ${device.mobileL} { // 425
    
     }
     @media ${device.tablet} { // 767
       margin-top:0.3rem; 
       font-size: 0.8rem;
     } 
     @media ${device.laptop} { // 1024
       margin-top:1rem; 
       font-size: 0.9rem;  
     }
     /* @media ${device.laptopL} { // 1440
       margin-top:1rem;
       font-size: 1rem;       
     }
     @media ${device.desktop} { // 2560
       margin-top:1rem;
       font-size: 1rem;
     }  */
`
export const InputButton = styled.button`
     z-index:10;
     cursor: pointer;
     padding-block: 2px;
     border-radius: 6px;
     flex-shrink: 0;
     border: none;
     font-size: 0.7rem;
     color: ${props => props.theme.inputButtonColor};
     padding: 0.15rem 0.5rem;
     background-color: transparent;
     box-shadow: ${props => props.theme.inputButtonShadow};
     border-bottom: 2px solid #1e2e1f; 
     transition-duration: 0.4s;
     &:hover{
          box-shadow: ${props => props.theme.inputButtonShadowOnHover};           
     }
      @media ${device.mobileL} { // 425
    
      }
      @media ${device.tablet} { // 768
        margin-top:0.3rem;
        font-size: 0.8rem;
      } 
      @media ${device.laptop} { // 1024
        margin-top:1rem; 
        font-size: 1rem;
        padding: 0.2rem 0.8rem;  
      }
      /* @media ${device.laptopL} { // 1440
        margin-top:1rem;
        font-size: 0.8rem;       
      }
      @media ${device.desktop} { // 2560
        margin-top:1rem;
        font-size: 0.8rem;
      }          */
`