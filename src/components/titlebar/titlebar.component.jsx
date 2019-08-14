import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from 'components/app/app.actions';

function Titlebar() {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <>
      <p>TItlebar</p>
      {jwtToken && (
        <button type="button" onClick={handleLogout}>Wyloguj sie</button>
      )}
    </>
    
  );
}

export default Titlebar;
