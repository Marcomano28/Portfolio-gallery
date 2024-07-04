import styled from "styled-components";


export const ScreenContainer = styled.div` 
      border: 3px solid violet;  
       height: 68%;
       width: 76.3%;
       display: flex;
       align-items: start;
       justify-content: center;
       border-radius: 10px;
       background: rgb(56, 72, 72);
       box-shadow: 20px 20px 20px rgba(16, 15, 15, 0.689), 20px 30px 50px rgba(17, 18, 18, 0.9);
       z-index: 6;
`
export const Pane = styled.div`     
        width: 80%;
        height: 74.5%;
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
`
export const SomeVideo = styled.video`
        width: 100%;
        height: 100%; 
        padding: 0.3rem;
        margin: 0 0.2rem 1.2rem 0.4rem;     
        border-radius: 10px;
        z-index: 6;
        box-shadow: ${props => props.theme.screenShadow};
`
export const Title = styled.h1`
       font-size: 2.4rem;
       margin-top: 52px;
       margin-left: 275px;
       color: hsl(193, 26%, 28%);
       text-shadow: 2px 2px 5px black;
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(0, 0, 0, 0.5);
`
export const Title1 = styled.h1`
       font-size: 2.2rem;
       margin-top: -2px;
       margin-left: 294px;
       color: hsl(192, 33%, 17%);
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.5);
`
export const Title2 = styled.div`
       font-size: 1.6rem;
       margin-top: -4px;
       margin-left: 315px;
       font-weight: bolder;
       font-stretch: 2;
       color: hsl(192, 33%, 17%);
       border-end-end-radius: 20px;
       box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
`
export const Title3 = styled.h3`
       font-size: 1rem;
       text-align: center;
       margin-right: 52px;
       margin-top: 3px;
       color: hsl(192, 33%, 17%);
       border-end-end-radius: 20px;
      
`
export const Title4 = styled.h3`
       font-size: 1rem;
       text-align: center;
       margin-right: 30px;
       margin-top: 5px;
       color: hsl(192, 33%, 17%);
       border-end-end-radius: 20px;
`