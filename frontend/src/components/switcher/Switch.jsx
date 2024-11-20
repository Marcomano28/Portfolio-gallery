import { useTheme } from '../../contexts/ThemeProvider.jsx';
import { Input, Label , Span, Box } from './SwitchStyled.jsx';
import { useDeviceOrientation } from '../customHooks/useDeviceOrientation.jsx';

export const Switch = () => {
const { toggleTheme } = useTheme();
const isLandscapeMobile = useDeviceOrientation();

  return (
    <Box $isLandscapeMobile={isLandscapeMobile}>      
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
