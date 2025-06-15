import React from 'react'
import Thunderstorm from '../assets/ThunderStorm.gif'
import Rain from '../assets/Rain.gif'
import Snow from '../assets/snow.gif'
import ClearDay from '../assets/clearsky.gif'
import ClearNight from '../assets/clearskynight.gif'
import Fog from '../assets/fog.gif'
import Cloudsday from '../assets/cloudday.gif'
import CloudsNight from '../assets/cloudnight.gif'
import Video from '../assets/video1.mp4'

const WeatherBackground = ({ condition }) => {
  const gifs = {
    Thunderstorm,
    Drizzle: Rain,
    Rain,
    Snow: Snow,
    Clear: { day: ClearDay, night: ClearNight },
    Clouds: { day: Cloudsday, night: CloudsNight },
    Mist: Fog,
    Smoke: Fog,
    Fog,
    Haze: Fog,
    default: Video
  };

  const getBackground = () => {
    if (!condition) return gifs.default;
    const weatherType = condition.main;
    const assets = gifs[weatherType];

    if (!assets) return gifs.default;
    if (typeof async === 'object')
       return condition.isDay ? assets.day : assets.night;

    return assets;
  }

  const background = getBackground();

  return (
    <div className='fixed inset-0 z-0 overflow-hidden'>
      {background === Video ? (
        <video autoplay loop muted className='w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in'>
         <source src={Video} type='video1/mp4'/>
        </video>
      ) : (
        <img src={background} alt="Weather-bg" className='w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in' />

      )}
      
      <div className='absolute inset-0 bg-black/30'/>

    </div>
  )
}

export default WeatherBackground;
