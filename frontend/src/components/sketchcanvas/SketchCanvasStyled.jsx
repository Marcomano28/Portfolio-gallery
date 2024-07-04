import styled from "styled-components";

export const Screen = styled.div`
       position: relative;
       margin: 0.7rem 0.5rem;
       grid-column: 3;
       grid-row: 1 / span 3;
       border-radius: 20px;
       background: hsla(180, 17%, 12%, 0.692);
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.4), 0px 0px 50px rgba(0, 0, 0, 0.9);
       z-index: 2;
       /* @media (min-width: 375px) {                
         
         }
        @media (min-width: 768px) {
      
         }
        @media (min-width: 1024px) {
         display: flex;
         align-items:center;
         justify-content:center;
         width:100%;
         height:100%; 
         }
        @media (min-width: 1280px) {
          
         }
        @media (min-width: 1440px) {
     
        }   */
       
`;
export const Image = styled.img`
       max-width: 100%;
       height: auto;
       margin-top: 0.2rem;
       padding:1.5rem;
       /* @media (min-width: 375px) {                
         
       }
      @media (min-width: 768px) {
    
       }
      @media (min-width: 1024px) {
       display: flex;
       align-items:center;
       justify-content:center;
       width:100%;
       height:100%; 
       }
      @media (min-width: 1280px) {
        
       }
      @media (min-width: 1440px) {
   
      }   */
`;
export const Button = styled.button`
       color: rgb(112, 112, 67);
       position: absolute;
       bottom: 0;
       left: 50%;
       padding: 2px 15px;
       border-radius: 6px;
       border: none;
       background-color: transparent;
       box-shadow: inset 0 5px 5px -6px #907557;
       /* transition: background-color 0.3s; */
       transition-duration: 0.4s;
       &:hover{
       color: rgb(155, 155, 90);
       box-shadow: inset 0 8px 10px -6px #774747;
       }
`