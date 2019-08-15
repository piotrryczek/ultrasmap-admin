import React from 'react';
import { Link } from 'react-router-dom';

import Auth from 'services/auth';

function SidePanel() {
  return (
    <ul>
      {Auth.hasCredentialLocal('getUser') && (
        <li>
          <Link to="/users">Users</Link>
        </li>
      )}
      {Auth.hasCredentialLocal('getClub') && (
        <li>
          <Link to="/clubs">Clubs</Link>
        </li>
      )}
      {Auth.hasCredentialLocal('getSuggestion') && (
        <li>
          <Link to="/suggestions">Suggestions</Link>
        </li>
      )}
      
      {Auth.hasCredentialLocal('getActivity') && (
        <li>
          <Link to="/activities">Activities</Link>
        </li>
      )}
      {Auth.hasCredentialLocal('getBackup') && (
        <li>
          <Link to="/backups">Backups</Link>
        </li>
      )}
    </ul>
  );
}

export default SidePanel;
