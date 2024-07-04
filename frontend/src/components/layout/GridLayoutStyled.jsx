import styled from "styled-components";

export const Container = styled.div`
         /* background:  ${props => props.theme.backgroundImage};
         display: flex; */
         overflow: hidden;
         position: relative;
         width: 100%;
         height: 100%; 
         /* border: 2px solid red; */
         z-index: 2; 
        @media (min-width: 375px) { 
        display:flex;
        flex-direction:column;
        gap:2.5rem;                
         }
        @media (min-width: 768px) {
        display:flex;
        flex-direction:column;
        gap:2.5rem;
         }
        @media (min-width: 1024px) {
        display:flex;
        /* justify-content:space-between; */
        justify-content:center;
        flex-direction:column;
        gap:3rem;
        /* gap:0.5rem; */
         }
        @media (min-width: 1280px) {
        display:flex;
        justify-content:flex-start;
        flex-direction:column;          
         }
        @media (min-width: 1440px) {
         padding-top: 3rem;
         display: grid;
         gap: 1rem;
         grid-template-columns: 25% 12% 1fr;
         grid-template-rows:1fr 50vh 22vh 1fr; 
        } 
`;
export const Panel = styled.div`
        border: 2px solid red;
       flex: 1;
`;
export const PanelNav = styled.nav`
       /* border: 2px solid red;        */
       /* grid-column: 2 / span 1;
       grid-row: 4; */      
       /* margin-left: 5.8rem; */
       display: flex;
       justify-content: center;
       align-items: center;
       /* flex-wrap: wrap; */
       width:fit-content;
       box-shadow: inset 0 8px 10px -6px #000000;
       /* margin-top: 0.5rem; */
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
        @media (min-width: 375px) {         
         margin:auto;
         align-items:center;
         justify-content:flex-start;
         margin-top:1rem;                
         }
        @media (min-width: 768px) {
         top:0;
         margin:auto;
         align-items:center;
         justify-content:center;
         margin-top:1rem;
         }
        @media (min-width: 1024px) {
         margin:auto;
         align-items:center;
         justify-content:center;
         margin-top:1rem;
         }
        @media (min-width: 1280px) {
          margin:auto;
         align-items:center;
         justify-content:center;
         position:relative;         
         }
        @media (min-width: 1440px) {
          grid-column: 1 / span 1;
          /* border:2px solid red; */
          grid-row: 1;
          top: 1rem;
          left: 7%;
          position: sticky;
        } 
`;
export const PanelText = styled.div`      
       text-align: center;      
       color: rgb(84, 84, 54);
       /* border: 2px solid red; */
       @media (min-width: 375px) { 
         margin-top: 0.5rem;               
         padding: 0rem 5.2rem;
         }
        @media (min-width: 768px) {
         margin-top: 0.5rem;
         padding: 0.2rem 2.5rem;
         }
        @media (min-width: 1024px) {
          padding: 1.2rem 12.5rem;
         }
        @media (min-width: 1280px) {
          padding: 0.4rem 5.5rem; 
         }
        @media (min-width: 1440px) {
          margin: 0 3rem;
          grid-column: 1 / span 2;
          padding: 0 2.5rem;
          grid-row: 2;
        }  
`;
export const PanelVideo = styled.div`
       position: relative;
       margin: 0.7rem 0.5rem;
       /* grid-column: 3;
       grid-row: 1 / span 3; */
       border-radius: 20px;
       background: hsla(180, 17%, 12%, 0.692);
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.4), 0px 0px 50px rgba(0, 0, 0, 0.9);
       z-index: 2;
       @media (min-width: 375px) { 
          display:flex;
          flex-direction:column; 
          margin-inline:2rem; 
          flex-grow: 0; 
          flex-shrink: 0; 
          flex-basis: auto;                 
         }
        @media (min-width: 768px) {
          display:flex;
          flex-direction:column;
          margin-inline:2rem; 
          flex-grow: 0; 
          flex-shrink: 0; 
          flex-basis: auto; 
         }
        @media (min-width: 1024px) {
          display:flex;
          flex-direction:column;
          margin-inline:2rem;         
          flex-grow: 0; 
          flex-shrink: 0; 
          flex-basis: auto; 
         }
        @media (min-width: 1280px) {
          display:flex;
          flex-direction:column;
          flex-grow: 0; 
          flex-shrink: 0; 
          flex-basis: auto; 
         }
        @media (min-width: 1440px) {
          grid-column: 3;
          grid-row: 1 / span 3;
        } 
`;
export const PanelSlides= styled.div`
       /* border: 2px solid black; */
       z-index: 5;
       position: relative;

       @media (min-width: 375px) { 
              display:flex;
              align-items: center; 
              justify-content:center;
              margin:auto;
              width:95%;
              flex-grow: 1; 
              flex-shrink: 1; 
              flex-basis: 120px;                
         }
        @media (min-width: 768px) {
              display:flex;
              align-items: center;
              justify-content:center;
              margin:auto;
              width:80%;
              flex-grow: 1; 
              flex-shrink: 1; 
              flex-basis: 120px; 
         }
        @media (min-width: 1024px) {
              display:flex;
              align-items: center;
              justify-content:center;
              margin:auto;
              width:80%;
              flex-grow: 1; 
              flex-shrink: 1; 
              flex-basis: 120px; 
         }
        @media (min-width: 1280px) {
              align-items: center;
              /* justify-content:center; */
              margin:auto;
              width:70%;             
              flex-grow: 1; /* No permitir que el elemento crezca */
              flex-shrink: 1; /* No permitir que el elemento se encoja */
              flex-basis: 120px;         
         }
        @media (min-width: 1440px) {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: end;
              justify-content: center;
              /* border: 2px solid red; */
              grid-column: 1 / span 2;
              grid-row: 2/span 2;
        } 
`;