import { FunctionComponent } from 'react';
import PhotoCard from '../../../../shared/components/PhotoCard';
import { PhotoInterface } from '../../../../context/location-ctx';

interface PhotoListProps {
  images: PhotoInterface[];
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
