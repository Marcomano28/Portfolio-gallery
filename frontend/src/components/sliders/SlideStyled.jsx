import styled from "styled-components"; 
import { device } from "../../utils/breakPoints";

export const Input = styled.input`
       display: none;
      &:checked + label{
        height: 70vw;
      }
      &:checked + label .description {
        opacity: 1 !important;
        transform: translateY(0) !important;
         
        @media ${device.mobileL} { // 425
    
        }
        @media ${device.tablet} { // 768
        
        } 
        @media ${device.laptop} { // 1024
          
         
        }
        @media ${device.laptopL} { // 1440
            
        }
        @media ${device.desktop} { // 2560
          
        }
  }
`;
export const Label = styled.label`
        z-index: 2;
        height: 1.3rem;
        background-size: cover;
        background-position: bottom;
        cursor: pointer;
        overflow: hidden;
        border-radius: 1.2rem;
        padding: 0.4rem 0.5rem 1.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        transition: 0.6s cubic-bezier(0.28,-0.03,0,0.99);
        border-bottom: 3px solid black;
        box-shadow: 0 10px 30px -5px rgba(63, 7, 49, 0.8);
        position: relative;
        background: ${props => props.theme.backGrad};
        
      &::before{
        content: '';
        position: absolute;   
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        z-index: -1;
        width: 100%;
        height: 100%;  
        background-image: ${props => props.theme.backMaravilla};                  
        background-size: 100px 50px;
        mix-blend-mode:difference;
      }
       @media ${device.laptop} { // 1024
          height: 2rem;
        }
       @media ${device.laptopL} { // 1440
            
        }
        @media ${device.desktop} { // 2560
          
        }
`;
export const Row = styled.div`
        color: white;
        display: flex;
        flex-wrap: nowrap;
`;
export const Icon = styled.div`
        background:rgb(34, 65, 69);
        color: rgb(193, 169, 82);
        font-size: 0.5rem;
        border-radius: 50%;
        width:20px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        
        @media ${device.mobileL} { // 425
    
        }
        @media ${device.tablet} { // 768
        
        } 
        @media ${device.laptop} { // 1024
         font-size: 0.8rem; 
        }
        @media ${device.laptopL} { // 1440
            
        }
`;
export const Description = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        /* overflow: hidden; */
        position: absolute;
        bottom: 0.4rem;
        text-align: center;
        left: 0;
        width: 100%;
        opacity: 0;
        background-color: transparent;
        transform: translateY(20px);
        transition-delay: 0.3s;
        transition: all 0.7s ease;
        mix-blend-mode:hard-light;
        padding:2rem;
`;
export const DescriptP = styled.p`
         /* border: 2px solid red; */
         padding-bottom: 0.4rem;
         color: rgb(180, 190, 170);
         font-weight: 900;
         font-size: 0.8rem;
         margin-bottom: 1.5rem;
         text-shadow:
         -1px -1px 0 #3f3b27,  
          1px -1px 0 #000,
         -1px 1px 0 #000,
          1px 1px 0 #000; 
         box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5), 0px 0px 50px rgba(0, 0, 0, 0.5);

         @media ${device.mobileL} { // 425
    
         }
         @media ${device.tablet} { // 768
          align-items: start;
          margin-inline: 1.5rem;
          margin-bottom: 2.5rem;
          font-size: 1.2rem; 
         
         } 
         @media ${device.laptop} { // 1024
          align-items: start;
          margin-inline: 1.5rem;
          margin-bottom: 4rem;
          font-size: 1rem;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.9), 0px 0px 50px rgba(0, 0, 0, 0.9); 
         }
         @media ${device.laptopL} { // 1440
          align-items: start;
          margin-inline: 1.5rem;
          margin-bottom: 5rem;
          font-size: 1.1rem; 
             
         }
         @media ${device.desktop} { // 2560
           
         }
`;
export const DescriptH = styled.h4`
         color: rgba(201, 229, 239, 0.8);
         font-size: 0.8rem;
         text-transform: uppercase;
         z-index: 5;
         margin-inline: 1.5rem;
         margin-bottom: 0.5rem;

         @media ${device.mobileL} { // 425
    
         }
         @media ${device.tablet} { // 768
          margin-inline: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.3rem; 
         } 
         @media ${device.laptop} { // 1024
          margin-inline: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.1rem; 
         }
         @media ${device.laptopL} { // 1440
          margin-inline: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.2rem; 
             
         }
         @media ${device.desktop} { // 2560
           
         }
`