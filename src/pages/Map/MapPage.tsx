import { useState, useEffect, FunctionComponent, useCallback } from 'react';
import MAP_API_KEY from '../../dev-api-key';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Marker from './Marker';
import Map from './Map';

const markers = [
  {
    coords: { lat: 51.52019998206608, lng: -0.09376439878087152 },
    name: 'Barbican Estate',
    description: 'Amazing Brutalist Architecture',
    images: [
      {
        url: 'https://en.wikipedia.org/wiki/Barbican_Estate#/media/File:Barbican_towers.jpg',
        description: 'Taken from my balcony.',
        user_id: 'u1',
      },
    ],
  },
];

const MapPage: FunctionComponent = (): JSX.Element => {
  const [zoom, setZoom] = useState(14); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const setUserLocation = (
    userCoords: null | { latitude: number; longitude: number } = null
  ): void => {
    let latitude = 0;
    let longitude = 0;

    if (userCoords) {
      console.log(userCoords);
      ({ latitude, longitude } = userCoords);
      setCenter({ lng: longitude, lat: latitude });
    }
  };

  // fetch users location and center map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords);
      },
      (error) => {}
    );
  }, []);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    console.log(e);
    // console.log(clicks);
    // setClicks([...clicks, e.latLng]);
  };

  const handleMarkerClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log(e);
  }, []);

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper apiKey={MAP_API_KEY} render={render}>
        <Map
          center={center}
          onClick={handleMapClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', height: '80vw' }}
        >
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={marker.coords}
              onClick={handleMarkerClick}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

export default MapPage;
