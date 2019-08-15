import React, { useCallback } from 'react';
import Auth from 'services/auth';

function Titlebar() {
  const handleLogout = useCallback(async () => {
    await Auth.logout();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken'); // TODO: isAuthenticated from state instead localstorage

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
