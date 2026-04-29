import styled, { css } from "styled-components";
import { device } from "../../utils/breakPoints";

export const CanvasSection = styled.div`
  width: 100%;
  height: 100%;
  /* border: 2px solid red; */
  padding-bottom: 2rem;
  position: relative;

  ${(props) => props.$isFullscreen && css`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    z-index: 9999;
    background: #000;
    padding-bottom: 0;
    overflow: hidden;
  `}
`;

export const Imag = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0.5rem;
  padding-bottom: 1.5rem;

  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    padding: 1rem;
    padding-bottom: 2rem;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`;

export const Button = styled.button`
  margin: 0rem auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  z-index: 2;
  font-size: 0.7rem;
  padding: 2px 15px;
  color: rgb(112, 112, 67);
  border-radius: 6px;
  border: none;
  background-color: transparent;
  box-shadow: inset 4px 5px 5px -4px #d3a065;
  transition: background-color 0.3s, top 0.3s, right 0.3s, bottom 0.3s,
    left 0.3s, transform 0.3s, color 0.3s;
  transition-duration: 0.4s;
  text-shadow: 2px 2px 3px black;
  cursor: pointer;

  &:hover {
    box-shadow: inset 1px 9px 8px -6px #312325;
    color: rgb(204, 204, 121);
  }

  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    bottom: 0.5%;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }

  ${(props) => props.$isFullscreen && css`
    bottom: 1rem;
  `}
`;

export const FullscreenButton = styled.button`
  position: absolute;
  right: 0.55rem;
  bottom: 0;
  transform: translateY(-50%);
  z-index: 3;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(240, 240, 240, 0.2);
  background-color: rgba(10, 10, 10, 0.34);
  color: rgba(242, 242, 242, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: rgba(10, 10, 10, 0.48);
    color: rgba(242, 242, 242, 0.95);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    transform: translateY(-50%) scale(1.04);
  }

  ${(props) => props.$isFullscreen && css`
    display: none;
  `}
`;

export const Canvas = styled.div`
  touch-action: none;
  display: ${(props) => (props.$isActive ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 97%;
  height: 95%;
  transform: translate(-50%, -50%);

  ${(props) =>
    props.$isLandscapeMobile &&
    `
    width: 100%;
    height: 98%;
  `}

  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    height: 94%;
    transform: translate(-50%, -51%);
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }

  ${(props) =>
    props.$isFullscreen &&
    css`
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      transform: translate(-50%, -50%);
      padding: 0;
      overflow: hidden;
      display: block;

      & > canvas {
        position: absolute;
        inset: 0;
        display: block;
        width: 100% !important;
        height: 100% !important;
      }
    `}
`;
