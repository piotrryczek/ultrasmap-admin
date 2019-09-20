import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
        <ButtonLink
          variant="contained"
          color={currentPage === 1 ? 'primary' : 'default'}
          type="button"
          to={`${basePath}/page/1`}
        >
          1
        </ButtonLink>

        {currentPage > 3 && (
          <Button
            disabled
            variant="contained"
            color="default"
            type="button"
          >
            ...
          </Button>
        )}

        {pagesArray.map(page => {
          if (
            page !== 0 &&
            page !== pagesArray.length - 1 &&
            (page > currentPage - 4 && page < currentPage + 2)
          ) {
            return (
              <ButtonLink
                key={page + 1}
                variant="contained"
                color={currentPage === page + 1 ? 'primary' : 'default'}
                type="button"
                to={`${basePath}/page/${page + 1}`}
              >
                {page + 1}
              </ButtonLink>
            );
          }

          return (null);
        })}

        {currentPage < pagesArray.length - 3 && (
          <Button
            disabled
            variant="contained"
            color="default"
            type="button"
          >
            ...
          </Button>
        )}

        {pagesArray.length > 1 && (
          <ButtonLink
            variant="contained"
            color={currentPage === pagesArray.length ? 'primary' : 'default'}
            type="button"
            to={`${basePath}/page/${pagesArray.length}`}
          >
            {pagesArray.length}
          </ButtonLink>
        )}
        
      </ButtonGroup>
    </Grid>
  );
}

export default memo(Pagination);
