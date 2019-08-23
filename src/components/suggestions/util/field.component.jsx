import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FieldWrapper from './fieldWrapper.component';

function FieldLabel(props) {
  const {
    label,
    value,
    className
  } = props;

  return (
    <FieldWrapper>
      <Grid item xs={2}>
        <Typography color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography className={className}>
          {value}
        </Typography>
      </Grid>
    </FieldWrapper>
  )
}

export default FieldLabel;
