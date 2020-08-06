import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { CENTRES } from './../../data';
import { uid } from 'react-uid';

// const log = console.log;

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

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} options={options}>
      {CENTRES.map(centre =>
        <Marker
          key={uid(centre)}
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
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}