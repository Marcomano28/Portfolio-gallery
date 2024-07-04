import { ThemeProvider as StyledThemeProvider} from "styled-components"
import { GlobalStyles } from "../styledComponents/GlobalStyle/GlobalStyles";
import { darkTheme } from "../themes/darkTheme";
import { lightTheme } from "../themes/lightTheme";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light':'dark');
  };

  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles/>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
