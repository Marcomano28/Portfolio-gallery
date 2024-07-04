import styled, {keyframes} from 'styled-components';
import Modal from 'react-modal';

const oscillate = keyframes`
             0% { transform: rotateY(90deg); }
             30% { transform: rotateY(-90deg); }
             40% { transform: rotateY(70deg); }
             50% { transform: rotateY(-60deg); }
             60% { transform: rotateY(40deg); }
             70% { transform: rotateY(-20deg); }
             80% { transform: rotateY(10deg); }
             90% { transform: rotateY(-5deg); }
             100% { transform: rotateY(0deg); }
`;
export const HeaderContact = styled.h2`
     font-size: 1.3rem;
`
export const StyledModal = styled(Modal)`
  /* &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.15) !important;
    perspective: 1500px;
    z-index: 10;
  } */

  &.ReactModal__Content {
    position: absolute;
    top: auto;
    left: auto; 
    overflow: visible;
    border: 1px solid #de626275;
    box-shadow: inset 0 0px 16px rgba(69, 37, 45,1);
    background: #bbe2f613;
    border-radius: 4px;
    outline: none;
    padding: 1rem;
    perspective: 1500px;
    @media (min-width: 340px) {                
      
       }
    @media (min-width: 360px) {                
        
       }
    @media (min-width: 375px) { 
        right: 2rem;
        bottom: 2rem;
        width:50%;
        height:25%;      
     }
    @media (min-width: 768px) {
        right: 3.8rem;
        bottom: 0.8rem;
        width:38%;
        height:20%;  
     }
    @media (min-width: 1024px) {
         right: 4rem;
         bottom: 4rem; 
         width:44%;
         height:34%;      
     }
    @media (min-width: 1280px) {
         right: 4rem;
         bottom: 3rem; 
         width:40%;
         height:34%;             
     }
    @media (min-width: 1440px) {
        right: 5rem;
        bottom: 3rem;
        width:24%;
        height:32%; 
                    
     } 
     @media (min-width: 1920px) {
                 
     }
     @media (min-width: 2560px) {
      
      
     } 
     @media (min-width: 3840px) {
     
      
     } 
     @media (min-width: 4096px) {
     
      
     }     
  }
`;
export const StyledModalContent = styled.div`
             animation: ${oscillate} 5s ease-in-out 1;
             /* position: fixed; */
             transform-origin:right;
             z-index:50;
             /* border: 2px solid blue; */
             box-shadow: inset 0 8px 10px -6px #907171bf;
             height:100%;
             width: 100%;
             perspective:1500px;
             -webkit-overflow-scrolling:touch;
             outline:none;
             border-radius:6px;
             background: rgba(0, 0, 0, 0.25);
             /* overflow:auto; */
             display: flex;
             align-items:start;           
             justify-content: center; 
             color: #a1544c;
             flex-direction:column;
             overflow: visible; 
             box-shadow: ${props => props.theme.modalBxShadow}; 
            @media (min-width: 375px) { 
             
             }
            @media (min-width: 768px) {
              
             }
            @media (min-width: 1024px) {
              padding-inline:1.8rem;
              gap: 8%;          
             }
            @media (min-width: 1280px) {
                          
             }
            @media (min-width: 1440px) {
              padding-inline:1.8rem;
              gap: 8%;       
             }          
`; 
export const Input = styled.input`
            background: rgba(30, 60, 30, 0.25);
            color: rgba(216, 216, 178, 0.727);
         &:focus{
            outline:none;
            box-shadow: inset 0 8px 8px -12px #798334cb;
            border-color: #fa807258;
           }
         &::placeholder{
            color: ${props => props.theme.inputFormCol};
         }
         @media (min-width: 375px) { 
             
         }
        @media (min-width: 768px) {
      
         }
        @media (min-width: 1024px) {
          padding:0.2rem;
          width:100%;
          height:18%;
          margin-bottom: 0.7rem;          
         }
        @media (min-width: 1280px) {
          padding:0.2rem;
          width:100%;
          height:18%;
          margin-bottom: 0.7rem;            
         }
        @media (min-width: 1440px) {
          padding:0.2rem;
          width:100%;
          height:14%;
          margin-bottom: 0.7rem;       
        } 
` 
export const TexTarea = styled.textarea`
           background: rgba(30, 60, 30, 0.25);
           padding:0.4rem;
           height: 16%;
           width:80%;
           margin-bottom: 0.4rem;
           color: rgba(216, 216, 178, 0.727);
         &:focus{
           outline:none;
           box-shadow: inset 0 8px 8px -12px #798334cb;
           border-color: #fa807258;
          
         }
         &::placeholder{
            color: ${props => props.theme.inputFormCol};
          } 
          @media (min-width: 375px) { 
             
            }
           @media (min-width: 768px) {
         
            }
           @media (min-width: 1024px) {
            width:100%;
             height:38%;         
            }
           @media (min-width: 1280px) {
                         
            }
           @media (min-width: 1440px) {        
             width:100%;
             height:38%;
                 
           } 
`
export const ModalButton = styled.button`
           margin: 0.5rem auto;
           align-items:center;
           z-index:2;
           font-size:0.8rem;
           padding: 0.15rem 1rem;
           color: ${props => props.theme.modalFormCol};
           border-radius: 6px;
           border: none;
           background-color: transparent;
           box-shadow: inset 0 5px 5px -6px #241b10;
           /* transition: background-color 0.3s; */
           transition-duration: 0.4s;
           cursor: pointer;
         &:hover{
           box-shadow: ${props => props.theme.onHoverShadow};
           color: ${props => props.theme.onHoverBtn};
          }          
`

