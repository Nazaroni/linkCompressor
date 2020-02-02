import React, { useState } from 'react';
import './AuthPage.css';

export const AuthPage = () => {
  const [ form, setForm ] = useState({
    email: '', password: ''
  })

  const changeHandler = ( event ) => {
    setForm( { ...form, [ event.target.name]: event.target.value } );
  }

  // TODO: server requests

  return (
    <div className='row'>
      <div className='col s6 offset-s2'>
        <h2>Make link shorter</h2>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorisation</span>
              <div>

                <div className='input-field'>
                  <input 
                    placeholder='Enter Email'
                    name='email'
                    id='email' 
                    type='text'
                    className='yellow-input'
                    onChange={ changeHandler }
                  />

                  <label htmlFor='email'>Email</label>
                </div>

                <div className='input-field'>
                  <input 
                    placeholder='Enter Password'
                    name='password'
                    id='password' 
                    type='password'
                    className='yellow-input'
                    onChange={ changeHandler }
                  />

                  <label htmlFor='password'>Password</label>
                </div>

              </div>
          </div>
          <div className='card-action'>
            <button className='btn yellow darken-4'>Login</button>
            <button className='btn grey darken-4'>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}