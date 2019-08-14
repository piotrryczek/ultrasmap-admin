import React from 'react';

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

  return (
    <TableList
      fetchDataUrl="/users"
      columns={columns}
      searchColumns={searchColumns}
    />
  );
}

export default Users;
