import { FunctionComponent } from 'react';

import PhotoCard from './PhotoCard';
import { PhotoInterface } from '../../../../store/location-ctx';

interface PhotoListProps {
  images: PhotoInterface[] | null;
}

const PhotoList: FunctionComponent<PhotoListProps> = ({ images }) => {
  return (
    <>
      {images?.map((photo, i) => {
        return <PhotoCard key={i} photo={photo} />;
      })}
    </>
  );
};

export default PhotoList;
