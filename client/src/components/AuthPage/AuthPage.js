import React, { useState, useEffect, useContext } from 'react';
import useHttp      from '../../hooks/http.hook';
import useMessage   from '../../hooks/message.hook';
import AuthContext  from '../../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
  const auth    = useContext( AuthContext );
  const message = useMessage();
  const {
    loading, request, error, clearError,
  } = useHttp();

  const [ form, setForm ] = useState({
    email: '', password: '',
  });

  useEffect( () => {
    return () => {
      message( error );
      clearError();
    };
  }, [ error, message, clearError ] );

  useEffect(() => {
    return () => {
      window.M.updateTextFields();
    };
  }, []);

  const changeHandler = ( event ) => {
    setForm( { ...form, [ event.target.name ]: event.target.value } );
  };

  const registerHandler = async () => {
    try {
      const data = await request( '/api/auth/register', 'POST', { ...form } );
      message( data.message );
    }
    catch ( errorReg ) {
      // console.log( errorReg );
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request( '/api/auth/login', 'POST', { ...form } );
      auth.login( data.token, data.userID );
    }
    catch ( errorLogin ) {
      // console.log( errorLogin );
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s2">
        <h2>Make link shorter</h2>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorisation</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  type="text"
                  className="yellow-input"
                  onChange={changeHandler}
                />

                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  type="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />

                <label htmlFor="password">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">

            <button
              type="submit"
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>

            <button
              type="submit"
              className="btn grey darken-4"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
