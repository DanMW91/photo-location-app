import React, {
  useState,
  FunctionComponent,
  useEffect,
  useCallback,
} from 'react';

export const PHOTOS: PhotoInterface[] = [
  {
    title: 'Barbican wide shot',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Barbican_towers.jpg/1920px-Barbican_towers.jpg',
    description: 'Taken from my balcony, on a misty morning in January.',
    userId: 'u1',
    locationId: 'loc1',
  },
  {
    title: 'Barbican From Above',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Barbicanestatefromabove.jpg/1920px-Barbicanestatefromabove.jpg',
    description:
      'Got this shot with my drone before they got bascially outlawed! Very pleased with the result.',
    userId: 'u1',
    locationId: 'loc1',
  },
  {
    title: 'Barbican Centre',
    url: 'https://static.standard.co.uk/homesandproperty/s3fs-public/thumbnails/image/2019/07/05/17/Barbican10-4.jpg?width=990',
    description:
      'The beautiful area behind the barbican center. Shame about all the people, suns out guns out eh?',
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
  locationId: string | undefined;
}

interface LocationContextInterface {
  location: LocationInterface | null;
  photos: PhotoInterface[] | null;
  setActiveLocation(location: LocationInterface): void;
  addPhoto(photo: PhotoInterface): void;
}

const LocationContext = React.createContext<LocationContextInterface>({
  location: {
    id: '',
    coords: { lat: 0, lng: 0 },
    name: '',
    description: '',
  },
  photos: [
    {
      title: '',
      url: '',
      description: '',
      userId: '',
      locationId: '',
    },
  ],
  setActiveLocation(location: LocationInterface) {},
  addPhoto(photo: PhotoInterface) {},
});

export const LocationContextProvider: FunctionComponent = ({ children }) => {
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [photos, setPhotos] = useState<PhotoInterface[] | null>(null);

  const setActiveLocation = useCallback((location: LocationInterface) => {
    // TO DO fetch location from back-end
    setLocation(location);
  }, []);

  const addPhoto = useCallback((photo: PhotoInterface) => {
    PHOTOS.push(photo);
  }, []);

  useEffect(() => {
    if (location) {
      // TO DO filter images by location ID on backend and return
      const locationPhotos = PHOTOS.filter(
        (photo) => photo.locationId === location.id
      );
      setPhotos(locationPhotos);
    }
  }, [location]);

  const contextValue: LocationContextInterface = {
    location,
    photos,
    setActiveLocation,
    addPhoto,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
