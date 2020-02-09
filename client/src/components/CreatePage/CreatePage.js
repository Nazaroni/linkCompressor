import React, { useEffect, useState, useContext }  from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import './CreatePage.css';

const CreatePage = () => {
  const history = useHistory();
  const auth              = useContext( AuthContext );
  const { request }       = useHttp();
  const [ link, setLink ] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async ( event ) => {
    if ( event.key === 'Enter' ) {
      try {
        console.log( 'Enter pressed' );
        const data = await request( '/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${ auth.token }`,
        });
        console.log( 'pressHandler data is: \n', data );
        // eslint-disable-next-line no-underscore-dangle
        history.push( `/detail/${ data.link._id}`);
      }
      catch ( e ) {
        console.log( e );
      }
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset=s2">
        <div className="input-field">
          <input
            placeholder="Please insert link"
            id="link"
            type="text"
            value={link}
            onChange={( e ) => { return setLink( e.target.value ); }}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Please type a link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
