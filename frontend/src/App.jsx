
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";
import {AboutMe } from './pages/about/AboutMe.jsx';
import pagesData from "./pages/pagesData.js";
import { GenericPage } from './components/genericPage/GenericPage.jsx';
import { WeatherProvider } from "./contexts/weatherContext.jsx";
function App() {
  return ( 
      <ThemeProvider >
        <Routes>
          <Route path="/" element={<Home />}/>
            {pagesData.map(page =>(
              <Route
                key={page.path}
                path={page.path}
                element={
                  <WeatherProvider>
                    <GenericPage windowData={page.windows}/>
                  </WeatherProvider>              
                }/>
            ))}
          {/* <Route path="/interact"element={<Interact/>}/> */}
          <Route path="/aboutme"element={<AboutMe/>}/>
        </Routes>
      </ThemeProvider>
  );
}
export default App;
