import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ]     = useState( null );

  const request = useCallback(
    async ( url, method = 'GET', body = null, headers = {}) => {
      setLoading( true );     // start loading message
      try {
        if ( body ) {
          body = JSON.stringify( body );
          
          // tell that we send JSON in body
          headers[ 'Content-Type' ] = 'application/json';
        };

        const response  = await fetch( url, { method, body, headers });
        const data      = await response.json();

        if ( !response.ok ) {
          throw new Error( data.message || 'http.hooks.js -> useHttp response error' );
        }

        setLoading( false );  // stop loading message

        return data;
      } 
      catch ( error ) {
        setLoading( false );
        setError( error.message );
        throw error;
      }
    },
    [],
  )

  const clearError = () => setError( null );

  return { loading, request, error, clearError };
}