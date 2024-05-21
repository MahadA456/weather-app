import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=591ac1d2ad9259e7730bef2605e43877&units=metric`);
      setWeather(response.data);
      console.log(response.data); // Log the response data for debugging
    } catch (error) {
      console.error('Error fetching the weather data', error);
      setError('Could not fetch weather data. Please try again.');
    }
  };

  const getWeatherImage = (weather) => {
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('clouds')) {
      return 'cloudy.png';
    } else if (main.includes('rain')) {
      return 'rainy.png';
    } else if (main.includes('clear')) {
      return 'sunny.png';
    }
    return null;
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="weather-input"
      />
      <button onClick={fetchWeather} className="weather-button">Get Weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
          {getWeatherImage(weather) && (
            <img
              src={`${process.env.PUBLIC_URL}/${getWeatherImage(weather)}`}
              alt={weather.weather[0].main}
              className="weather-image"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
