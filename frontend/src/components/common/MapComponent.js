'use client';

import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 28.9622, // Lanzarote coordinates
  lng: -13.5550
};

export default function MapComponent({ 
  center = defaultCenter, 
  markers = [], 
  route = [], 
  zoom = 13,
  onMapLoad
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(mapInstance) {
    setMap(mapInstance);
    if (onMapLoad) onMapLoad(mapInstance);
  }, [onMapLoad]);

  const onUnmount = useCallback(function callback(mapInstance) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Cargando Mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {markers.map((marker, index) => (
        <Marker 
          key={index} 
          position={marker.position} 
          label={marker.label}
          icon={marker.icon}
        />
      ))}

      {route.length > 0 && (
        <Polyline
          path={route}
          options={{
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      )}
    </GoogleMap>
  );
}