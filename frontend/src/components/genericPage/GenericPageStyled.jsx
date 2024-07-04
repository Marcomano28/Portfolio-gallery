import styled from "styled-components";

export const WindowContainer = styled.div`
       position: relative;
       width: 100%;
       height: 100vh;
       background: ${props => props.theme.background};
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
       background: ${props => props.theme.backgroundImage};
       mix-blend-mode: difference;
      }
`