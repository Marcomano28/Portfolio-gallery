import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 47.5vh;
  width: 100%;
  overflow: hidden;
  perspective: 50px;
  transition: all 2.5s ease-in-out;
  box-shadow: 0 0 75px 30px black;
  &:hover .bg {
    transform: scaleY(1.3);
  }
  &:hover #heading {
    text-shadow: ${props => props.theme.textMainOnHover};
    transform: translate(-50%, -50%) scale(1.1) translateY(-60px) rotateX(5deg);
  }
`;
export const BgVideo = styled.video`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 3.5s ease-in;
      filter: ${props => props.theme.backVideoFilter};
      mask-image: ${props => props.theme.backVideoMask};
`;
export const Title = styled.h1`
      position: absolute;
      /* left: 39vw; */
      transform: translate(-50%, -50%) scale(1) translateZ(0);
      font-size: 10rem;
      -webkit-text-stroke: 1px rgb(109, 95, 76);
      text-shadow: 1px 1px 2px rgb(100, 121, 81), 0 0 1em rgba(172, 120, 64,0.4), 0 0 0.1em rgba(73, 123, 117,0.3);
      text-align: center;
      /* font-weight: bold; */
      mix-blend-mode:difference;
      transition: transform 2.5s ease-in-out,text-shadow 1.2s ease-in-out;
            @media (min-width: 375px) {
              top: 91.0%;
              left: 27vw;
              font-size:4.4rem;
            }
            @media (min-width: 768px) {
              top: 86.5%;
              left: 33vw;
              font-size:7.5rem;  
            }
            @media (min-width: 1024px) {
              top: 84.7%;
              left: 35vw;
              font-size:8rem;          
            }
            @media (min-width: 1280px) {
              top: 85.0%;
              left: 38vwvw;
              font-size:9rem;            
            }
            @media (min-width: 1440px) {
              top: 85.2%;
              left: 39vw;
              font-size:10rem;           
            }
            @media (min-width: 1920px) {
              top: 86.0%;
              left: 39vw;
              font-size:10rem;           
            }
      span:nth-child(2) {
            transform-origin: left;
            position: absolute;
            left: 98%;
            bottom: 4%;
            font-size: clamp(0.1em ,0.8em ,1em);
            font-weight: 100; 
            transition: color 0.3s;
            border-bottom: 1px solid transparent; 
            transition: all 2.5s ease-in-out; 
            z-index: -2;
            mix-blend-mode:difference;
      &:hover {
        text-shadow: ${props => props.theme.textMainOnHover};
            transform: translateY(-32px) translateX(-16px)scale(0.8);
    }
  } 
`
export const Button = styled.button`
        background-color: white;
        padding:1rem;
        z-index:3;
`
