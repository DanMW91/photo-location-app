import React, {
  useState,
  FunctionComponent,
  useEffect,
  useCallback,
} from 'react';

const PHOTOS: PhotoInterface[] = [
  {
    title: 'Barbican wide shot',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Barbican_towers.jpg/1920px-Barbican_towers.jpg',
    description: 'Taken from my balcony, on a misty morning in January.',
    userId: 'u1',
    locationId: 'loc1',
  },
];

interface LocationInterface {
  id: string;
  coords: {
    lat: number;
    lng: number;
  };
  name: string;
  description: string;
}

export interface PhotoInterface {
  title: string;
  url: string;
  description: string;
  userId: string;
  locationId: string;
}

interface LocationContextInterface {
  location: LocationInterface | undefined;
  photos: PhotoInterface[] | undefined;
  setActiveLocation(location: LocationInterface): void;
}

const LocationContext = React.createContext<LocationContextInterface | null>(
  null
);

export const LocationContextProvider: FunctionComponent = ({
  children,
}): JSX.Element => {
  const [location, setLocation] = useState<LocationInterface>();
  const [photos, setImages] = useState<PhotoInterface[]>();

  const setActiveLocation = useCallback((location: LocationInterface) => {
    // TO DO fetch location from back-end
    setLocation(location);
  }, []);

  useEffect(() => {
    if (location) {
      // TO DO filter images by location ID on backend and return
      const locationPhotos = PHOTOS.filter(
        (photo) => photo.locationId === location.id
      );
      setImages(locationPhotos);
    }
  }, [location]);

  const contextValue: LocationContextInterface = {
    location,
    photos,
    setActiveLocation,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
