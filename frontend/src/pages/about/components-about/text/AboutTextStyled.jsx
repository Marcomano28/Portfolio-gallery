import styled from "styled-components";


export const FunnyText = styled.h3`
          /* border: 2px solid purple; */
          display: inline-flex;
          justify-content: center;
          color: rgba(170, 169, 143, 0.617);
          /* font-weight: 600; */
          transform-origin: top right;  
          text-shadow: ${props => props.theme.introTextShadow};
          @media (min-width: 340px) {                
      
          }
          @media (min-width: 360px) {                
              
          }
           @media (min-width: 375px) { 
              
          }
          @media (min-width: 768px) {
          
           }
          @media (min-width: 1024px) {
            font-size: 0.8rem;
            margin-left:0rem; 
           }
          @media (min-width: 1280px) {
                    
           }
          @media (min-width: 1440px) {
            font-size: 1.6rem;
            margin-left:0.2rem;              
           } 
           @media (min-width: 1920px) {
                       
           }
           @media (min-width: 2560px) {
                       
           } 
           @media (min-width: 3840px) {
                      
           } 
           @media (min-width: 4096px) { 
          }          
`;
export const Span = styled.span`
          display: flex;
          letter-spacing: 0.6rem;
          transform: rotate(0);
          transform-origin: top left;
          transition: transform 1.3s ease, letter-spacing 1.3s ease-in-out; 
          will-change: transform;
          @media (min-width: 340px) {                
      
           }
           @media (min-width: 360px) {                
               
           }
            @media (min-width: 375px) { 
               
           }
           @media (min-width: 768px) {
           
            }
           @media (min-width: 1024px) {
            letter-spacing: 0.2rem;
            }
           @media (min-width: 1280px) {
                     
            }
           @media (min-width: 1440px) {
                         
            } 
            @media (min-width: 1920px) {
                        
            }
            @media (min-width: 2560px) {
                        
            } 
            @media (min-width: 3840px) {
                       
            } 
            @media (min-width: 4096px) { 
           }  
`
export const AboutTextContainer = styled.div` 
          position: relative; 
          display: flex;
          justify-content: flex-start;
          align-items: center;
          grid-row:2;
        &:hover ${Span}{
          transform: rotate(calc(var(--index) * 1deg));
          letter-spacing: calc(var(--index) * 1px);
        } 
        @media (min-width: 375px) {                
          width:100%;
          height:30%; 
          margin-bottom:0.5rem; 
          padding-left:1.3rem;    
         }
        @media (min-width: 768px) {
          width:100%;
          height:50%; 
          margin-bottom:0.5rem;
          padding-left:1.4rem;  
         }
        @media (min-width: 1024px) {
          margin-top:6rem; 
          transform:translateX(-1rem); 
          
         }
        @media (min-width: 1280px) {
          margin-top:6rem; 
          transform:translateX(0.4rem);            
         }
        @media (min-width: 1440px) {
          margin-top:8rem;
          /* margin-bottom: 3rem; */
     
        }          
`;
export const InfoWrap = styled.div`          
          /* border: 1px solid orange;  */
          /* position:absolute;
          left:-2rem; */
          width:90%;
          height:90%;
          position:relative;
          display: flex;         
          justify-content: center;
          align-items: center;
          flex-direction: column;        
`;
export const KeyText = styled.div`
          width:100%;   
          /* border: 2px solid green; */
          box-shadow: inset 3px 3px 7px #38361ac6 ,
          inset -3px -3px 7px rgba(63, 13, 13, 0.652);
          border-radius: 0 10px 50px 0px;
          display: flex;
          justify-content:flex-start;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: nowrap;
          
        @media (min-width: 375px) { 
          /* transform:translateY(-2rem);            
           order:2;
           gap:0;      */
         }
        @media (min-width: 768px) {
           order:2;
         }
        @media (min-width: 1024px) {
           order:1;
           gap: 0.1rem;        
         }
        @media (min-width: 1280px) {
          order:1;
           gap: 0.1rem;           
         }
        @media (min-width: 1440px) {
           order:1;      
          
         } 
`;
export const MainText = styled.h2`
          /* border: 1px solid yellow; */
          color: rgba(216, 216, 178, 0.725);
          /* font-weight: 400; */
          text-transform: capitalize;
          flex-shrink: 0;
          text-shadow: ${props => props.theme.introTextShadow};
         @media (min-width: 375px) {

         } 
         @media (min-width: 768px) {
            
            
          }
         @media (min-width: 1024px) {
           font-size:1rem;         
          }
         @media (min-width: 1280px) {
                       
          }
         @media (min-width: 1440px) {
            font-size: 1.9vw;       
          } 
`;
export const Button = styled.button`
          position:absolute; 
          z-index:5;        
          font-size: 0.9rem;
          padding: 0.35rem 1.5rem;
          color:#a1544c;
          border-radius: 0 10px 50px 50px;
          background-color: transparent;
          border: none;
          box-shadow: inset 0 4px 6px 0px #4e2f2f;
        &:hover{
           color: ${props => props.theme.onHoverColorAboutModalBtn};
           transform: translateY(2px);
           box-shadow: inset 0 -3px 5px 0px #774747;
           text-shadow:${props => props.theme.textShadowKey}; 
          }
           @media (min-width: 375px) { 
            padding: 0.2rem 0.5rem;
            right:8%;
            bottom:25%;
          }
           @media (min-width: 768px) {
            right: 12%;
            bottom: 47%; 
          }
           @media (min-width: 1024px) {
            right: 12%;
            bottom: 46%;           
          }
           @media (min-width: 1280px) {
            padding-right:0.5rem;
            padding:0.2rem 0.5rem;
            right: 14%;
            bottom: 50%;            
          }
           @media (min-width: 1440px) { 
             padding-right:1rem;
             padding:0.4rem;
             right: 16%;
             bottom: 42%;  
          } 
           @media (min-width: 1920px) {
            padding-right:1rem;
             padding:0.4rem;
             right: 16%;
             bottom: 42%;           
          }
            @media (min-width: 2560px) {
           padding: 0.5rem 0.8rem;
           
          } 
            @media (min-width: 3840px) {
             padding: 0.6rem 0.9rem;
             
          } 
            @media (min-width: 4096px) {
             padding: 0.7rem 1rem;
             
          }  
`  ; 