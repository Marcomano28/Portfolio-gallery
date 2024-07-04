import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.div`
         /* border:4px solid black;  */
         width:100%;
         height:100%;
         grid-row: 1;
         display:flex;
       @media (min-width: 340px) {                
         justify-content: center;
         padding:0 0;  
       }
       @media (min-width: 360px) {                
         justify-content: center;
         padding: 0 0.25rem;
       }
       @media (min-width: 375px) { 
        /* align-items:center;                */
        justify-content:center;
        padding: 0 0.2rem;
        }
       @media (min-width: 768px) {
        justify-content:flex-end;
        padding: 0 3.5rem;      
        }
       @media (min-width: 1024px) {
        justify-content:flex-end;
        padding: 0 1.5rem;        
        }
       @media (min-width: 1280px) {
        justify-content: flex-end;         
        }
       @media (min-width: 1440px) {
        justify-content: flex-end;          
        } 
       @media (min-width: 1920px) { 
        justify-content: flex-end;                     
        }
       @media (min-width: 2560px) { 
        justify-content: flex-end;             
        } 
       @media (min-width: 3840px) { 
        justify-content: flex-end;              
        } 
       @media (min-width: 4096px) { 
        justify-content: flex-end;               
        } 
`
export const Navy = styled.div`   
       width: fit-content;
       height:fit-content;
       display: flex; 
       align-items:center;
       justify-content: center;           
       box-shadow: inset 0 8px 10px -6px #000000;         
       z-index: 2;
       box-shadow: ${props => props.theme.boxShadow};
      @media (min-width: 340px) {                
       padding: 0.5rem 0.1rem;
       margin-top:1rem; 
      }
      @media (min-width: 360px) {                
       padding: 0.5rem 0.4rem;
       margin-top:1rem; 
      }
      @media (min-width: 375px) { 
       padding: 0.2rem 0.2rem;
       margin-inline:1.3rem;
       margin-top:1rem; 
       gap:0;            
       }
      @media (min-width: 768px) {
       padding: 0.5rem 0.4rem;
       margin-top:1rem; 
       }
      @media (min-width: 1024px) {
       padding: 0.7rem 0.7rem;
       margin-top:1.8rem;
       margin-inline:3rem;
       gap: 1rem;          
       }
      @media (min-width: 1280px) {
       padding: 0.7rem 0.7rem;
       margin-top:0.8rem;
       margin-inline:3rem;
       gap: 1rem;            
       }
      @media (min-width: 1440px) {
       padding: 0.7rem 0.7rem;
       margin-top:1.9rem;
       margin-inline:2rem;
       gap: 1rem;
      } 
`;
export const Btn = styled.button`
       /* padding: 0.1rem 0.3rem; */
       border-radius: 6px;
       border: none;
       background-color: ${props => props.theme.btnBack};
       box-shadow: inset 0 5px 5px -6px #907557;
       /* box-shadow: 0 -2px 6px rgb(69, 29, 24); */
       transition-duration: 0.4s;
      &:hover{
        box-shadow: inset 0 8px 10px -6px #774747;
      }
      @media (min-width: 340px) {                
       padding: 0.1rem;
       margin-inline:0.1rem;
       font-size: 0.5rem; 
       }
       @media (min-width: 360px) {                
       padding: 0.1rem;
       margin-inline:0.1rem;
       font-size: 0.5rem; 
       }
      @media (min-width: 375px) { 
       padding: 0.1rem;
       margin-inline:0.1rem;
       font-size: 0.8rem;    
       }
      @media (min-width: 768px) {
       padding: 0.2rem;
       margin-inline:0.3rem;
       font-size: 0.95rem; 
       }
      @media (min-width: 1024px) {
       padding: 0.2rem;
       margin-inline:0.2rem;
       font-size: 1.2rem;         
       }
      @media (min-width: 1280px) {
       padding: 0.3rem 0.7rem;
       margin-inline:0.1rem;
       font-size: 0.8rem;           
       }
      @media (min-width: 1440px) {
       padding: 0.4rem 0.75rem;
       
      } 
      @media (min-width: 1920px) {
                 
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
`;
export const BtnLink = styled(Link)`
        color: ${pros => pros.theme.colorBtnAbout};
        border-radius: 15px;
        text-decoration: none;
        padding: 0.2rem 0.5rem;
        
       &:hover{
        margin: 0.7rem 0;
        color: ${props => props.theme.onHoverColorAbout};
        background-color: ${props => props.theme.btnLink};
        box-shadow: ${props => props.theme.shadowBtnAbout};
        transition: 0.2s;
        transform: translateY(2px);
        
       }
`