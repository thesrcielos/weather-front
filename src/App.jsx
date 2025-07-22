import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function App() {
  const [city, setCity] = useState("")
  const [cityInfo, setCityInfo] = useState(undefined)
  const BACKEND_URL = import.meta.env.VITE_BACK_URL;
  const handleSearchCity = async () => {
    setCityInfo(undefined);
    try{
      const response = await axios.get(BACKEND_URL + "/api/weather?city=" + city);
      const data = await response.data;
      setCityInfo(data);
    }catch(e){
      alert("Error try again later")
    }
  }

  return (<div className='app-container'>
     <APIProvider apiKey={import.meta.env.VITE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <h1>Weather App</h1>
      <p>Welcome to the app to check the Weather</p>
      <div className='search'>
        <input type='text' placeholder='search a city' value={city} onChange={(e) => setCity(e.target.value)}></input>
        <button onClick={handleSearchCity}>Search</button>
      </div>
      <div>
        {cityInfo ? (
          <div className='info'>
            <h2>{"Location: " +cityInfo.city +", " + cityInfo.country}</h2>
            <h2>{"Temperature: " + cityInfo.temperature +"°C"}</h2>
            <h2>{"Condition: " + cityInfo.condition}</h2>
          </div>
          ): (<h3>No city info</h3>)
        }
        {cityInfo && (
          <Map className='map' defaultZoom={13}
          defaultCenter={ { lat: cityInfo.lat, lng: cityInfo.lon } }
          onCameraChanged={ (ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }></Map>
        )}
      </div>
     </APIProvider>
    </div>
  )
}

export default App
