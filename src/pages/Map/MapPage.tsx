import {
  useState,
  useEffect,
  FunctionComponent,
  useContext,
  useRef,
} from 'react';
import MAP_API_KEY from '../../dev-api-key';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Container, Paper } from '@mui/material';
import Marker from './Marker';
import Map from './Map';
import LocationDetail from './LocationDetail/LocationDetail';
import LocationContext from '../../context/location-ctx';
import AuthContext from '../../context/auth-ctx';
import AddMarkerModal from './AddMarker/AddMarkerModal';
import { MarkerRefInterface } from './AddMarker/AddMarkerModal';

export interface MarkerDetails {
  id: string;
  coords: {
    lat: number;
    lng: number;
  };
  name: string;
  description: string;
}

const MapPage: FunctionComponent = () => {
  const [markers, setMarkers] = useState<MarkerDetails[]>();
  const [zoom, setZoom] = useState(14); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [openMarkerModal, setOpenMarkerModal] = useState(false);
  const clickedCoordsRef = useRef({ lat: 0, lng: 0 });
  const {
    loginState: { isLoggedIn },
  } = useContext(AuthContext);
  const locationCtx = useContext(LocationContext);

  const handleClickOpenMarkerModal = () => {
    setOpenMarkerModal(true);
  };

  const handleCloseMarkerModal = () => {
    setOpenMarkerModal(false);
  };

  const addMarker = async (newMarker: MarkerRefInterface) => {
    console.log(newMarker);
    // setMarkers();
    try {
      const response = await fetch('http://localhost:5000/markers/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMarker),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMarkers = async () => {
    const response = await fetch('http://localhost:5000/markers/all');
    const responseData = await response.json();
    console.log(responseData);
    setMarkers(responseData.markers);
  };

  const setUserLocation = (userCoords: {
    latitude: number;
    longitude: number;
  }): void => {
    const { latitude, longitude } = userCoords;
    setCenter({ lng: longitude, lat: latitude });
  };

  // fetch users location and center map
  useEffect(() => {
    fetchMarkers();
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
    if (isLoggedIn) {
      const coords = e.latLng.toJSON();
      clickedCoordsRef.current = coords;
      setOpenMarkerModal(true);
    }

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
            {markers &&
              markers.map((marker, i) => (
                <Marker
                  key={i}
                  position={marker.coords}
                  markerDetails={marker}
                />
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
              onAddMarker={addMarker}
              clickedCoords={clickedCoordsRef.current}
              handleClickOpen={handleClickOpenMarkerModal}
              handleClose={handleCloseMarkerModal}
              open={openMarkerModal}
              fetchMarkers={fetchMarkers}
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
