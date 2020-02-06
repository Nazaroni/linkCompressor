import { BrowserRouter } from 'react-router-dom';
import React        from 'react';
import useRoutes    from './routes';
import useAuth      from './hooks/auth.hook';
import AuthContext  from './context/AuthContext';
import Navbar       from './components/Navbar/Navbar';
import 'materialize-css';

import './App.css';

function App() {
  const {
    token, login, logout, userID,
  } = useAuth();

  const isAuthenticated = !!token; // double !! - it's bool.
  console.log( `isAuthenticated is :${ isAuthenticated }`);

  const routes = useRoutes( isAuthenticated );
  return (
    <AuthContext.Provider value={{
      token, login, logout, userID, isAuthenticated,
    }}
    >
      <BrowserRouter>
        { isAuthenticated && <Navbar />}
        <div className="container">
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
