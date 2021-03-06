import React, { useState, FunctionComponent } from 'react';
import { UserInterface } from '../pages/Auth/components/LoginForm';

const AuthContext = React.createContext({
  loginState: {
    isLoggedIn: false,
    activeUser: {
      id: '',
      username: '',
      email: '',
    },
  },
  login(user: UserInterface): void {},
  logout(): void {},
});

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    activeUser: {
      id: '',
      username: '',
      email: '',
    },
  });

  const login = (user: UserInterface): void => {
    setLoginState({
      activeUser: user,
      isLoggedIn: true,
    });
  };

  const logout = (): void => {
    setLoginState({
      isLoggedIn: false,
      activeUser: {
        id: '',
        username: '',
        email: '',
      },
    });
  };

  const contextValue = {
    loginState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
