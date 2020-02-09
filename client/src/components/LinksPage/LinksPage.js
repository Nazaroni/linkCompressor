import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';
import LinksList from '../LinksList/LinksList';

const LinksPage = () => {
  const [ links, setLinks ] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext( AuthContext );

  const fetchLinks = useCallback( async () => {
    try {
      const fetched = await request( '/api/link', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });
      setLinks( fetched );
    }
    catch ( e ) {
      console.log( e );
    }
  }, [ token, request ] );

  useEffect( () => {
    fetchLinks();
  }, [fetchLinks] );

  if ( loading ) {
    return <Loader />;
  }

  return (
    <>
      { !loading && <LinksList links={links} /> }
    </>
  );
};

export default LinksPage;
