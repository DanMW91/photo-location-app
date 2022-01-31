import { FunctionComponent } from 'react';

import PhotoCard from './PhotoCard';
import { PhotoInterface } from '../../../../store/location-ctx';

interface PhotoListProps {
  images: PhotoInterface[] | null;
  isMapPage?: boolean | undefined;
}

const PhotoList: FunctionComponent<PhotoListProps> = ({
  images,
  isMapPage,
}) => {
  return (
    <>
      {images?.map((photo, i) => {
        return <PhotoCard isMapPage={isMapPage} key={i} photo={photo} />;
      })}
    </>
  );
};

export default PhotoList;
