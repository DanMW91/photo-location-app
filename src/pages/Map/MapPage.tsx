import { useState, useEffect, FunctionComponent, useContext } from 'react';
import MAP_API_KEY from '../../dev-api-key';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Container, Paper } from '@mui/material';
import Marker from './Marker';
import Map from './Map';
import LocationDetail from './LocationDetail/LocationDetail';
import LocationContext from '../../store/location-ctx';
import AddMarkerModal from './AddMarker/AddMarkerModal';

export interface MarkerDetails {
  id: string;
  coords: {
    lat: number;
    lng: number;
  };
  name: string;
  description: string;
}

const markers = [
  {
    id: 'loc1',
    coords: { lat: 51.52019998206608, lng: -0.09376439878087152 },
    name: 'Barbican Estate',
    description: 'Amazing Brutalist Architecture',
  },
  {
    id: 'loc2',
    coords: { lat: 54.52019998206608, lng: -0.09376439878087152 },
    name: 'Barbican Estate',
    description: 'Amazing Brutalist Architecture',
  },
];

const MapPage: FunctionComponent = (): JSX.Element => {
  const [zoom, setZoom] = useState(14); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [openMarkerModal, setOpenMarkerModal] = useState(false);

  const handleClickOpenMarkerModal = () => {
    setOpenMarkerModal(true);
  };

  const handleCloseMarkerModal = () => {
    setOpenMarkerModal(false);
  };
  const locationCtx = useContext(LocationContext);

  const setUserLocation = (userCoords: {
    latitude: number;
    longitude: number;
  }): void => {
    const { latitude, longitude } = userCoords;
    setCenter({ lng: longitude, lat: latitude });
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
    setOpenMarkerModal(true);
    const coords = e.latLng.toJSON();
    console.log(coords);
    // console.log(clicks);
    // setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Wrapper apiKey={MAP_API_KEY} render={render}>
          <Map
            center={center}
            onClick={handleMapClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: '1', height: '80vw', margin: '10px' }}
          >
            {markers.map((marker, i) => (
              <Marker key={i} position={marker.coords} markerDetails={marker} />
            ))}
          </Map>
        </Wrapper>
      </div>
      <Container sx={{ height: '60%' }}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'scroll',
            marginBottom: '80px',
          }}
          elevation={2}
        >
          {openMarkerModal && (
            <AddMarkerModal
              handleClickOpen={handleClickOpenMarkerModal}
              handleClose={handleCloseMarkerModal}
              open={openMarkerModal}
            />
          )}

          {locationCtx.location && (
            <LocationDetail locationDetail={locationCtx.location} />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default MapPage;
