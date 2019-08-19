import React, { useEffect, useCallback, useState, memo } from 'react';

import { compareSuggestionBeforeAfter } from 'util/helpers';

import ClubBefore from './clubBefore.component';
import ClubAfter from './clubAfter.component';

function Suggestion(props) {
  const {
    suggestion,
  } = props;
  
  const {
    type,
    data,
    original,
  } = suggestion;

  const comparision = type === 'edit' ? compareSuggestionBeforeAfter(original, data) : {};

  return (
    <>
      {original && <ClubBefore data={original} />}
      <ClubAfter data={data} comparision={comparision} />
    </>
  );
}

const SuggestionMemoized = memo(({ suggestion }) => <Suggestion suggestion={suggestion} />);
SuggestionMemoized.displayName = 'SuggestionMemozied';

export default SuggestionMemoized;
