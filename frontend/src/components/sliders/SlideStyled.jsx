import styled from "styled-components"; 

export const Input = styled.input`
       display: none;
      &:checked + label{
        height: 30vw;
      }
      &:checked + label .description {
        opacity: 1 !important;
        transform: translateY(0) !important;
  }
`;
export const Label = styled.label`
        z-index: 2;
        height: 25px;
        background-size: cover;
        background-position: bottom;
        cursor: pointer;
        overflow: hidden;
        border-radius: 1.2rem;
        padding: 0.4rem 0.5rem 1.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        transition: 0.6s cubic-bezier(0.28,-0.03,0,0.99);
        border-bottom: 3px solid black;
        box-shadow: 0 10px 30px -5px rgba(63, 7, 49, 0.8);
        position: relative;
        background: ${props => props.theme.backGrad};
        
      &::before{
        content: '';
        position: absolute;   
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        z-index: -1;
        width: 100%;
        height: 100%;  
        background-image: ${props => props.theme.backMaravilla};                  
        background-size: 100px 50px;
        mix-blend-mode:difference;
      }
`;
export const Row = styled.div`
        color: white;
        display: flex;
        flex-wrap: nowrap; 
`;
export const Icon = styled.div`
        background:rgb(34, 65, 69);
        color: rgb(193, 169, 82);
        font-size: 0.6rem;
        border-radius: 6px;
        width:20px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
`;
export const Description = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        /* overflow: hidden; */
        position: absolute;
        bottom: 0.5rem;
        text-align: center;
        left: 0;
        width: 100%;
        opacity: 0;
        background-color: transparent;
        transform: translateY(20px);
        transition-delay: 0.3s;
        transition: all 0.7s ease;
        mix-blend-mode:hard-light;
        padding:4rem;
`;
export const DescriptP = styled.p`
         /* color: rgb(201, 229, 239); */
         color: rgb(216, 216, 178);
         font-weight: 900;
         font-size: 1rem;
         text-shadow:
         -1px -1px 0 #3f3b27,  
          1px -1px 0 #000,
         -1px 1px 0 #000,
          1px 1px 0 #000; 
         padding-top: 7px;
         box-shadow: 0 10px 10px rgba(0, 0, 0, 0.9), 0px 0px 50px rgba(0, 0, 0, 0.9);
`;
export const DescriptH = styled.h4`
         color: rgb(201, 229, 239);
         font-size: 1rem;
         text-transform: uppercase;
         z-index: 5;
`