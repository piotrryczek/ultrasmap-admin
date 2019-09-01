import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ButtonLink from 'common/buttonLink/buttonLink.component';
import { PER_PAGE } from 'config/config';

function Pagination(props) {
  const {
    page: currentPage,
    allCount,
    basePath,
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
          <ButtonLink
            key={page + 1}
            variant="contained"
            color={currentPage === page + 1 ? 'primary' : 'default'}
            type="button"
            to={`${basePath}/page/${page + 1}`}
            // onClick={() => changePage(page + 1)}
          >
            {page + 1}
          </ButtonLink>
        ))}
      </ButtonGroup>
    </Grid>
  );
}

export default memo(Pagination);
