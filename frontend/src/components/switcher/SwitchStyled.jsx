import styled from "styled-components";
import { device } from "../../utils/breakPoints";

export const Box = styled.div`
    position:relative;
    width:100%;
    height:100%;
    margin-top: 1.6rem; 
    margin-right: 1rem;             

    @media ${device.mobileL} { // 425
    }
    @media ${device.tablet} { // 768
    } 
    @media ${device.laptop} { // 1024
      margin-top: 0.6rem; 
      margin-right: 1.6rem;
    }
    @media ${device.laptopL} { // 1440
      margin-top: 0.2rem;
      margin-right: 5rem;
    }
    @media ${device.desktop} { // 2560
    }
`
export const Input = styled.input`
      position: absolute;
      z-index: 1;
      opacity: 0;
      &:hover + label, 
      &:focus + label {
        background-color: lightSlateGray;
      }
    
      &:hover + label span::after, 
      &:focus + label span::after {
        background-color: #efcb78;
        box-shadow:inset 1px 1px 4px 4px rgba(6, 1, 23, 0.716);
      }
      &:checked ~ label {
        background-color: lightSlateGray;
      }
    
      &:checked ~ label::before {
        color: lightSlateGray;
      }
    
      &:checked ~ label::after {
        color: turquoise;
      }
    
      &:checked ~ label span::after {
        transform: translate3d(15px, 0, 0);
      }
        
`
export const Label = styled.label`
       position: absolute;
       bottom:0.5rem;
       z-index: 1;
       padding: 0.1rem;
       margin: 0.1rem;
       right: 1.4rem;
       width: 1rem;
       transition: background-color 200ms ease-in-out;
       width: 1.9rem;
       height: 0.7rem;
       border-radius: 8px;
       text-align: center;
       background-color: #b78042;
       box-shadow: -2px 2px 5px 3px inset rgba(27, 0, 0, 0.8);
       
        @media ${device.mobileL} { // 425
        }
        @media ${device.tablet} { // 768
        } 
        @media ${device.laptop} { // 1024
          bottom: 1.2rem;
          right: 2.1rem;
          width: 2rem; 
        }
        @media ${device.laptopL} { // 1440
          right: 2.5rem; 
          bottom: 0.4rem;
        }
        @media ${device.desktop} { // 2560
        }
     
  &::before, &::after {
       font-size: clamp(0.5rem, 0.9rem, 1.2rem);
       position: absolute;
       transform: translate3d(0, -50%, 0);
       top: 50%;
  }
  &::before {
       content: "☼";
       right: 100%;
       margin-right: 0.5rem;
       color: orange;  
  }
    &::after {
       content: "☾";
       left: 100%;
       margin-left: 0.5rem;
       color: lightSlateGray;
  }
  span {
    
    position: absolute;
    bottom: calc(100% + 0.7rem);
    left: 0;
    width: 100%;
    &::after {
      position: absolute;
      top: calc(100% + 0.55rem);
      left: 0.1rem;
      width: 1rem;
      height: 1rem;
      content: "";
      border-radius: 50%;
      background-color: #59a2cf;
      transition: transform 200ms, background-color 200ms;
      box-shadow:inset 2px 3px 5px 4px rgba(18, 1, 1, 0.9);
    }
  }     
`
export const Span = styled.span`
    position: absolute;
		bottom: calc(100% + 0.9rem);
		left: 0;
    color:transparent;
		width: 100%;
             &::after{
                position: absolute;
		top: calc(100% + 1rem);
		left: 0.2rem;
		width: 1rem;
		height: 1rem;
		content: '';
		border-radius: 50%;
		background-color: lightBlue;
		transition: transform 200ms, background-color 200ms;
    box-shadow: -3px 3px 8px rgba(0, 0, 0, 0.4);
    }
`