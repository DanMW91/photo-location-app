import { FunctionComponent, useContext } from 'react';
import LocationContext from '../../../store/location-ctx';
import PhotoList from './PhotoList/PhotoList';
import { MarkerDetails } from '../MapPage';

interface LocationProps {
  locationDetail: MarkerDetails;
}

const LocationDetail: FunctionComponent<LocationProps> = ({
  locationDetail,
}) => {
  const locationCtx = useContext(LocationContext);

  return (
    <>
      <div>{locationDetail.name}</div>
      <PhotoList images={locationCtx.photos} />
    </>
  );
};

export default LocationDetail;
