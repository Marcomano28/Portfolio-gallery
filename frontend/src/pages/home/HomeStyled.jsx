import styled from "styled-components";
export const Wrapper = styled.div`
  position: relative;
`
export const Main = styled.div `
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 0;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-image:  ${props => props.theme.backgroundImage};
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
    z-index: -2;
    /* background-image: var(--back-2); */
    background:  ${props => props.theme.background};
    mix-blend-mode: difference;
    }
`;