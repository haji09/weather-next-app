import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import apiKeys from '@/components/apiKeys';
import WeatherData from '@/components/WeatherData';
import { sunny, wind } from '@/public/assets';

const CurrentLocation = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    // Function to get the user's current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else {
        console.log('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    // Callback function on successful location retrieval
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocationAllowed(true); // Location access granted
      fetchWeatherData(latitude, longitude);
    };

    // Callback function on location retrieval error
    const onError = (error) => {
      console.error('Error getting location:', error);
      setLoading(false);
    };
    getLocation();
  }, []);

  // Function to fetch weather data based on location
  const fetchWeatherData = async (latitude, longitude) => {
    const API_URL = `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeys.key}`;

    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
      setLocationAllowed(false);
      // alert(
      //   "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
      // );
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-auto flex flex-col justify-center items-center my-16 p-8 ">
          <Image src={sunny} alt="Loading" className="w-52 h-52" />
          <p className="text-xl mdl:text-3xl text-white text-center">
            Detecting your location
          </p>
          <p className="text-xl mdl:text-3xl text-white font-bold my-4 text-center">
            You have disabled location service. Allow 'This APP' to access your
            location.
          </p>
          <p className="text-lg mdl:text-2xl text-gray-600 font-light text-center">
            {' '}
            Your current location will be displayed on the App <br></br> & used
            for calculating Real time weather.
          </p>
        </div>
      ) : locationAllowed && weatherData ? (
        <>
          <WeatherData data={weatherData} />
        </>
      ) : locationAllowed ? (
        <p>Unable to fetch weather data.</p>
      ) : (
        <div className="w-full h-auto flex flex-col justify-center items-center my-16 p-8 ">
          <Image src={sunny} alt="Loading" className="w-52 h-52" />
          <p className="text-xl mdl:text-3xl text-white text-center">
            Detecting your location
          </p>
          <p className="text-xl mdl:text-3xl text-white font-bold my-4 text-center">
            You have disabled location service. Allow 'This APP' to access your
            location.
          </p>
          <p className="text-lg mdl:text-2xl text-white font-light text-center">
            {' '}
            Your current location will be displayed on the App <br></br> & used
            for calculating Real time weather.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
