import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import LocationContext from '../../../context/location-ctx';
import PhotoList from './PhotoList/PhotoList';
import { MarkerDetails } from '../MapPage';

interface LocationProps {
  locationDetail: MarkerDetails;
}

const LocationDetail: FunctionComponent<LocationProps> = ({
  locationDetail,
}) => {
  const locationCtx = useContext(LocationContext);
  const [photos, setPhotos] = useState([]);

  const fetchLocationPhotos = useCallback(async () => {
    const response = await fetch(
      `http://localhost:5000/photos/location/${locationDetail.id}`
    );
    const responseData = await response.json();
    console.log(responseData);
    setPhotos(responseData.photos);
  }, [locationDetail.id]);

  useEffect(() => {
    fetchLocationPhotos();
  }, [fetchLocationPhotos]);

  return (
    <>
      <div>{locationDetail.name}</div>
      <PhotoList isMapPage={true} images={photos} />
    </>
  );
};

export default LocationDetail;
