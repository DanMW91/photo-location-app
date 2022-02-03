import { Container, Paper } from '@mui/material';
import { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { PhotoInterface } from '../../context/location-ctx';
import PhotoList from '../Map/LocationDetail/PhotoList/PhotoList';

interface userObjectInterface {
  username: string;
  photos: PhotoInterface[];
}

const ShowUser: FunctionComponent = () => {
  const userId = useParams().userId;

  const [user, setUser] = useState<userObjectInterface | null>(null);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/photos/user/${userId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setUser(responseData);
      // const user: UserInterface = responseData.user;
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

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
        <h2>{user?.username}'s Photos</h2>
        {user && <PhotoList images={user.photos} />}
      </Paper>
    </Container>
  );
};

export default ShowUser;
