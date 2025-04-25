import { createContext, useState } from "react";
import moment from "moment-timezone";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Determinar la URL base según el entorno
const isProduction = window.location.hostname !== 'localhost';
const baseUrl = isProduction 
  ? 'https://artcode-backend-production.up.railway.app/api'
  : '/api';

countries.registerLocale(enLocale);

const calculateLocalTime = (utcOffset) => {
    const nowUtc = moment.utc();
    return nowUtc.add(utcOffset, 'seconds').format('HH:mm');
  }
  function getLocalTimeFromUnix(unixTimestamp, timezone) {
    return moment.unix(unixTimestamp).tz(timezone).format('HH:mm');
}
async function fetchTimeZone(lat, lon) {
  const apiKey = import.meta.env.VITE_API_KEY_TZ;
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
          return data.zoneName;
      } else {
          throw new Error(data.message);
      }
  } catch (error) {
     console.error('Error fetching timezone data:', error);
     return null;
  }
}
async function getLanguage(countryCode) {
  if (!countryCode) {
    console.error('No country code provided');
    return [];
  }

  const url = `${baseUrl}/languages/${countryCode}`;
  try {
    console.log('Fetching languages from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No languages found for country: ${countryCode}`);
        return ['en']; // Fallback to English if no languages found
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Could not fetch languages:', error);
    return ['en']; // Fallback to English in case of error
  }
}
export const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setError(null);
        if (!isNaN(city)) {
          setError('Please enter a valid city, not a number.');
          return;
        }
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
          try {
              const response = await fetch(URL);
              if (!response.ok) {
                if(response.status === 404){
                 setError('City not found. Please enter a valid city.')
                }else{
                  setError('Request error. Please try again.')
                }
                 return;
              }
              const data = await response.json();
              const localTime = calculateLocalTime(data.timezone);
              // console.log(localTime);
              const lat = data.coord.lat;
              const lon = data.coord.lon;
              const timeZone = await fetchTimeZone(lat, lon);
              const sunriseUnix = data.sys.sunrise;
              const sunsetUnix = data.sys.sunset;
              const sunriseLocalTime = getLocalTimeFromUnix(sunriseUnix, timeZone);
              const sunsetLocalTime = getLocalTimeFromUnix(sunsetUnix, timeZone);
              const country = data.sys.country;
              const languages = await getLanguage(country);

            let matchedFrase = null;
            let firstFrase = null;

            for (let lang of languages) {
              try {
                const Url = `${baseUrl}/frase/${lang}`;
                const fraseResponse = await fetch(Url);
                if (fraseResponse.ok) {
                  const fraseData = await fraseResponse.json();
                  if (fraseData && fraseData.length > 0) {
                    if (!firstFrase) {
                      firstFrase = fraseData[0];
                    }
                    if (!matchedFrase && languages.includes(fraseData[0].language)) {
                      matchedFrase = fraseData[0];
                      break;
                    }
                  }
                }
              } catch (error) {
                console.error(`Error fetching phrase for language ${lang}:`, error);
              }
            }

            const finalFrase = matchedFrase || firstFrase || {
              language: 'en',
              text: 'Welcome to our weather app!'
            };

            const enhancedWeatherData = {
              ...data,
              localTime: localTime,
              timezone: timeZone,
              sunriseHour: sunriseLocalTime,
              sunsetHour: sunsetLocalTime,
              language: finalFrase.language,
              frase: finalFrase
            };
            setWeatherData(enhancedWeatherData);
            setError('');
          } catch (error) {
              console.error('Failed to fetch weather data:', error);
              setError('Failed to fetch weather data. Please try again.');
          }
      };
   return(
    <WeatherContext.Provider value={{city, setCity, weatherData, fetchWeather, error}}>
        {children}
    </WeatherContext.Provider>
   );
}