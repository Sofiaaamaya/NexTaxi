'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Poppins from '@/components/ui/Poppins';

export default function ContactMap({ t }) {
  const center = {
    lat: 28.963,
    lng: -13.547,
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-5">
      <Poppins text={t('map.title')} tag="h3" weight="semibold" className="mb-4" />

      <div className="w-full h-72 rounded-xl overflow-hidden">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>

      <Poppins text={t('map.address')} tag="p" color="textSecondary" className="mt-4" />
    </div>
  );
}
