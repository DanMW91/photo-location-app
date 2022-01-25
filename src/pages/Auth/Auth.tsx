import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { Box } from '@mui/system';

const Auth = (): JSX.Element => {
  const [login, setLogin] = useState(true);

  return (
    <Container sx={{ '@media (min-width:780px)': { width: '60%' } }}>
      {login && (
        <>
          <h2>Login</h2>
          <LoginForm />
        </>
      )}
      {!login && (
        <>
          <h2>Register</h2>
          <RegistrationForm />
        </>
      )}
      <Box textAlign="center">
        <Button
          sx={{ margin: 'auto' }}
          onClick={() => {
            setLogin((prevState) => !prevState);
          }}
        >
          {login ? 'Register' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
