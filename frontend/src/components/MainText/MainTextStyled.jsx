import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const Section = styled.section`
            /* border: 2px solid salmon; */
            margin-top: 0;
            height: 45vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-inline: 2rem;
            gap: clamp(0.5rem ,1rem ,2.5rem);

            @media ${device.mobileL} { // 425
            }
            @media ${device.tablet} { // 768
            } 
            @media ${device.laptop} { // 1024
              margin-top: 2rem;
              height: 45vh;
            }
            @media ${device.laptopL} { // 1440
            }
            @media ${device.desktop} { // 2560
            }            
`
export const IntroContainer = styled.div`
            display: flex;
            align-items: baseline;
            justify-content: center;
            flex-wrap: wrap;
`
export const Intro = styled.h3`  
            font-size: clamp(1rem,2rem,5rem);
            background-image:repeating-linear-gradient(112.5deg, rgba(83,105,141, 0.2) 0px,
                  rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                  rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                  rgba(83,105,141, 0.2) 8px),repeating-linear-gradient(45deg, rgba(83,105,141, 0.2) 0px,
                  rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                  rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                  rgba(83,105,141, 0.2) 8px),linear-gradient(180deg, rgb(216,255,153),rgb(149,59,0) ); 
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: ${props => props.theme.introTextShadow};           
`
export const Span = styled.span`
            background-image:repeating-linear-gradient(112.5deg, rgba(83,105,141, 0.2) 0px,
                  rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                  rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                  rgba(83,105,141, 0.2) 8px),repeating-linear-gradient(45deg, rgba(83,105,141, 0.2) 0px,
                  rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                  rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                  rgba(83,105,141, 0.2) 8px),linear-gradient(180deg, rgb(216,255,153),rgb(149,59,0) ); 
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: ${props => props.theme.introTextShadow}; 
          
            @media ${device.mobileL} { // 425
            }
            @media ${device.tablet} { // 768
            } 
            @media ${device.laptop} { // 1024
              font-size: 2rem; 
            }
            @media ${device.laptopL} { // 1440
              font-size: 2.3rem; 
            }
            @media ${device.desktop} { // 2560
            }
`
export const Text = styled.p`
            text-align: center;
            font-size: 0.8rem;
            padding-inline: 0;
            padding-bottom: 2rem;
            background-image:repeating-linear-gradient(112.5deg, rgba(83,105,141, 0.2) 0px,
                   rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                   rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                   rgba(83,105,141, 0.2) 8px),repeating-linear-gradient(45deg, rgba(83,105,141, 0.2) 0px,
                   rgba(83,105,141, 0.2) 0px,transparent 0px, transparent 1px,rgba(83,105,141, 0.2) 1px,
                   rgba(83,105,141, 0.2) 4px,transparent 4px, transparent 5px,rgba(83,105,141, 0.2) 5px,
                   rgba(83,105,141, 0.2) 8px),linear-gradient(180deg, rgb(216,255,153),rgb(149,59,0) ); 
            -webkit-background-clip: text;          
            background-clip: text;
            -webkit-text-fill-color: transparent; /* Hace que el texto sea transparente para mostrar el fondo */
            /* font-size: clamp(0.8rem,1.3vw ,3.5rem); */
            text-shadow: ${props => props.theme.introTextShadow};
             
            @media ${device.mobileL} { // 425
            }
            @media ${device.tablet} { // 768
            } 
            @media ${device.laptop} { // 1024
              font-size: 1.3rem;
              padding-inline: 2.2rem; 
            }
            @media ${device.laptopL} { // 1440
              font-size: 1.5rem; 
              padding-inline: 2.2rem;
            }
            @media ${device.desktop} { // 2560
            }    
`
