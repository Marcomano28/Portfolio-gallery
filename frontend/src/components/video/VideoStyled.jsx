import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const ScreenContainer = styled.div` 
       border: 3px solid violet;  
       height: 65%;
       width: 100%;
       display: flex;
       align-items: start;
       justify-content: center;
       border-radius: 10px;
       background: rgb(56, 72, 72);
       box-shadow: 20px 20px 20px rgba(16, 15, 15, 0.7), 20px 30px 50px rgba(17, 18, 18, 0.9);
       z-index: 6;
       ${(props) => props.$isLandscapeMobile && `
         width: 100%;
         height: 100%; 
         padding: 0;  
       `}
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         height: 68%;
         width: 76.3%;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }
`
export const Pane = styled.div`
        /* border: 2px solid tomato;      */
        width: 100%;
        height: 60%;
        position: absolute;
        top: 0;
        left: 0px;
        border-radius: 20px;
        z-index: 1;
        margin-top: 0;
        background: linear-gradient(
          to right,
          rgba(42, 57, 60, 0.65),
          rgba(40, 49, 12, 0.45)
       ); 
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
        width: 80%;
        height: 74%;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }  
`;

export const SomeVideo = styled.video`
        /* border: 2px solid blue; */
        width: 100%;
        height: 100%; 
        padding-bottom: 1.6rem;
        border-radius: 10px;
        z-index: 6;
        box-shadow: ${props => props.theme.screenShadow};
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
        padding-bottom: 0.8rem;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       } 
`;

export const Text = styled.div`
       /* border: 2px solid lightgreen; */

`
export const Title = styled.h1`
       font-size: 1.4rem;
       margin-top: 0.5rem;
       margin-left: 9.5rem;
       color: hsl(193, 26%, 28%);
       text-shadow: 2px 2px 5px black;
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(0, 0, 0, 0.5);
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         font-size: 2.3rem;
         margin-top: 3.5rem;
         margin-left: 18.5rem;
         color: hsl(190.91, 22.45%, 19.2%);
         text-shadow: none;

       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       } 

`
export const Title1 = styled.h1`
       padding-left: 0;
       font-size: 1.4rem;
       margin-top: 0.2rem;
       margin-left: 13rem;
       color: hsl(193, 26%, 28%);
       text-shadow: 2px 2px 5px hsl(193.85, 14.9%, 17%);
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.5);
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         color: hsl(192, 33%, 17%); 
         text-shadow: none;    
         padding-left: 0.3rem;
         font-size: 2.2rem;
         margin-top: 0;
         margin-left: 23.2rem;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }  
`
export const Title2 = styled.div`
       padding-left: 0;
       font-size: 1.4rem;
       margin-top: 0.2rem;
       margin-left: 16rem;
       font-weight: bolder;
       font-stretch: 2;
       color: hsl(193.55, 19.25%, 31.57%);
       text-shadow: 2px 2px 5px hsl(192, 16.1%, 18.2%);
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         color: hsl(190.91, 22.45%, 19.2%);
         text-shadow: none;
         padding-left: 0.3rem;
         font-size: 2rem;
         margin-top: 0.3rem;
         margin-left: 28rem;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }
`
export const Title3 = styled.h3`
       font-size: 1rem;
       text-align: center;
       margin-right: 0.2rem;
       margin-top: 0.5rem;
       color: hsl(192.4, 13.9%, 41%);
       border-end-end-radius: 20px;
       text-shadow: 2px 2px 4px hsl(192, 16.1%, 18.2%);
       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         font-size: 1rem;
         margin-right: 1rem;
         margin-top: 0.7rem;
         color: hsl(190.91, 22.45%, 19.2%);
         text-shadow: none;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }
      
`
export const Title4 = styled.h3`
       font-size: 1rem;
       text-align: center;
       margin-right: 0;
       margin-top: 0.2rem;
       color: hsl(192.4, 13.9%, 41%);
       /* color: hsl(191.66, 24.65%, 28.62%); */
       border-end-end-radius: 20px;
       text-shadow: 2px 2px 4px hsl(192, 16.1%, 18.2%);

       @media ${device.mobileL} { // 425
       }
       @media ${device.tablet} { // 768
       } 
       @media ${device.laptop} { // 1024
         font-size: 1.1rem;
         margin-right: 0;
         margin-top: 0.4rem;
         /* color: hsl(191.66, 24.657%, 30%);
         text-shadow: 2px 2px 4px black; */
         color: hsl(190.91, 22.45%, 19.2%);
         text-shadow: none;
       }
       @media ${device.laptopL} { // 1440
       }
       @media ${device.desktop} { // 2560
       }
`