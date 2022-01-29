import {
  useState,
  useEffect,
  FunctionComponent,
  useCallback,
  useContext,
} from 'react';
import LocationContext from '../../store/location-ctx';
import { MarkerDetails } from './MapPage';

interface MarkerProps extends google.maps.MarkerOptions {
  markerDetails: MarkerDetails;
}

const Marker: FunctionComponent<MarkerProps> = (props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const locationCtx = useContext(LocationContext);
  // const [clicked, setClicked] = useState(false);

  const click = useCallback(
    (e) => {
      // markerDetails received from props
      console.log('clicked marker');
      const markerDetails = props.markerDetails;
      // set this markers details as the selected marker in MapPage.tsx
      locationCtx?.setActiveLocation(markerDetails);
    },
    [props, locationCtx]
  );

  useEffect(() => {
    if (marker) {
      // attach listener only when new marker is set
      marker.addListener('click', click);
    }
  }, [marker, click]);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      console.log(props);
      marker.setOptions(props);
    }
  }, [marker, props]);

  return null;
};

export default Marker;
