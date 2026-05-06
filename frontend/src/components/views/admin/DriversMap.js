'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Poppins from '@/components/ui/Poppins';

import { useTranslations } from 'next-intl';

export default function DriversMap() {
  const t = useTranslations('common');
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const center = {
    lat: 28.963,
    lng: -13.547,
  };

  return (
    <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
      <Poppins text={t('realTimeMap')} size="18|22" weight="semibold" className="mb-4" />

      <div className="h-64 rounded-lg overflow-hidden bg-gray-50">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={12}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
}
