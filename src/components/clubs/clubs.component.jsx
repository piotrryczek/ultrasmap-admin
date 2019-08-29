import React from 'react';
import { useTranslation } from 'react-i18next';
import Auth from 'services/auth';

import TableList from 'common/tableList/tableList.component';

function Clubs() {
  const { t } = useTranslation();

  const columns = [{
    label: t('club.name'),
    name: 'name',
    type: 'text'
  }, {
    label: t('club.logo'),
    name: 'logo',
    type: 'image',
    alignment: 'center',
  }, {
    label: t('club.tier'),
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
