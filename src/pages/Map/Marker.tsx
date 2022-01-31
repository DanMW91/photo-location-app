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

interface MarkerInterface extends google.maps.Marker {
  hasClickListener?: boolean;
}

const Marker: FunctionComponent<MarkerProps> = (props) => {
  const [marker, setMarker] = useState<MarkerInterface>();
  const locationCtx = useContext(LocationContext);
  // const [clicked, setClicked] = useState(false);

  const click = useCallback(
    (e) => {
      // markerDetails received from props
      const markerDetails = props.markerDetails;
      // set this markers details as the selected marker in MapPage.tsx
      locationCtx?.setActiveLocation(markerDetails);
    },
    [props, locationCtx]
  );

  useEffect(() => {
    if (marker) {
      // attach listener only when new marker is set
      if (!marker.hasClickListener) {
        marker.addListener('click', click);
        marker.hasClickListener = true;
      }
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
      // console.log(props);
      marker.setOptions(props);
    }
  }, [marker, props]);

  return null;
};

export default Marker;
