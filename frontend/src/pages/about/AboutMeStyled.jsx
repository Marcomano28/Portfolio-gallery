import styled from "styled-components";

export const AboutWraper = styled.section`
         position:relative;     
         /* border: 2px solid red; */
         display: grid;
         /* grid-template-columns:1fr 1fr 1fr auto;  */
         grid-template-rows: 8% 1fr 25%; 
         overflow: hidden;              
         width: 100vw;
         min-height: 100vh;  
         z-index:0;
         background-image:  ${props => props.theme.backgroundImage};
       &::before{
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         z-index: 0;
         background:  ${props => props.theme.background};
         width: 100%;
         height: 100%;
         mix-blend-mode: difference;
       }
`
export const Container = styled.div`     
        position:relative;
        display: flex; 
        flex-wrap: wrap;     
        width: 100%;
        height:100%;
       @media (min-width: 375px) { 
        /* flex-direction:column; */
        }
       @media (min-width: 768px) {
        flex-direction:column;
        align-items:center;
        
        }
       @media (min-width: 1024px) {
        justify-content: flex-start;
         flex-wrap:nowrap;         
         flex-direction:row; 
         padding-inline: 6%;          
        }
       @media (min-width: 1280px) {
        /* border: 4px solid lightblue; */
         justify-content: flex-start;
         flex-wrap:nowrap;         
         flex-direction:row; 
         padding-inline: 6%;         
        }
       @media (min-width: 1440px) {
         /* border: 4px solid lightblue; */
         justify-content: flex-start;
         /* flex-wrap:nowrap; */
         /* align-items:center; */
         justify-content: flex-start;
         padding-inline: 6%;
         flex-direction:row;
         grid-row: 2;
        } 
        
        
`;



