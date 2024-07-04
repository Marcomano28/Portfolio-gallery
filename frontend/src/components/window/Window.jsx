import { GridLayout } from "../layout/GridLayout";
import { GridContainer } from "../pageContainer/GridContainer"
import { Nav } from "../navigation/Nav";
import { Video } from "../video/Video";
import { Slider } from "../sliders/Slider";
import { InteractiveSketch } from "../interactiveCanvas/InteractiveSketch";
import {HeadTextPage} from '../headtext/HeadTextPage';
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json'; 
import { Message } from "./WindowStyled";
import { useContext } from "react";
import { WeatherContext } from "../../contexts/weatherContext";

countries.registerLocale(enLocale);

export const Window = ({showNav, videoData, slidesData, id, VideoComponent, headText }) => {
  const { weatherData, setCity, fetchWeather, error, city } = useContext(WeatherContext);
  const [message, setMessage] = useState(null);
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    if (weatherData ) {
      const countryName = countries.getName(weatherData.sys.country, "en");
      if (countryName) {
        const localTime = weatherData.localTime;
        const newMessage = `Time in ${weatherData.name}-${countryName}: ${localTime}`;
        setMessage(newMessage);       
      } else {
        setMessage(`Time in ${weatherData.name}: Local time not available due to country resolution issue.`);
      }
    }
  }, [weatherData]);

    useEffect(() => {
      if (error) {
        setDisplayContent(<p>Error: {error}</p>);
      } else if (message) {
        setDisplayContent(<Message>{message}</Message>);
      }
    }, [error, message]);

    useEffect(() => {
      setMessage('');
      setDisplayContent(null);
    }, [city]);

  const VideoComponentToRender = VideoComponent === 'InteractiveSketch' ? InteractiveSketch : Video;
  const shouldShowInput = showNav && VideoComponent === 'InteractiveSketch';
  return (
    <GridContainer>
      <GridLayout
        nav={showNav ? <Nav /> : null}
        headText={shouldShowInput ? <HeadTextPage text={headText} showInput={true} onCityChange={setCity} fetchWeather={fetchWeather} displayContent={displayContent}/> : null}
        videoSection={<VideoComponentToRender {...videoData} weatherData={weatherData}/>}
        slidswrapper={<Slider slides={slidesData} windowId={id} />}                
      />
    </GridContainer>
  );
}
