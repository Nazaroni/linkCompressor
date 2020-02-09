import { createContext } from 'react';

// empty function for doint NOTHING!!!!! :D purpose: earse user data
const noop = () => {};

// use Context to forward this data to whole app (all pages)
const AuthContext = createContext({
  token: null,
  userID: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export default AuthContext;
