import React, { useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next';
import update from 'immutability-helper';
import { useDebouncedCallback } from 'use-debounce';
import _upperFirst from 'lodash/upperFirst';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

function Search(props) {
  const [search, setSearch] = useState({});
  const { t } = useTranslation();

  const { searchColumns, onSearch } = props;

  const updateField = (fieldName) => (event) => {
    const { value } = event.target;

    setSearch(update(search, {
      [fieldName]: { $set: value },
    }));
  };

  const [updateParent] = useDebouncedCallback(() => {
    onSearch(search);
  }, 500);

  useEffect(() => {
    updateParent();
  }, [search, updateParent]);

  return (
    <Grid item container spacing={2}>
      {searchColumns.map(columnName => (
        <Grid item xs={12 / searchColumns.length} key={columnName}>
          <Paper>
            <Box display="flex">
              <IconButton>
                <SearchIcon />
              </IconButton>
              <InputBase
                // className={classes.input}
                placeholder={`${_upperFirst(t(`columns.${columnName}`))}...`}
                value={search[columnName]}
                onChange={updateField(columnName)}
                fullWidth
              />
            </Box>
            
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

const SearchMemoized = memo(({ searchColumns, onSearch }) => (
  <Search searchColumns={searchColumns} onSearch={onSearch} />
));
SearchMemoized.displayName = 'Search';

export default SearchMemoized;
