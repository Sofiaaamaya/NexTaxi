'use client';

import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_ID,
  GOOGLE_MAPS_VERSION,
} from '@/lib/constants/googleMaps';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 28.9622, // Lanzarote coordinates
  lng: -13.555,
};

export default function MapComponent({
  center = defaultCenter,
  markers = [],
  polyline = null,
  zoom = 13,
  onMapLoad,
  isBackground = false,
}) {
  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_MAPS_ID,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: GOOGLE_MAPS_LIBRARIES,
    version: GOOGLE_MAPS_VERSION,
  });

  const [map, setMap] = useState(null);

  const decodedPath = useMemo(() => {
    if (!isLoaded || !polyline || !window.google) return [];
    try {
      return window.google.maps.geometry.encoding.decodePath(polyline);
    } catch (e) {
      console.error('Error decoding polyline:', e);
      return [];
    }
  }, [isLoaded, polyline]);

  const onLoad = useCallback(
    function callback(mapInstance) {
      setMap(mapInstance);
      if (onMapLoad) onMapLoad(mapInstance);
    },
    [onMapLoad]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && decodedPath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((point) => bounds.extend(point));
      map.fitBounds(bounds);
    }
  }, [map, decodedPath]);

  if (!isLoaded)
    return (
      <div
        className={
          isBackground ? 'fixed inset-0 z-0 bg-gray-100 flex items-center justify-center' : ''
        }
      >
        Cargando Mapa...
      </div>
    );

  return (
    <div className={isBackground ? 'fixed inset-0 z-0' : 'w-full h-full'}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: isBackground,
          zoomControl: !isBackground,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: isBackground
            ? [
                {
                  featureType: 'poi',
                  stylers: [{ visibility: 'off' }],
                },
              ]
            : [],
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position || marker}
            label={marker.label}
            icon={marker.icon}
          />
        ))}

        {decodedPath.length > 0 && (
          <Polyline
            path={decodedPath}
            options={{
              strokeColor: '#3b82f6',
              strokeOpacity: 0.8,
              strokeWeight: 5,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
