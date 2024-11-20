import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const Container = styled.div`
  // border: 2px solid saddlebrown;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3% 14% 56% 1fr;
  grid-template-areas:
    "nav"
    "text"
    "video"
    "slides"; 
  padding: 1rem 0;

  ${(props) =>props.$isLandscapeMobile &&`
       grid-template-columns: 1fr;
       grid-template-rows: 1fr;
       grid-template-areas: "video";
       padding: 0.5rem;
  `}
  ${props => !props.$isLandscapeMobile && `
    @media ${device.mobileL} { // 425
    
  }

  @media ${device.tablet} { // 768
    grid-template-columns: 1fr;
    grid-template-rows: 5% 12% 58% 1fr;
    grid-template-areas:
    "nav"
    "text"
    "video"
    "slides"; 
  }

  @media ${device.laptop} { // 1024
    grid-template-columns: 38% 62%; 
    grid-template-rows: 10% 40% 50%;
    grid-template-areas:
      "nav video"
      "text video"
      "slides video";
    padding: 3rem 1rem;
  }
  @media ${device.laptopL} {  // 1440
    grid-template-columns: 38% 62%; 
    grid-template-rows: 10% 40% 50%;
    grid-template-areas:
      "nav video"
      "text video"
      "slides video";
    padding: 3rem 1rem;  
  }
  @media ${device.desktop} { // 2560
    grid-template-columns: 38% 62%; 
    grid-template-rows: 10% 40% 50%;
    grid-template-areas:
      "nav video"
      "text video"
      "slides video";
    padding: 3rem 1rem; 
  }
  @media ${device.desktopL} { // 3840
    grid-template-columns: 35% 65%; 
    grid-template-rows: 10% 40% 50%;
    grid-template-areas:
      "nav video"
      "text video"
      "slides video";
    padding: 3rem 1rem;  
  }
`} 
`;
// Panel de navegación
export const PanelNav = styled.div`
    grid-area: nav;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 8px 10px -6px #000000;
    z-index: 2;
    border-radius:4px;
    box-shadow: ${props => props.theme.boxShadowNav};
     & a{
       color: rgba(170, 169, 143, 0.617);
       text-decoration: none;
       box-shadow: inset 0 8px 10px -6px #000000;
     }
     & a:hover{
       margin: 0.7rem 0;
       /* color: rgba(242, 178, 83,0.8); */
       text-shadow:-1px -1px 0 #fcf8f5, 1px -1px 0 #859667,-1px 1px 0 #d46f64,1px 1px 0 #6f537a; 
       color: ${props => props.theme.onHoverColorAbout};
     }
     @media ${device.mobileL} { // 425
    
     }
     @media ${device.tablet} { // 768
     
     } 
     @media ${device.laptop} { // 1024
      align-items: start;
      margin-inline: 1.5rem;
      margin-bottom: 2rem; 
     }
     @media ${device.laptopL} { // 1440
         
     }
     @media ${device.desktop} { // 2560
       
     }
`;
// Panel de texto
export const PanelText = styled.div.attrs({ 'data-area': 'text' })`
       grid-area: text;
       text-align: center;      
       color: rgb(84, 84, 54);
       font-size: 0.7rem;
       margin: 0 1.5rem;
       gap: 0.5rem;
       /* border: 2px solid lightblue; */

    @media ${device.mobileL} { // 425
    
    }
    @media ${device.tablet} { // 769
      display: flex;
      align-items: start;
      justify-content: center;
      font-size: 0.4rem;
    } 
    @media ${device.laptop} { // 1024
      font-size: 1rem;
      
     
    }
    @media ${device.laptopL} { // 1440
      
      
    }
    @media ${device.desktop} { // 2560
      
    }
`;
// Panel de video
export const PanelVideo = styled.div.attrs({ 'data-area': 'video' })`
        grid-area: video; 
        /* border: 2px solid blueviolet;   */
        position: relative;
        border-radius: 20px;
        margin-inline: 0.4rem;
        background: hsla(180, 17%, 12%, 0.692);
        box-shadow: 0 20px 20px rgba(0, 0, 0, 0.4), 0px 0px 50px rgba(0, 0, 0, 0.9);
        z-index: 2;
        padding-bottom: 0rem;
        margin-bottom: 0rem;
      ${(props) => props.$isLandscapeMobile &&`
         width: 100%;
         height: 100%;
         margin:0;
         position: relative;
         padding-bottom: 1.4rem;
    ` }

     ${(props) => !props.$isLandscapeMobile && `
       @media ${device.mobileL} { // 425
      
       }
       @media ${device.tablet} { // 768
       
       } 
       @media ${device.laptop} { // 1024
       
       }
       @media ${device.laptopL} { // 1440
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
       }
       @media ${device.desktop} { // 2560
       
       }
  `}  
`;

// Panel de slides
export const PanelSlides = styled.div.attrs({ 'data-area': 'slides' })`
  // border: 3px solid red;
     grid-area: slides;
     z-index: 5;
     position: relative;
     padding-top: 1rem;
     width:100%;
     display:flex;
     align-items: start; 
     justify-content:center;
     flex-grow: 1; 
     flex-shrink: 1;
    //  overflow-y: auto;
      
     @media ${device.mobileL} { // 425
    
     }
     @media ${device.tablet} { // 768
     
     } 
     @media ${device.laptop} { // 1024
       overflow-y: auto;
       
     }
     @media ${device.laptopL} { // 1440
        
     }
     @media ${device.desktop} { // 2560
     
     }
`;