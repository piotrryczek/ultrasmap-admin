import React, { useState, useEffect } from 'react'
import update from 'immutability-helper';
import { useDebouncedCallback } from 'use-debounce';

function Search(props) {
  console.log('Search: Render');

  const [search, setSearch] = useState({});

  const { searchColumns, onSearch } = props;

  const updateField = (fieldName) => (event) => {
    const { value } = event.target;

    setSearch(update(search, {
      [fieldName]: { $set: value },
    }));
  };

  useEffect(() => {
    updateParent();
  }, [search])


  const [updateParent] = useDebouncedCallback(() => {
    onSearch(search);
  }, 500);

  return (
    <div id="search-columns">
      {searchColumns.map(columnName => (
        <div key={columnName}>
          <p>{columnName}</p>
          <input
            type="text"
            value={search[columnName]}
            onChange={updateField(columnName)}
          />
        </div>
      ))}
    </div>
  )
}

export default Search;
