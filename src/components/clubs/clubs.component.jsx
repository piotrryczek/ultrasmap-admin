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
    type: 'image',
    alignment: 'center',
  }, {
    label: 'Tier',
    name: 'tier',
    type: 'text',
  }];

  const searchColumns = ['name'];

  const hasEditCredential = Auth.hasCredentialLocal('updateClub');

  return (
    <TableList
      apiPath="/clubs"
      canAdd
      canEdit
      columns={columns}
      searchColumns={searchColumns}
      editCredential="updateClub"
      hasEditCredential={hasEditCredential}
    />
  );
}

export default Clubs;
