import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USERS } from '../Auth/components/LoginForm';
import { UserInterface } from '../Auth/components/LoginForm';

const ShowUser: FunctionComponent = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<UserInterface | undefined>();

  useEffect(() => {
    const foundUser = USERS.find((user) => user.userId === userId);
    setUser(foundUser);
  }, [userId]);

  return <h1>{user?.username}</h1>;
};

export default ShowUser;
