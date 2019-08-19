import React, { memo } from 'react';

import { PER_PAGE } from 'config/config';

function Pagination(props) {
  const {
    page: currentPage,
    allCount,
    changePage,
  } = props;

  const nrPages = Math.ceil(allCount / PER_PAGE);
  const pagesArray = Array.from(Array(nrPages).keys());

  return (
    <ul className="pagination">
      {pagesArray.map(page => (
        <li key={page + 1}>
          <button
            type="button"
            onClick={() => changePage(page + 1)}
          >
            {page + 1}
            {currentPage === page + 1 && '(*)'}
          </button>
        </li>
      ))}
    </ul>
  );
}

const PaginationMemoized = memo(({ page, allCount, changePage }) => (
  <Pagination page={page} allCount={allCount} changePage={changePage} />
));
PaginationMemoized.displayName = 'PaginationMemozied';

export default PaginationMemoized;
