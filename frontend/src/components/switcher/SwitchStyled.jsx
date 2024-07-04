import styled from "styled-components";

export const Box = styled.div`
  position:relative;
  width:100%;
  height:100%;             
  @media (min-width: 375px) {
      margin-top: 0.5rem;
      margin-right: 0rem;        
    }
    @media (min-width: 768px) {
      margin-top: 1rem;
      margin-right: 1.4rem;
    }
    @media (min-width: 1024px) {
      margin-top: 0.6rem; 
      margin-right: 1.6rem;         
    }
    @media (min-width: 1280px) {
      margin-top: 0.4rem;
      margin-right: 1.8rem;            
    }
    @media (min-width: 1440px) {
      margin-top: 0.2rem;
      margin-right: 5rem;            
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
       transition: background-color 200ms ease-in-out;
       width: 1.9rem;
       height: 0.7rem;
       border-radius: 8px;
       text-align: center;
       background-color: #b78042;
       box-shadow: -2px 2px 5px 3px inset rgba(27, 0, 0, 0.8);
       @media (min-width: 375px) {                
          right: 1.4rem;
          width: 1.4rem;        
        }
        @media (min-width: 768px) {
          bottom: 1.2rem;
          right: 2rem;
          width: 1.7rem;
        }
        @media (min-width: 1024px) {
          bottom: 1.2rem;
          right: 2.1rem;
          width: 2rem;         
        }
        @media (min-width: 1280px) {
          right: 1.8rem;
           bottom: 0.4rem;             */
        }
        @media (min-width: 1440px) {
          right: 2.5rem; 
          bottom: 0.4rem;           
        } 
     
  &::before, &::after {
       font-size: clamp(0.5rem, 0.9rem, 1.2rem);
       position: absolute;
       transform: translate3d(0, -50%, 0);
       top: 50%;
  }
  &::before {
       content: "☾";
       right: 100%;
       margin-right: 0.5rem;
       color: lightSlateGray;
  }
    &::after {
       content: "☼";
       left: 100%;
       margin-left: 0.5rem;
       color: orange;  
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