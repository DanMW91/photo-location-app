import React, { useState, FunctionComponent } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login(): void {},
  logout(): void {},
});

export const AuthContextProvider: FunctionComponent = ({
  children,
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (): void => {
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
