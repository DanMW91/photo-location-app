import { FunctionComponent, useCallback, useEffect, useState } from 'react';

import PhotoList from './PhotoList/PhotoList';
import { MarkerDetails } from '../MapPage';
import AddPhotoModal from './AddPhotoModal';

interface LocationProps {
  locationDetail: MarkerDetails;
}

const LocationDetail: FunctionComponent<LocationProps> = ({
  locationDetail,
}) => {
  const [photos, setPhotos] = useState();

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
      <div>{locationDetail.description}</div>
      <AddPhotoModal locationName={locationDetail.name} />
      {photos && <PhotoList isMapPage={true} images={photos} />}
    </>
  );
};

export default LocationDetail;
