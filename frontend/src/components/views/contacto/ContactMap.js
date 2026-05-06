'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Poppins from '@/components/ui/Poppins';

export default function ContactMap({ t }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const center = {
    lat: 28.963,
    lng: -13.547,
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-5">
      <Poppins text={t('map.title')} tag="h3" weight="semibold" className="mb-4" />

      <div className="w-full h-72 rounded-xl overflow-hidden bg-gray-200">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      <Poppins text={t('map.address')} tag="p" color="textSecondary" className="mt-4" />
    </div>
  );
}
