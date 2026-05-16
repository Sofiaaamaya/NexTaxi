'use client';

import { useEffect, useRef } from 'react';

export default function GooglePlacesInput({ value, onChange, placeholder, className }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Cargar el script de Google Maps Places si no está presente
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const scriptId = 'google-maps-places';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => {
          initAutocomplete();
        };
        document.body.appendChild(script);
      } else {
        document.getElementById(scriptId).onload = () => {
          initAutocomplete();
        };
      }
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;
      if (!inputRef.current) return;
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['formatted_address', 'geometry'],
        componentRestrictions: { country: 'es' }
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        onChange({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <input
      ref={inputRef}
      value={value || ''}
      onChange={e => onChange({ address: e.target.value, lat: null, lng: null })}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
}
