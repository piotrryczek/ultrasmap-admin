import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Api from 'services/api';
import { setMessage } from 'components/app/app.actions';

function Login() {

  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const {
    email,
    password,
  } = fields;

  const handleLogin = async (event) => {
    event.preventDefault();


    try {
      const jwtToken = await Api.post('/users/login', {
        email,
        password,
      });

      localStorage.setItem('jwtToken', jwtToken);

      dispatch(setMessage('success', 'LOGIN_SUCCESS'));
    } catch (error) {
      const {
        response: {
          data: {
            type,
            message,
          },
        },
        // status,
      } = error;
      
      dispatch(setMessage('error', type));
    }
  };

  const handleChangeField = field => (event) => {
    const { value } = event.target;

    setFields({
      ...fields,
      [field]: value,
    });
  };

  return (
    <>
      <form action="" onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChangeField('email')}
        />
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChangeField('password')}
        />

        <button type="submit">Zaloguj</button>
      </form>
    </>
  )
}

export default Login;
