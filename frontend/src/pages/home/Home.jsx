import { Header } from "../../components/header/Header.jsx";
import { MainText } from "../../components/MainText/MainText.jsx";
import { Nav } from "../../components/navigation/Nav.jsx";
import { Main, Wrapper } from "./HomeStyled.jsx";
import { Switch } from "../../components/switcher/Switch.jsx";
export const Home = () => {
  return (
    <Wrapper>
      <Main>
          <Header/>     
          <Nav/> 
          <Switch /> 
          <MainText/>
      </Main>
    </Wrapper>
  )
}
