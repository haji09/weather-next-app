import React, { useState } from 'react';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { celsius, cloudy, humidity, wind, sunny, rain } from '@/public/assets';
import apiKeys from '@/components/apiKeys';
import axios from 'axios';

const Forecast = () => {
  const [data, setData] = useState({
    celcius: '00',
    name: 'City',
    humidity: '00',
    speed: '00',
    image: '/assets/images/cloudy.gif',
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newValue = capitalizeFirstLetter(e.target.value);
    setInputValue(newValue);
    setName(newValue);
  };

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleClick = () => {
    // button pressing effect------------------
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
    // fetching data from api --------------
    if (name !== '') {
      const apiUrl = `${apiKeys.base}weather?q=${name}&appid=${apiKeys.key}&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = { cloudy };
          if (res.data.weather[0].main == 'Clouds') {
            imagePath = '/assets/images/cloudy.gif';
          } else if (res.data.weather[0].main == 'Clear') {
            imagePath = '/assets/images/sunny.gif';
          } else if (res.data.weather[0].main == 'Rain') {
            imagePath = '/assets/images/rain.gif';
          } else if (res.data.weather[0].main == 'Drizzle') {
            imagePath = '/assets/images/rain.gif';
          } else if (res.data.weather[0].main == 'Mist') {
            imagePath = '/assets/images/cloudy.gif';
          } else {
            imagePath = '/assets/images/cloudy.gif';
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            description: res.data.weather[0].main,
            image: imagePath,
          });

          setError('');
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError('Invalid City Name');
          } else {
            setError('');
          }
          console.log(err);
        });
    }
  };

  return (
    <div className=" w-full h-auto mdl:w-[50%] mdl:h-[70vh] overflow-hidden">
      <div className="w-full mdl:w-full h-full flex flex-col   py-2 items-center justify-around ">
        <div className=" w-full h-auto flex items-center justify-center gap-x-2 mt-10">
          <input
            value={inputValue}
            placeholder="enter city name"
            onChange={handleInputChange}
            className="w-[60%] border-b-2 border-black outline-none rounded-lg bg-transparent p-2 px-4 placeholder:text-gray-600 "
          ></input>
          <button
            onClick={handleClick}
            className={`border-2 border-black text-2xl rounded-full p-2 text-black-50 ${
              isPressed ? 'scale-90' : 'scale-100'
            } transition-transform duration-200 ease-in-out focus:outline-none active:scale-90`}
          >
            <BiSearch />
          </button>
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-red-500 p-1 text-sm mdl:text-base  ">{error}</p>
        </div>
        <div className="w-full h-auto mt-5 flex flex-col justify-center items-center">
          <div className="w-[30%] h-[50%]">
            <Image
              src={data.image}
              alt="cloudy gif"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <p className="m-2 text-lg font-medium ">{data.description}</p>
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="text-3xl font-bold flex items-center justify-center">
              {Math.round(data.celcius)}{' '}
              <span>
                <Image
                  src={celsius}
                  alt="celsius"
                  className="w-8 h-8 mdl:w-10 mdl:h-10"
                />{' '}
              </span>
            </p>
            <p className="text-lg font-semibold">{data.name}</p>
          </div>
        </div>
        <div className="w-full flex-col gap-y-4 mdl:flex mdl:flex-row justify-evenly items-center mt-4 mb-4">
          <div className=" flex items-center justify-evenly gap-x-20 mdl:gap-x-2">
            <Image src={humidity} alt="humidity" className="w-14 h-14" />
            <div className="flex flex-col justify-end items-center">
              <p className="text-lg font-medium">
                {Math.round(data.humidity)} %
              </p>
              <p>Humidity</p>
            </div>
          </div>
          <div className=" flex items-center justify-evenly gap-x-20 mt-3 mdl:mt-0  mdl:gap-x-2">
            <Image src={wind} alt="wind" className="w-14 h-14" />
            <div className="flex flex-col justify-end items-center">
              <p className="text-lg font-medium">
                {Math.round(data.speed)} km/h
              </p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
