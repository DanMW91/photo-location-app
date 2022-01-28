import { useState, useEffect, FunctionComponent } from 'react';

interface MarkerProps extends google.maps.MarkerOptions {
  onClick: (e: google.maps.MapMouseEvent) => void;
}

const Marker: FunctionComponent<MarkerProps> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (marker) {
      const click = options.onClick;
      marker.addListener('click', click);
    }
  }, [marker, options.onClick]);

  useEffect(() => {
    if (!marker) {
      console.log('new marker');
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
      console.log(options);
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default Marker;
