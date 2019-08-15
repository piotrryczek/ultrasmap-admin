import React from 'react';
import Auth from 'services/auth';

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

  const hasEditCredential = Auth.hasCredentialLocal('updateClub');

  return (
    <TableList
      fetchDataUrl="/clubs"
      editUrl="/clubs"
      addUrl="/clubs/new"
      columns={columns}
      searchColumns={searchColumns}
      editCredential="updateClub"
      hasEditCredential={hasEditCredential}
    />
  );
}

export default Clubs;
