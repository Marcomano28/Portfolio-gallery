import styled from "styled-components";

export const Message = styled.p`
    z-index:3;
    background-image:${props => props.theme.textCityColor}; 
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top:0.6rem;
    font-size: 1rem;
`