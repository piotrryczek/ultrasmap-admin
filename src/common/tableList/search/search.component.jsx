import React, { useState, useEffect } from 'react'
import update from 'immutability-helper';
import { useDebouncedCallback } from 'use-debounce';

function Search(props) {
  const [search, setSearch] = useState({});

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
