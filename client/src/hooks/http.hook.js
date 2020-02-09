import { useState, useCallback } from 'react';

const useHttp = () => {
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ]     = useState( null );

  const request = useCallback(
    async ( url, method = 'GET', body = null, headers = {}) => {
      setLoading( true );     // start loading message
      try {
        if ( body ) {
          // eslint-disable-next-line no-param-reassign
          body = JSON.stringify( body );
          console.log( 'body is:' );
          console.log( body );

          // tell that we send JSON in body
          // eslint-disable-next-line no-param-reassign
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if ( !response.ok ) {
          throw new Error( data.message || 'http.hooks.js -> useHttp response error' );
        }
        else {
          console.log( 'response is ok!' );
        }

        setLoading( false );  // stop loading message

        return data;
      }
      catch ( e ) {
        console.log( 'http.hook.js -> errorBody: ');
        console.log( e.message );
        setLoading( false );
        setError( e.message );
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback( () => { return setError( null ); }, [] );

  return {
    loading, request, error, clearError,
  };
};

export default useHttp;
