import { useEffect, useState } from 'react';

import { getCurrentLatLng } from './services/geolocation';

import './App.css';
import Map from './components/Map/Map';

function App () {

  const [ appData, setAppData ] = useState({
  lat: null,
  lng: null,
  temp: null,
  icon: '',
  });

  async function getAppData() {
    const {lat, lng} = await getCurrentLatLng(); // await is like till is done.
      
    // we need browser location
    // we need weather data
    // set component state to the received values
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '5b3c5a41e420b342a7d2e498f5e3fd82';
    // ?lat=34.0475869&lon=-117.8985651&units=imperial&appid=

    const weatherData = await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&units=imperial&appid=${API_KEY}`)
    .then(res => res.json());

    console.log(weatherData);

    setAppData({
      lat, 
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
    })
  }


  useEffect(() => {
    // make your ajax request here or anything else you need your page to load
    getAppData();
  }, []); // that empty array makes run effect just load once on initial render


  return (
    <div className='App'>
      <Map lat={appData.lat} lng={appData.lng} />
      <header className='App-header'>
      {
        appData.temp && <div>{appData.temp}&deg;</div>
      }
      REACT WEATHER APP
      {
        appData.icon && <img 
        src={`https://openweathermap.org/img/w/${appData.icon}.png`} 
        alt='current conditions'
        />
      }
      </header>
    </div>
  );
}

export default App;
