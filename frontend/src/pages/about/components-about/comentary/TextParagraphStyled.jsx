import styled from "styled-components";

export const Paragraph = styled.p`
        /* border: 2px solid orange; */
        position: relative;
        color: rgba(216, 216, 178, 0.727);       
        z-index:2;
        text-shadow:${props => props.theme.textShadowKey};    
        /* padding-top: 2px; */
        -webkit-mask-image: linear-gradient(to top, transparent 25%, black 75%);
        mask-image: linear-gradient(to top, transparent 25%, black 75%);
       @media (min-width: 375px) { 
        /* transform:translateY(-2rem); 
        font-size:0.87rem;
        font-weight:100;
        padding: 0 2rem;
        margin-top:0;
        order:2; */
        }
       @media (min-width: 768px) {
        order:1;
        }
       @media (min-width: 1024px) {
                  
        }
       @media (min-width: 1280px) {
                     
        }
       @media (min-width: 1440px) { 
         font-weight: 300;
         font-size: 1.2rem;
         padding-right:1.5rem;
         padding-left: 0.4rem; 
        } 
       @media (min-width: 1920px) {
                
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