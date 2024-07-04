import styled from "styled-components";

export const CanvasSection = styled.div`
       /* border: 4px solid green; */
       width:100%;
       height:100%;
       position:relative;
       
       @media (min-width: 360px) { 
          width:260px;
          height:180px;                 
         }
       @media (min-width: 375px) {
          display:flex;
          align-items:center;
          justify-content:center; 
          margin:auto;
          width:100%;
          height:480px;                 
         }
        @media (min-width: 768px) {
          display:flex;
          align-items:center;
          justify-content:center;
          margin:auto;
          width:100%;
          height:700px; 
         }
        @media (min-width: 1024px) {
          margin:auto;
          width:950px;
          height:880px;
         }
        @media (min-width: 1280px) {
          margin:0 auto;
          width:100%;
          height:900px;
         }
        @media (min-width: 1440px) {
          margin:0.5rem auto;
          width:100%;
          height:100%;
        }   
`
export const Imag = styled.img`
       position:absolute;
       top:0;
       left:0;
       right:0;
       bottom:0;
       width: 100%;
       height: 100%;
       object-fit: cover;
       padding:1rem;
       padding-bottom:2rem;
       @media (min-width: 360px) { 
        width:100%;
          height:100%;                 
         }
       @media (min-width: 375px) { 
        width:100%;
          height:100%;                
         }
        @media (min-width: 768px) {
          width:100%;
          height:100%;
         }
        @media (min-width: 1024px) {
          width:100%;
          height:100%;
         }
        @media (min-width: 1280px) {
          width:100%;
          height:100%;
         }
        @media (min-width: 1440px) {
          width:100%;
          height:100%;
        }   
       
`
export const Button = styled.button`
       margin: 0rem auto;
       align-items:center;
       position:absolute;
       left:50%;
       bottom:2px;
       z-index:2;
       font-size:1rem;
       padding: 2px 15px;
       color: rgb(112, 112, 67);
       border-radius: 6px;
       border: none;
       background-color: transparent;
       box-shadow: inset 4px 5px 5px -4px #d3a065;
       transition: background-color 0.3s;
       transition-duration: 0.4s;
       text-shadow: 2px 2px 4px black;
      &:hover{
        box-shadow: inset 1px 9px 8px -6px #312325;
        color: rgb(204, 204, 121);     
      }
`
export const Canvas = styled.div`
       position:absolute;
       top:0;
       left:0;
       right:0;
       bottom:0;
       width:100%;
       height:100%;
       padding:0.4rem;
       padding-bottom:2rem;
`