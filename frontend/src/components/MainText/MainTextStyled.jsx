import styled from "styled-components";

export const Section = styled.section`
            margin-top: 2rem;
            height: 45vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-inline: clamp(1rem, 2rem,8rem );
            gap: clamp(0.5rem ,1rem ,2.5rem);
            
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
           
            @media (min-width: 375px) {
              font-size: 1.7rem;
            }
            @media (min-width: 768px) {
              font-size: 1.75rem;
              margin-bottom: 2rem;  
            }
            @media (min-width: 1024px) {
              font-size: 2rem;           
            }
            @media (min-width: 1280px) {
              font-size: 2.1rem;            
            }
            @media (min-width: 1440px) {
              font-size: 2.3rem;            
            }
`
export const Text = styled.p`
            text-align: center;
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
             
            @media (min-width: 375px) {
              font-size: 0.7rem;
              padding-inline: 0.74rem;
              margin-bottom:2.5rem;
            }
            @media (min-width: 768px) {
              font-size: 1.3rem; 
              padding-inline: 3rem; 
              margin-bottom: 1.2rem; 
            }
            @media (min-width: 1024px) {
              font-size: 1.3rem;
              padding-inline: 2.2rem;           
            }
            @media (min-width: 1280px) {
              font-size: 1.3rem;            
            }
            @media (min-width: 1440px) {
              font-size: 1.5rem; 
              padding-inline: 2.2rem;            
            }
            @media (min-width: 1920px) {
              font-size: 1.6rem; 
              padding-inline: 2.7rem; 
              margin-bottom: 0.5rem;           
            }
     
`
