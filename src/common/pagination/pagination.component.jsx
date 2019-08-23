import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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
    <Grid item container justify="center">
      <ButtonGroup
        variant="contained"
        size="small"
      >
        {pagesArray.map(page => (
          <Button
            key={page + 1}
            variant="contained"
            color={currentPage === page + 1 ? 'primary' : 'default'}
            type="button"
            onClick={() => changePage(page + 1)}
          >
            {page + 1}
          </Button>
        ))}
      </ButtonGroup>
    </Grid>
  );
}

const PaginationMemoized = memo(({ page, allCount, changePage }) => (
  <Pagination page={page} allCount={allCount} changePage={changePage} />
));
PaginationMemoized.displayName = 'PaginationMemozied';

export default PaginationMemoized;
