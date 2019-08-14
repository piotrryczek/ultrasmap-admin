import React from 'react';
import { Link } from 'react-router-dom';

function SidePanel() {
  return (
    <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
      {/* <li>
        <Link to="/suggestions">Suggestions</Link>
      </li> */}
      <li>
        <Link to="/clubs">Clubs</Link>
      </li>
      {/* <li>
        <Link to="/backups">Backups</Link>
      </li> */}
      {/* <li>
        <Link to="/activities">Activities</Link>
      </li> */}
    </ul>
  );
}

export default SidePanel;
