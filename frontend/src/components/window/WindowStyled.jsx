import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const Message = styled.p`
    z-index:3;
    background-image:${props => props.theme.textCityColor}; 
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top:0.3rem;
    font-size: 0.7rem;
    @media ${device.mobileL} { // 425
    
    }
    @media ${device.tablet} { // 768
    
    } 
    @media ${device.laptop} { // 1024
      font-size: 0.9rem;  
    }
    /* @media ${device.laptopL} { // 1440
      font-size: 1rem;       
    }
    @media ${device.desktop} { // 2560
      font-size: 1rem;
    }   */
`