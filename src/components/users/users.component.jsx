import React from 'react';
import { useTranslation } from 'react-i18next';
import Auth from 'services/auth';

import TableList from 'common/tableList/tableList.component';

function Users() {
  const { t } = useTranslation();

  const columns = [{
    label: t('user.email'),
    name: 'email',
    type: 'text'
  }, {
    label: t('user.role'),
    name: 'role',
    type: 'text',
    field: 'role.name',
  }, {
    label: t('user.verified'),
    name: 'verified',
    type: 'boolean'
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
