import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { PER_PAGE_MATCHES } from 'config/config';
import Api from 'services/api';
import { setIsLoading, setMessage } from 'components/app/app.actions';
import Pagination from 'common/pagination/pagination.component';

import { useButtonStyles } from 'theme/useStyles';
import Match from './match.component';
import MatchesFilters from './matchesFilters.component';

const useStyles = makeStyles(theme => ({
  leftMargin: {
    marginLeft: theme.spacing(2),
  }
}));

function Matches(props) {
  const page = +(_get(props, 'match.params.page', 1));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const buttonClasses = useButtonStyles({});
  const classes = useStyles({});

  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);
  const [state, setState] = useState({
    matches: [],
    allCount: 0,
    selected: [],
    filters: {
      isVisible: true,
      date: {
        type: 'before',
        time: Date.now(),
      }
    },
  });

  const {
    matches,
    allCount,
    selected,
    filters,
  } = state;

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const fetchData = useCallback(async () => {
    dispatch(setIsLoading(true));

    const {
      data: matches,
      allCount
    } = await Api.get('/matches', {
      page,
      filters,
    });

    setState(prevState => ({
      ...prevState,
      allCount,
      matches,
    }));

    dispatch(setIsLoading(false));
  }, [page, selected, filters]);

  const handleSelect = useCallback((id) => {
    setState(prevState => ({
      ...prevState,
      selected: [...prevState.selected, id],
    }));
  }, []);

  const handeDeselect = useCallback((id) => {
    setState(prevState => ({
      ...prevState,
      selected: prevState.selected.filter(selectedId => selectedId !== id),
    }));
  }, []);

  const handleDelete = useCallback(async () => {
    dispatch(setIsLoading(true));

    await Api.delete('/matches', {
      ids: selected,
    });

    dispatch(setIsLoading(false));
    dispatch(setMessage('success', 'REMOVE_SUCCESS'));

    if (page === 1) fetchData();

    setState(prevState => ({
      ...prevState,
      selected: [],
      page: 1,
    }));
  }, [selected]);

  const handleOpenRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(true);
  }, []);

  const handleCloseRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(false);
  }, []);

  const handleDeleteAndCloseRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(false);

    handleDelete();
  }, [handleDelete]);

  const handleFilter = useCallback((filters) => {
    setState(prevState => ({
      ...prevState,
      filters,
      page: 1,
    }));
  }, []);
  
  return (
    <Grid container spacing={3}>
      <MatchesFilters onFilter={handleFilter} />
      <Grid item xs={12}>
        <Paper>
          <Box p={1}>
            <table className="table-matches">
              <thead>
                <tr>
                  <th>
                    {t('matches.remove')}
                    {selected.length > 0 && (
                      <>
                        <Dialog
                          open={isRemoveDialogOpened}
                          onClose={handleCloseRemoveDialog}
                        >
                          <DialogTitle>{t('global.confirmRemove', { nrItems: selected.length })}</DialogTitle>
                          
                          <DialogActions>
                            <Button
                              onClick={handleCloseRemoveDialog}
                              variant="contained"
                              color="primary"
                            >
                              {t('global.close')}
                            </Button>
                            <Button
                              onClick={handleDeleteAndCloseRemoveDialog}
                              variant="contained"
                              color="primary"
                              className={buttonClasses.remove}
                            >
                              {t('global.remove')}
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={handleOpenRemoveDialog}
                          className={classNames(buttonClasses.remove, classes.leftMargin)}
                        >
                          {t('global.remove')}
                        </Button>
                      </>
                    )}
                  </th>
                  <th>{t('matches.importance')}</th>
                  <th className="match-home-club">{t('matches.homeClub')}</th>
                  <th>{t('matches.attitude')}</th>
                  <th>{t('matches.awayClub')}</th>
                  <th>{t('matches.location')}</th>
                  <th>{t('matches.league')}</th>
                  <th>{t('matches.date')}</th>
                  <th>{t('matches.isVisible')}</th>
                  <th>{t('matches.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {matches.map(match => {
                  const isChecked = selected.includes(match._id);

                  return (<Match key={match._id} match={match} isChecked={isChecked} onSelect={handleSelect} onDeselect={handeDeselect} />);
                })}
              </tbody>
            </table>
            <Box mt={2}>
              <Pagination
                page={page}
                allCount={allCount}
                basePath="/matches"
                perPage={PER_PAGE_MATCHES}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Matches;
