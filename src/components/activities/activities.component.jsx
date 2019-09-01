import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Api from 'services/api';
// import Auth from 'services/auth';

import { translateChoices } from 'util/helpers';

import TableList from 'common/tableList/tableList.component';

function Activities(props) {
  const { t } = useTranslation();
  const [moderatorsAndAdmins, setModeratorsAndAdmin] = useState([]);

  const columns = useMemo(() => ([{
    name: '_id',
    type: 'text'
  }, {
    name: 'objectType',
    type: 'text',
    translate: 'objectTypes',
  },{
    name: 'actionType',
    type: 'text',
    translate: 'actionTypes',
  }, {
    name: 'user',
    field: 'user.email',
    type: 'text',
  }]), []);

  const fetchModeratorsAndAdmins = async () => {
    const { data: moderatorsAndAdmins } = await Api.get('/users/adminsAndModerators');
    
    setModeratorsAndAdmin(moderatorsAndAdmins.map(({ _id, email }) => ({
      value: _id,
      label: email,
    })));
  }

  useEffect(() => {
    fetchModeratorsAndAdmins();
  }, []);

  const searchColumns = useMemo(() => ([
    {
      name: 'objectType',
      type: 'select',
      choices: translateChoices(t, ['club', 'suggestion', 'user'], 'objectTypes'),
    },
    {
      name: 'actionType',
      type: 'select',
      choices: translateChoices(t, ['add', 'remove', 'update', 'apply'], 'actionTypes'),
    },
    {
      name: 'user',
      type: 'select',
      choices: moderatorsAndAdmins,
    }]), [moderatorsAndAdmins]);

  return (
    <TableList
      {...props}
      apiPath="/activities"
      adminPath="/activities"
      columns={columns}
      searchColumns={searchColumns}
    />
  );
}

export default Activities;
