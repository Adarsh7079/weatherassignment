// src/WeatherApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../assests/search.png";
import cloud from "../assests/cloud.png"
import drizzle from "../assests/drizzle.png"
import rain from "../assests/rain.png"
import snow from "../assests/snow.png"
import wind from "../assests/wind.png"
import clear from "../assests/clear.png"
import humidity from "../assests/humidity.png"

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wicon,setWicon]=useState(cloud);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherDataByCoordinates = (latitude, longitude) => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5ef0924159510bdb03154104489e2eea&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherDataByLocation(location);
  };

  const fetchWeatherDataByLocation = (location) => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5ef0924159510bdb03154104489e2eea&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setWeatherIcon(response.data.weather[0].icon);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  };
  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setWicon(clear);
        break;
      case "02d":
      case "02n":
        setWicon(drizzle);
        break;
      case "03d":
      case "03n":
        setWicon(rain);
        break;
      default:
        setWicon(cloud);
    }
  };
  console.log("data : ",weatherData)

 
 
  

  return (
    <div className="md:w-[800px] w-[80%] h-auto flex mx-auto items-center justify-center  bg-gray-450  backdrop-filter backdrop-blur-xl text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="flex gap-5" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="location"
                required
                placeholder="Enter Location"
                value={location}
                onChange={handleLocationChange}
                className="appearance-none relative block w-full h-[50px] px-5 py-2 border border-gray-300 
                 placeholder-gray-500 text-gray-900  rounded-full outline-none sm:text-lg bg-blue-400"
              />
            </div>
          </div>
          <div
            onClick={handleFormSubmit}
            className=" cursor-pointer bg-blue-400 rounded-full h-[50px] p-5 "
          >
            <img
              src={search}
              alt=""
              className=" flex items-center justify-center h-[30px] w-[30px] -mt-2"
            />
            </div>
        </form>
        {loading && <p>Loading...</p>}
        {weatherData && (
          <div className=" flex flex-col gap-5">
            <div>
            <img
              src={wicon} className=" w-[100px] h-[100px] flex mx-auto"/>
            </div>
            <div>
            <p className=" text-center text-5xl text-slate-100 font-bold">{weatherData.main.temp}°C</p>
            <p className=" text-center text-2xl text-slate-100 font-bold">{weatherData.name}</p>
            </div>
            <div className=" flex justify-between">
                <div className=" flex gap-3">
                    <img src={humidity} alt="" />
                    <p className=" text-2xl">{weatherData.weather[0].description}</p>
                </div>
                <div className=" flex gap-3">
                    <img src={wind} alt="" />
                    <p className=" text-2xl">{weatherData.wind.speed} m/s</p>
                </div>
            </div>
           
          </div>
        )}
      </div>
      
    </div>
  );
};

export default WeatherApp;
