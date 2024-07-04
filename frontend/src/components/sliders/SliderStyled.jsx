import styled from "styled-components";

export const SlideWrapper = styled.div`
       width: 100%;
       height: 100%;
       display: flex;
       align-items: end;
       justify-content: center;
       /* border: 2px solid red; */
       grid-column: 1 / span 2;
       grid-row: 2/span 2;
       z-index: 5;
       position: relative;
`;
export const CardSlide = styled.div`
       z-index: 2;
       width: 85%; 
       height: 55%;
       display: flex;
       flex-wrap: nowrap;
       flex-direction: column;
       /* align-items:center; */
       justify-content: start;
       gap: 0.8rem;
       margin-bottom: 0.8rem;
    
`;



