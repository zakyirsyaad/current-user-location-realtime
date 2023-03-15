import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import './App.css'

const API_endpoint = "https://api.openweathermap.org/data/2.5/weather?";
const API_key = "b8c95679253b173a9438c6fa474ca55f";

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const url = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`;
        const response = await axios.get(url);
        setResponseData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>{responseData.name}</h1>
      {latitude & longitude && (
        <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              Aku disini.
            </Popup>
          </Marker>
        </MapContainer>
      )
      }
    </div >
  );
}

export default App;
