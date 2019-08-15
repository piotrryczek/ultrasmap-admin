import React, { useState } from 'react';
import Auth from 'services/auth';

function Login() {
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

    await Auth.login(email, password);
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
