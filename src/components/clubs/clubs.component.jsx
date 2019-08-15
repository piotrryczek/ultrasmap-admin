import React from 'react';

import TableList from 'common/tableList/tableList.component';

function Clubs() {
  const columns = [{
    label: 'Name',
    name: 'name',
    type: 'text'
  }, {
    label: 'Logo',
    name: 'logo',
    type: 'image'
  }, {
    label: 'Tier',
    name: 'tier',
    type: 'text',
  }];

  const searchColumns = ['name'];

  return (
    <TableList
      fetchDataUrl="/clubs"
      editUrl="/clubs"
      columns={columns}
      searchColumns={searchColumns}
    />
  );
}

export default Clubs;
