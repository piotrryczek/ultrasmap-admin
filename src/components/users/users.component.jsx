import React from 'react';
import Auth from 'services/auth';

import TableList from 'common/tableList/tableList.component';

function Users() {

  const columns = [{
    label: 'Name',
    name: 'name',
    type: 'text'
  }, {
    label: 'Email',
    name: 'email',
    type: 'text'
  }, {
    label: 'Role',
    name: 'role',
    type: 'text',
    field: 'role.name',
  }];

  const searchColumns = ['name', 'email'];
  
  const hasEditCredential = Auth.hasCredentialLocal('updateUser');

  return (
    <TableList
      fetchDataUrl="/users"
      editUrl="/users"
      addUrl="/users/new"
      columns={columns}
      searchColumns={searchColumns}
      hasEditCredential={hasEditCredential}
    />
  );
}

export default Users;
