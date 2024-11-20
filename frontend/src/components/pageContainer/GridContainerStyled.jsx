import styled from "styled-components";

 export const Container = styled.div` 
                position: relative;
                width: 100%;
                height: 100vh;
                background:  ${props => props.$isMobileDevice ? props.theme.gradLight : props.theme.background};
                z-index: 0;
                
             &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                display: ${(props) => (props.$isMobileDevice ? 'none' : 'block')};
                background: ${props => props.$isMobileDevice ? 'none' : props.theme.backgroundImage};
                mix-blend-mode: difference;
            }          
    
          
 `