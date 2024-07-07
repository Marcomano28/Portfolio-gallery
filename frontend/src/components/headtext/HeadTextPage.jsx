import { InputContainer, Input, InputButton, Wrapper } from "./HeadTextPageStyled";
import { WeatherContext } from "../../contexts/weatherContext";
import { useContext } from "react";

export const HeadTextPage = ({text, showInput, displayContent}) => {
  const { setCity, fetchWeather } = useContext(WeatherContext);

  const handleCityChange = (value) => {
    setCity(value);  // Actualiza el contexto con la nueva ciudad
  };
  const handleFetchWeather = () => {
    fetchWeather();  // Llama a la función fetchWeather del contexto
  };
  return (
    <Wrapper>
      <p>{text}</p>
      {showInput && (
      <InputContainer>
      <Input 
         type="text" 
         placeholder="The city of you dreams"
         onChange={e => handleCityChange(e.target.value)}
         />
      <InputButton onClick={handleFetchWeather}>dream</InputButton>
      </InputContainer>  
      )}
      {displayContent}  
    </Wrapper>
  )
}