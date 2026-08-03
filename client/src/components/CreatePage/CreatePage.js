import React, { useEffect, useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import './CreatePage.css';

const CreatePage = () => {
  const navigate = useNavigate();
  const auth              = useContext( AuthContext );
  const { request }       = useHttp();
  const [ link, setLink ] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async ( event ) => {
    if ( event.key === 'Enter' ) {
      event.preventDefault();
      submitLink();
    }
  };

  const submitLink = async () => {
    if ( !link ) {
      return;
    }
    try {
      const data = await request( '/api/link/generate', 'POST', { from: link }, {
        Authorization: `Bearer ${ auth.token }`,
      });
      // eslint-disable-next-line no-underscore-dangle
      navigate( `/detail/${ data.link._id}`);
    }
    catch ( e ) {
      console.log( e );
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
            onKeyDown={pressHandler}
          />
          <label htmlFor="link">Please type a link</label>
        </div>
        <button
          type="button"
          className="btn yellow darken-4"
          onClick={submitLink}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
