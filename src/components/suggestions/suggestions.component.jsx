import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import _find from 'lodash/find';

import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useButtonStyles } from 'theme/useStyles';
import { setMessage } from 'components/app/app.actions';
import Api from 'services/api';
import Auth from 'services/auth';

import Pagination from 'common/pagination/pagination.component';

import Suggestion from './suggestion.component';
import SuggestionLink from './suggestionLink.component';

function Suggestions() {
  const dispatch = useDispatch(); 
  const buttonClasses = useButtonStyles({});

  const hasUpdateSuggestionCredential = Auth.hasCredentialLocal('updateSuggestion');

  const [state, setState] = useState({
    suggestions: [],
    currentSuggestionId: '',
    selected: [],
    allCount: 0,
    page: 1,
  });

  const {
    suggestions,
    currentSuggestionId,
    selected,
    allCount,
    page,
  } = state;

  useEffect(() => {
    fetchData();
  }, [page]);

  const changePage = useCallback((newPage) => {
    setState(prevState => ({
      ...prevState,
      page: newPage,
      selected: [],
    }));
  }, [page]);


  const fetchData = useCallback(async () => {
    const {
      data: suggestions,
      allCount
    } = await Api.get('/suggestions', {
      page,
    });

    setState(prevState => ({
      ...prevState,
      currentSuggestionId: suggestions.length ? suggestions[0]._id : null,
      allCount,
      suggestions,
    }));
  }, [page]);

  const handleCurrentSuggestionChange = useCallback((newCurrentSuggestionId) => {
    setState(prevState => ({
      ...prevState,
      currentSuggestionId: newCurrentSuggestionId,
    }));
  }, []);

  const reload = useCallback(async () => {
    setState(prevState => ({
      ...prevState,
      selected: [],
      page: 1,
    }));

    if (page === 1) {
      await fetchData();
    }
  }, []);

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

  const handleDelete = useCallback(async (passedSelected = null) => {
    await Api.delete('/suggestions', {
      ids: Array.isArray(passedSelected) ? passedSelected : selected,
    });

    dispatch(setMessage('success', 'REMOVE_SUCCESS'));

    if (page === 1) fetchData();

    setState(prevState => ({
      ...prevState,
      selected: [],
      page: 1,
    }));
  }, [selected]);

  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);

  const handleOpenRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(true);
  }, []);

  const handleCloseRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(false);
  }, []);

  const isAllChecked = suggestions.length && suggestions.every(suggestion => selected.includes(suggestion._id));
  const handleToggleSelected = useCallback(() => {
    const updatedSelected = isAllChecked ? [] : suggestions.map(suggestion => suggestion._id);

    setState(prevState => ({
      ...prevState,
      selected: updatedSelected,
    }));
  }, [suggestions, isAllChecked]);

  const currentSuggestion = currentSuggestionId ? _find(suggestions, { _id: currentSuggestionId }) : null;

  return (
    <Paper>
      <Box pt={2}>
        {suggestions.length > 0 && (
          <Checkbox
            checked={isAllChecked}
            onChange={handleToggleSelected}
          />
        )}
        {hasUpdateSuggestionCredential && selected.length > 0 && (
          <>
            <Dialog
              open={isRemoveDialogOpened}
              onClose={handleCloseRemoveDialog}
            >
              <DialogTitle>Are you sure you want to delete?</DialogTitle>
              
              <DialogActions>
                <Button
                  onClick={handleCloseRemoveDialog}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="primary"
                  className={buttonClasses.remove}
                >
                  Remove
                </Button>
              </DialogActions>
            </Dialog>

            <Button variant="contained" color="primary" type="submit" onClick={handleOpenRemoveDialog} className={buttonClasses.remove}>Remove</Button>
          </>
        )}
        <List>
          {suggestions.map(suggestion => (
            <SuggestionLink
              key={suggestion._id}
              suggestion={suggestion}
              isCurrent={suggestion._id === currentSuggestionId}
              onCurrentChange={handleCurrentSuggestionChange}
              onSelect={handleSelect}
              onDeselect={handeDeselect}
              isChecked={selected.includes(suggestion._id)}
            />
          ))}
        </List>
      </Box>
      <Box mb={2}>
        <Pagination
          page={page}
          allCount={allCount}
          changePage={changePage}
        />
      </Box>

      <Divider />

      {currentSuggestion && (
        <Suggestion
          suggestion={currentSuggestion}
          reload={reload}
          remove={handleDelete}
          hasUpdateSuggestionCredential={hasUpdateSuggestionCredential}
        />
      )}
    </Paper>
    
  );
}

export default Suggestions;
