'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Poppins from '@/components/ui/Poppins';

export default function DriversMap() {
  const center = {
    lat: 28.963,
    lng: -13.547,
  };

  return (
    <div className="p-6 border border-border rounded-xl bg-white shadow-sm">
      <Poppins text="Mapa en tiempo real" size="18|22" weight="semibold" className="mb-4" />

      <div className="h-64 rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={12}
          >
            {/* Ejemplo marcador */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
