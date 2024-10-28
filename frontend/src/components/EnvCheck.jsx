import { useEffect } from 'react';

const EnvCheck = () => {
  useEffect(() => {
    const checkEnv = () => {
      const vars = {
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_KEY_TZ: import.meta.env.VITE_API_KEY_TZ,
        MODE: import.meta.env.MODE
      };

      console.log('Environment Check:', {
        ...vars,
        VITE_API_KEY: vars.VITE_API_KEY ? 'Present' : 'Missing'
      });

      // Hacer una petición de prueba a OpenWeatherMap
      const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&lang=es&units=metric&appid=${vars.VITE_API_KEY}`;
      
      fetch(testUrl)
        .then(response => {
          console.log('OpenWeatherMap Test Response:', {
            status: response.status,
            ok: response.ok
          });
          return response.json();
        })
        .then(data => {
          console.log('OpenWeatherMap Test Data:', data);
        })
        .catch(error => {
          console.error('OpenWeatherMap Test Error:', error);
        });
    };

    checkEnv();
  }, []);

  return null;
};

export default EnvCheck;