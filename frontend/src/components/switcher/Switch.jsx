import { useTheme } from '../../contexts/ThemeProvider.jsx';
import { Input, Label , Span, Box } from './SwitchStyled.jsx';

export const Switch = () => {
const { toggleTheme } = useTheme();

  return (
    <Box>      
        <Input 
           id="theme-toggle" 
           type="checkbox" 
           onChange={toggleTheme} 
           hidden 
          />
        <Label htmlFor="theme-toggle"><Span>Toggle Theme</Span></Label>
    </Box>
  )
}
