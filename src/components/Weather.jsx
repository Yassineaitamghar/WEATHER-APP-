import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

import { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: null,
    windSpeed: null,
    temperature: null,
    location: "",
    icon: clear_icon,
  });
  const [error, setError] = useState("");
  const [city, setCity] = useState("agadir");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setWeatherData({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: "",
        icon: clear_icon,
      });
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleSearch = () => {
    search(city);
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>
      <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
      <p className="temperature">
        {weatherData.temperature !== null
          ? `${weatherData.temperature}°C`
          : "N/A"}
      </p>
      <p className="location">{weatherData.location}</p>
      {error && <p className="error">{error}</p>}
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity" />
          <div>
            <p>
              {weatherData.humidity !== null
                ? `${weatherData.humidity} %`
                : "N/A"}
            </p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Speed" />
          <div>
            <p>
              {weatherData.windSpeed !== null
                ? `${weatherData.windSpeed} Km/h`
                : "N/A"}
            </p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
