import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/centres'
})


const containerStyle = {
  width: '800px',
  height: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '30px'
};

// Toronto
const center = {
  lat: 43.653225,
  lng: -79.383186
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    api.get('/').then(result => {
      setCentres(result.data);
    }).catch(error => {
      alert("Could not get centres");
      console.log(error);
    })
  }, [])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} options={options}>
      {centres.map(centre =>
        <Marker
          key={centre._id}
          position={{
            lat: centre.location.latitude,
            lng: centre.location.longitude
          }}
          onClick={() => setSelectedCentre(centre)}
        />)}

      {selectedCentre && (
        <InfoWindow position={{
          lat: selectedCentre.location.latitude,
          lng: selectedCentre.location.longitude
        }}
          onCloseClick={() => setSelectedCentre(null)}
        >
          <div>
            <h2>{selectedCentre.name}</h2>
            <p>{selectedCentre.info === undefined ? '' : selectedCentre.info}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}