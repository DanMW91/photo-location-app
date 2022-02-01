import { Container, Paper } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USERS } from '../Auth/components/LoginForm';
import { UserInterface } from '../Auth/components/LoginForm';
import { PHOTOS } from '../../context/location-ctx';
import { PhotoInterface } from '../../context/location-ctx';
import PhotoList from '../Map/LocationDetail/PhotoList/PhotoList';

const ShowUser: FunctionComponent = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<UserInterface | undefined>();
  const [userPhotos, setUserPhotos] = useState<PhotoInterface[] | null>(null);

  useEffect(() => {
    const foundUser = USERS.find((user) => user.userId === userId);
    setUser(foundUser);
    const foundPhotos = PHOTOS.filter((photos) => photos.userId === userId);
    setUserPhotos(foundPhotos);
  }, [userId]);

  return (
    <Container>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '80px',
          paddingBottom: '20px;',
        }}
      >
        <h2>{user?.username}</h2>
        <PhotoList images={userPhotos} />
      </Paper>
    </Container>
  );
};

export default ShowUser;
