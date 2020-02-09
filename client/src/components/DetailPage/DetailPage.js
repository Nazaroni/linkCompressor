import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';
import LinkCard from '../LinkCard/LinkCard';


const DetailPage = () => {
  const { token } = useContext( AuthContext);
  const { request, loading } = useHttp();
  const [ link, setLink ] = useState( null );
  const linkID = useParams().id;

  const getLink = useCallback(
    async () => {
      try {
        const fetched = await request( `/api/link/${ linkID }`, 'GET', null, {
          Authorization: `Bearer ${ token }`,
        });
        setLink( fetched );
      }
      catch ( e ) {
        console.log( 'DetailPage.js -> DetailPage error: ' );
        console.log( e );
      }
    },
    [ token, linkID, request ],
  );

  useEffect(() => {
    getLink();
  }, [ getLink ]);

  if ( loading ) {
    return <Loader />;
  }

  return (
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  );
};

export default DetailPage;
