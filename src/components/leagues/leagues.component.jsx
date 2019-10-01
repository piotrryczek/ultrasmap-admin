import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Auth from 'services/auth';
import Api from 'services/api';

import TableList from 'common/tableList/tableList.component';
import { setMessage, setIsLoading } from 'components/app/app.actions';

function Leagues(props) {
  const dispatch = useDispatch();

  const columns = useMemo(() => ([{
    name: 'name',
    type: 'text'
  }, {
    name: 'importanceModifier',
    type: 'text'
  },{
    name: 'tier',
    headerLabel: 'leagueTier',
    type: 'text'
  }, {
    name: 'nrClubs',
    type: 'function',
    displayFunction: ({ clubs }) => clubs.length,
  }]), []);

  const hasEditCredential = Auth.hasCredentialLocal('updateLeague');

  const downloadMatches = useCallback(async (leagueId) => {
    dispatch(setIsLoading(true));
    
    await Api.post(`/leagues/${leagueId}/downloadMatches`);

    dispatch(setMessage('success', 'LEAGUE_MATCHES_DOWNLOADED'));
    dispatch(setIsLoading(false));
  }, []);

  const actions = useMemo(() => ([{
    label: 'Pobierz mecze',
    action: downloadMatches
  }]), []);

  return (
    <TableList
      {...props}
      apiPath="/leagues"
      adminPath="/leagues"
      canAdd
      canEdit
      canRemove
      columns={columns}
      hasEditCredential={hasEditCredential}
      actions={actions}
    />
  );
}

export default Leagues;
