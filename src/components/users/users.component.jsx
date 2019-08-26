import React from 'react';
import Auth from 'services/auth';

import TableList from 'common/tableList/tableList.component';

function Users() {

  const columns = [{
    label: 'Email',
    name: 'email',
    type: 'text'
  }, {
    label: 'Role',
    name: 'role',
    type: 'text',
    field: 'role.name',
  }];

  const searchColumns = ['email'];
  
  const hasEditCredential = Auth.hasCredentialLocal('updateUser');

  return (
    <TableList
      apiPath="/users"
      canAdd
      canEdit
      columns={columns}
      searchColumns={searchColumns}
      hasEditCredential={hasEditCredential}
    />
  );
}

export default Users;
