// import React, { use, useState, useEffect } from "react";
// import Background from "./components/WeatherBackground.jsx";
// import { convertTemperature, getHumidityValue, getVisibilityValue, getWindDirection } from "./components/Helper.jsx";
// import { HumidityIcon, SunriseIcon, SunsetIcon, VisibilityIcon, WindIcon } from "./components/Icons.jsx";

// const App = () => {
//   const [weather, setWeather] = useState(null);
//   const [city, setCity] = useState("");
//   const [suggestion, setSuggestion] = useState([]);
//   const [unit, setUnit] = useState("C");
//   const [error, setError] = useState("");

//   const API_KEY = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     if (city.trim().length >= 3 && !weather) {
//       const timer = setTimeout(() => fetchSuggestions(city), 500);
//       return () => clearTimeout(timer);
//     }
//     setSuggestion([]);
//   }, [city, weather]);

//   //Fetches 5 Locations from Api and updates
//   const fetchSuggestions = async (query) => {
//     try {
//       const res = await fetch(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
//       );
//       res.ok ? setSuggestion(await res.json()) : setSuggestion([]);
//     } catch {
//       setSuggestion([]);
//     }
//   };

//   //this will fetch data from url
//   const fetchWeatherData = async (url, name = "") => {
//     setError("");
//     setWeather(null);

//     try {
//       const response = await fetch(url);
//       if (!response.ok)
//         throw new Error(
//           (await response.json()).message || "City & Country not found"
//         );
//       const data = await response.json();
//       setWeather(data);
//       setCity(name || data.name);
//       setSuggestion([]);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   //this function prevent form submission validates city and fetches data via Api key
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!city.trim())
//       return setError("Please enter a valid city or country name");
//     await fetchWeatherData(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
//     );
//   };

//   //this function check weather exists and return an object
//   const getweatherCondition = () =>
//     weather && {
//       main: weather.weather[0].main,
//       isDay:
//         Date.now() / 1000 > weather.sys.sunrise &&
//         Date.now() / 1000 < weather.sys.sunset,
//     };

//   return (
//     <div className="min-h-screen">
//       <Background condition={getweatherCondition()} />

//       <div className="flex item-center justify-center p-6 min-h-screen">
//         <div className="bg-transparent backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-white w-full border border-white/30 relative z-10">
//           <h1 className="text-4xl font-extrabold text-center mb-6">
//             weather App
//           </h1>

//           {!weather ? (
//             <form onSubmit={handleSearch} className="flex flex-col relative">
//               <input
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="Enter City or Country (min 3 Letters)"
//                 className="mb-4 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline focus:border-blue-300 transition duration-300"
//               />
//               {suggestion.length > 0 && (
//                 <div className="absolute top-12 left-0 right-0 bg-transparent shadow-md rounded z-10">
//                   {suggestion.map((s) => (
//                     <button
//                       type="button"
//                       key={`${s.lat}-${s.lon}`}
//                       onClick={() =>
//                         fetchWeatherData(
//                           `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
//                           `${s.name}, ${s.country}${
//                             s.state ? `, ${s.state}` : ""
//                           }`
//                         )
//                       }
//                       className="block hover:bg-blue-700 bg-transparent px-4 py-2 text-sm text-left w-full transition-colors"
//                     >
//                       {s.name}, {s.country}
//                       {s.state && `, ${s.state}`}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="bg-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
//               >
//                 Get Weather
//               </button>
//             </form>
//           ) : (
//             <div className="mt-6 text-center transition-opacity duration-500">
//               <button
//                 onClick={() => {
//                   setWeather(null);
//                   setCity("");
//                 }}
//                 className="mb-4 bg-purple-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors"
//               >
//                 New Search
//               </button>

//               <div className="flex justify-between items-center">
//                 <h2 className="text-3xl font-bold">{weather.name}</h2>

//                 <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-6 px-3 rounded transition-colors ">
//                   &deg;{unit}
//                 </button>
//               </div>
//               <img
//                 src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                 alt={weather.weather[0].description}
//                 className="mx-auto my-4 animate-bounce"
//               />

//               <p className="text-4xl">
//                 {convertTemperature(weather.main.temp, unit)} &deg;{unit}
//               </p>
//               <p className="capitalize">{weather.weather[0].description}</p>

//               <div className="flex flex-wrap justify-around mt-6">
//                 {[
//                   [
//                     HumidityIcon, 'Humidity', `${weather.main.humidity}%
//                     (${getHumidityValue(weather.main.humidity)})`
//                   ],
//                   [
//                     WindIcon, 'Wind Speed', `${weather.wind.speed} m/s ${weather.wind.deg ?
//                       `(${getWindDirection(weather.wind.deg)})` : ''}`
//                   ],
//                   [
//                     VisibilityIcon, 'Visibility', getVisibilityValue(weather.visibility)
//                   ]
//                 ]
//                  .map(([Icon, label, value]) => (
//                   <div key={label} className="flex flex-col item-center m-2">
//                     <Icon />
//                     <p className="mt-1 font-semibold">{label}</p>
//                     <p className="text-sm">{value}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-wrap justify-around mt-6">
//                 {[
//                   [SunriseIcon,'Sunrise', weather.sys.sunrise],
//                   [SunsetIcon, 'Sunset', weather.sys.sunset]
//                  ].map(([Icon, label, time]) => (
//                   <div key={label} className="flex flex-col item-center m-2">
//                     <Icon />
//                     <p className="mt-1 font-semibold">{label}</p>
//                     <p className="text-sm">
//                       {new Date(time * 1000).toLocaleDateString('en-GB',
//                         { hour: '2-digit',minute: '2-digit'})}
//                     </p>
//                   </div>
//                     ))}
//               </div>
//                 <div className="mt-6 text-sm">
//                   <p><strong>Feels Like: </strong>{convertTemperature(weather.main.feels_like, unit)} &deg;{unit}</p>
//                   <p><strong>Pressure:  </strong> {weather.main.pressure} hPa</p>
//                   <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
//                   <p><strong>Coordinates:</strong> {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}</p>
//                 </div>
//             </div>

//           )}
//             {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import WeatherBackground from "./components/WeatherBackground.jsx";
import { convertTemperature, getHumidityValue, getVisibilityValue, getWindDirection } from "./components/Helper.jsx";
import { HumidityIcon, SunriseIcon, SunsetIcon, VisibilityIcon, WindIcon } from "./components/Icons.jsx";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (city.trim().length >= 3 && !weather) {
      const timer = setTimeout(() => fetchSuggestions(city), 500);
      return () => clearTimeout(timer);
    }
    setSuggestion([]);
  }, [city, weather]);

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      res.ok ? setSuggestion(await res.json()) : setSuggestion([]);
    } catch {
      setSuggestion([]);
    }
  };

  const fetchWeatherData = async (url, name = "") => {
    setError("");
    setWeather(null);
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "City & Country not found"
        );
      const data = await response.json();
      setWeather(data);
      setCity(name || data.name);
      setSuggestion([]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim())
      return setError("Please enter a valid city or country name");
    await fetchWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
    );
  };

  const getWeatherCondition = () =>
    weather && {
      main: weather.weather[0].main,
      isDay:
        Date.now() / 1000 > weather.sys.sunrise &&
        Date.now() / 1000 < weather.sys.sunset,
    };

  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-transparent">
      <WeatherBackground condition={getWeatherCondition()} />
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 text-white transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 tracking-tight">
          🌤️ Weather App
        </h1>

        {!weather ? (
          <form onSubmit={handleSearch} className="relative flex flex-col gap-4">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city or country"
              className="p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              aria-label="City or country input"
            />
            {suggestion.length > 0 && (
              <div className="absolute top-14 left-0 right-0 bg-white/10 backdrop-blur-md rounded-lg shadow-md z-20 max-h-60 overflow-y-auto">
                {suggestion.map((s) => (
                  <button
                    type="button"
                    key={`${s.lat}-${s.lon}`}
                    onClick={() =>
                      fetchWeatherData(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
                        `${s.name}, ${s.country}${s.state ? `, ${s.state}` : ""}`
                      )
                    }
                    className="w-full text-left px-4 py-2 hover:bg-blue-600/50 text-white/90 transition-colors duration-200"
                    aria-label={`Select ${s.name}, ${s.country}${s.state ? `, ${s.state}` : ""}`}
                  >
                    {s.name}, {s.country}
                    {s.state && `, ${s.state}`}
                  </button>
                ))}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
              aria-label="Search weather"
            >
              Get Weather
            </button>
          </form>
        ) : (
          <div className="mt-6 flex flex-col gap-6 animate-fade-in">
            <button
              onClick={() => {
                setWeather(null);
                setCity("");
              }}
              className="self-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              aria-label="Start new search"
            >
              New Search
            </button>

            <div className="flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl font-semibold">{weather.name}</h2>
              <button
                onClick={toggleUnit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
                aria-label={`Switch to °${unit === "C" ? "F" : "C"}`}
              >
                °{unit}
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-24 h-24 animate-bounce-slow"
              />
              <p className="text-4xl sm:text-5xl font-bold">
                {convertTemperature(weather.main.temp, unit)} °{unit}
              </p>
              <p className="capitalize text-lg">{weather.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                [HumidityIcon, "Humidity", `${weather.main.humidity}% (${getHumidityValue(weather.main.humidity)})`],
                [WindIcon, "Wind Speed", `${weather.wind.speed} m/s ${weather.wind.deg ? `(${getWindDirection(weather.wind.deg)})` : ""}`],
                [VisibilityIcon, "Visibility", getVisibilityValue(weather.visibility)],
                [SunriseIcon, "Sunrise", new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })],
                [SunsetIcon, "Sunset", new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })],
              ].map(([Icon, label, value], index) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <Icon className="w-8 h-8" />
                  <p className="mt-2 font-semibold">{label}</p>
                  <p className="text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm grid grid-cols-2 gap-2">
              <p><strong>Feels Like:</strong> {convertTemperature(weather.main.feels_like, unit)} °{unit}</p>
              <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
              <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
              <p><strong>Coordinates:</strong> {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}</p>
            </div>
          </div>
        )}
        {error && <p className="text-red-400 text-center mt-4 font-medium">{error}</p>}
      </div>
    </div>
  );
};

export default App;