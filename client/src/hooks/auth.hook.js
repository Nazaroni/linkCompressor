import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';


const useAuth = () => {
  const [ token, setToken ]   = useState( null );
  const [ ready, setReady ]   = useState( false );
  const [ userID, setUserID]  = useState( null );

  // we use callback for 'login" to be able use the as useEffect dependecty
  const login = useCallback(
    ( jwtToken, id ) => {
      setToken( jwtToken );
      setUserID( id );

      // localStorag - basic BROWSER API
      localStorage.setItem( storageName, JSON.stringify( {
        userID: id, token: jwtToken,
      }));
    },
    [],
  );

  const logout = useCallback(
    () => {
      setToken( null );
      setUserID( null );
      localStorage.removeItem( storageName );
    },
    [],
  );

  useEffect(() => {
    const data = JSON.parse( localStorage.getItem( storageName ) );

    if ( data && data.token ) {
      login( data.token, data.userID );
    }
    setReady( true );
  }, [ login ] );


  return {
    login, logout, token, userID, ready,
  };
};

export default useAuth;
