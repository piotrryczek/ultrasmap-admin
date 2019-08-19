import React, { useCallback } from 'react';

import { formatDate } from 'util/helpers';

function SuggestionLink(props) {
  const {
    isCurrent,
    onCurrentChange,
    suggestion: {
      _id: id,
      type,
      createdAt,
      original,
      data,
    }
  } = props;

  const name = type === 'new' ? data.name : original.name;

  const handleChange = useCallback(() => {
    onCurrentChange(id);
  }, []);

  return (
    <li>
      <span onClick={handleChange}>
        Suggestion for:
        {name}
        {isCurrent ? '(*)' : ''}
        | {type === 'new' ? 'Nowy' : 'Edycja'} |
        :
        {formatDate(createdAt)}
      </span>
    </li>
  );
}

export default SuggestionLink;
