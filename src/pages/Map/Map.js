import React, { useState, useEffect, useRef } from 'react';
import MAP_API_KEY from '../../dev-api-key';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = MAP_API_KEY;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [zoom, setZoom] = useState(10);

  const initializeMap = (userLocation = null) => {
    let lat = -70.8991;
    let lng = 42.317;
    if (userLocation) {
      ({ latitude: lat, longitude: lng } = userLocation.coords);
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  };

  useEffect(() => {
    if (map.current) return;

    navigator.geolocation.getCurrentPosition(
      (location) => {
        initializeMap(location);
      },
      (err) => {
        initializeMap();
      }
    );
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
