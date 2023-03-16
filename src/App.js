import Search from "./components/search/Search";
import Weather from "./components/weather/Weather";
import Forecast from "./components/forecast/Forecast";
import { weather_api, weather_api_key } from "./api";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const weatherFetch = fetch(
      `${weather_api}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );
    const foreCastFetch = fetch(
      `${weather_api}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    Promise.all([weatherFetch, foreCastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Weather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
