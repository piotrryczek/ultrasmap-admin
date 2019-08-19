import React, { useEffect, useCallback, useState } from 'react'
import _find from 'lodash/find';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Api from 'services/api';
import history from 'config/history';

import Pagination from 'common/pagination/pagination.component';

import Suggestion from './suggestion.component';
import SuggestionLink from './suggestionLink.component';

//  TODO: Translate
const statuses = [{
  type: 'pending',
  label: 'Oczekujące'
}, {
  type: 'applied',
  label: 'Zaakceptowane',
}, {
  type: 'rejected',
  label: 'Odrzucone'
}]

// TODO: Credentials
function Suggestions() {
  const [state, setState] = useState({
    status: 'pending',
    currentSuggestionId: '',
    suggestions: [],
    allCount: 0,
    page: 1,
  });

  const {
    status,
    suggestions,
    currentSuggestionId,
    allCount,
    page,
  } = state;

  useEffect(() => {
    fetchData();
  }, [status, page]);

  const changePage = useCallback((newPage) => {
    setState(prevState => ({
      ...prevState,
      page: newPage,
    }));
  }, [page]);


  const fetchData = useCallback(async () => {
    const {
      data: suggestions,
      allCount
    } = await Api.get('/suggestions', {
      status,
      page,
    });

    // console.log(suggestions[0])

    setState(prevState => ({
      ...prevState,
      currentSuggestionId: suggestions.length ? suggestions[0]._id : null,
      allCount,
      suggestions,
    }));
  }, [status, page]);


  const handleStatusChange = useCallback(async (event) => {
    const { value } = event.target;

    setState(prevState => ({
      ...prevState,
      status: value,
      page: 1,
    }));
  }, []);


  const handleCurrentSuggestionChange = useCallback((newCurrentSuggestionId) => {
    setState(prevState => ({
      ...prevState,
      currentSuggestionId: newCurrentSuggestionId,
    }))
  }, []);

  const currentSuggestion = currentSuggestionId ? _find(suggestions, { _id: currentSuggestionId }) : null;

  return (
    <>
      <p>Suggestions</p>

      <Select
        value={status}
        onChange={handleStatusChange}
      >
        {statuses.map(({ type, label }) => (<MenuItem key={type} value={type}>{label}</MenuItem>))}
        
      </Select>
      <ul>
        {suggestions.map(suggestion => (
          <SuggestionLink
            key={suggestion._id}
            suggestion={suggestion}
            isCurrent={suggestion._id === currentSuggestionId}
            onCurrentChange={handleCurrentSuggestionChange}
          />
        ))}
      </ul>

      <Pagination
        page={page}
        allCount={allCount}
        changePage={changePage}
      />

      {currentSuggestion && <Suggestion suggestion={currentSuggestion} />}
    </>
    
  );
}

export default Suggestions;
