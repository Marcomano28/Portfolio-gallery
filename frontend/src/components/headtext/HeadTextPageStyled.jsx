import styled from "styled-components";

export const Wrapper = styled.div`
     position: relative;
     margin-left: 0.5;
     /* display: flex;
     justify-content: center;
     align-items: center;
     flex-direction:column; */
     margin-top:0.7rem;
     padding-bottom: 1.8rem;
`
export const InputContainer = styled.div`
     display:flex;
     justify-content:center;
     align-items:center;
     gap:1rem;
     margin-top:1.2rem;
`
export const Input = styled.input`
     color: ${props => props.theme.inputColorOnHover};
     background-color: ${props => props.theme.inputBackground};
     border-bottom: 2px solid #1e2e1f; 
     border-left:none;
     border-top:none;
     border-radius: 4px;
     padding:0.2rem 0.4rem; 
     z-index:10;
     cursor: default;
     box-shadow:inset 0px -2px 7px rgba(75, 93, 152, 0.39);    
     transition: border-color 0.3s, box-shadow 0.3s; 
     &:focus{
      border-color: #434825;
      outline: none;
      border-bottom: #0a0c00;
      box-shadow:inset 2px 2px 3px rgba(31, 37, 17, 0.99); /* Sombra verde al enfocar */
     }
     &:hover{
       background-color: ${props => props.theme.inputBackgroundOnHover}; 
     }
`
export const InputButton = styled.button`
     z-index:10;
     cursor: pointer;
     padding-block: 2px;
     border-radius: 6px;
     flex-shrink: 0;
     border: none;
     color: ${props => props.theme.inputButtonColor};
     padding: 0.2rem 0.5rem;
     background-color: transparent;
     box-shadow: ${props => props.theme.inputButtonShadow};
     transition-duration: 0.4s;
     &:hover{
             box-shadow: ${props => props.theme.inputButtonShadowOnHover};
             
            }
`