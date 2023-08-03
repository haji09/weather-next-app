import { celsius } from '@/public/assets';
import React, { useEffect, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Forecast from '@/components/Forecast';
import moment from 'moment/moment';
import Image from 'next/image';

const WeatherData = ({ data }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="mdl:flex w-full h-auto mdl:h-full  rounded-xl  drop-shadow-xl p-1 overflow-hidden">
      <div className=" w-full mdl:w-[50%] mdl:h-[70vh] p-4 my-3 mdl:border-r-2 border-gray-500 border-dotted ">
        <div className="w-full h-full flex flex-col gap-y-4 mdl:gap-y-0 items-center justify-around ">
          <div className=" h-[60%] flex flex-col justify-center items-center ">
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl mdl:text-4xl text-red-600 animate-bounce">
                <HiOutlineLocationMarker />
              </span>
              <p className="text-2xl mdl:text-4xl font-bold ">{data.name}</p>
            </div>
            <p className="text-xl font-medium">{data.sys.country}</p>
          </div>
          <div className="w-full h-[40%] mx-2 flex justify-around gap-5 items-center">
            <div className="font-semibold text-sm md:text-base">
              <p>{formatTime(time)}</p>
              <p>{moment().format('dddd')}</p>
              <p>{moment().format('LL')}</p>
            </div>
            <div>
              <p className=" text-2xl md:text-3xl font-bold font-bodyFont flex items-center">
                {Math.round(data.main.temp)}{' '}
                <span>
                  <Image
                    src={celsius}
                    alt="celsius"
                    className=" w-8 h-8 md:w-10 md:h-10"
                  />{' '}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mdl:hidden">
        <div className="w-[90%] h-0.5 border-b-4 border-dotted border-gray-500 mdl:hidden"></div>
      </div>
      <Forecast />
    </div>
  );
};

export default WeatherData;
