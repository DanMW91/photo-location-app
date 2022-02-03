import React, { useState, FunctionComponent, useCallback } from 'react';
import { UserInterface } from '../pages/Auth/components/LoginForm';

export interface LocationInterface {
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
  user: UserInterface;
  location: LocationInterface;
}

interface LocationContextInterface {
  location: LocationInterface | null;
  // photos: PhotoInterface[] | null;
  setActiveLocation(location: LocationInterface): void;
  // addPhoto(photo: PhotoInterface): void;
}

const LocationContext = React.createContext<LocationContextInterface>({
  location: {
    id: '',
    coords: { lat: 0, lng: 0 },
    name: '',
    description: '',
  },
  setActiveLocation(location: LocationInterface) {},
});

export const LocationContextProvider: FunctionComponent = ({ children }) => {
  const [location, setLocation] = useState<LocationInterface | null>(null);
  // const [photos, setPhotos] = useState<PhotoInterface<string>[] | null>(null);

  const setActiveLocation = useCallback((location: LocationInterface) => {
    // TO DO fetch location from back-end
    setLocation(location);
  }, []);

  // const addPhoto = useCallback((photo: PhotoInterface) => {
  //   PHOTOS.push(photo);
  // }, []);

  // useEffect(() => {
  //   if (location) {
  //     // TO DO filter images by location ID on backend and return
  //     const locationPhotos = PHOTOS.filter(
  //       (photo) => photo.location === location.id
  //     );
  //     setPhotos(locationPhotos);
  //   }
  // }, [location]);

  const contextValue: LocationContextInterface = {
    location,
    setActiveLocation,
    // addPhoto,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
