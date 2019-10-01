import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { MATCH_DURATION_MINUTES } from 'config/config';

// TODO: Translate
const DATE_CHOICES = [{
  value: 'all',
  label: 'Wszystkie'
}, {
  value: 'beforeStart',
  label: 'Przed rozpoczęciem'
}, {
  value: 'afterStart',
  label: 'Po rozpoczęciu'
}, {
  value: 'beforeEnd',
  label: 'Przed zakończeniem'
}, {
  value: 'afterEnd',
  label: 'Po zakończeniu'
}];

const IS_VISIBLE_CHOICES = [{
  value: 'all',
  label: 'Wszystkie'
}, {
  value: 'visible',
  label: 'Widoczne'
}, {
  value: 'invisible',
  label: 'Niewidoczne'
}];

const LACK_OF_CHOICES = [{
  value: 'none',
  label: 'Pomiń'
}, {
  value: 'location',
  label: 'Lokalizacja'
}, {
  value: 'attitude',
  label: 'Nastawienie'
}];

function MatchesFilters(props) {
  const { onFilter } = props;

  const { t } = useTranslation();
  const [state, setState] = useState({
    date: 'beforeStart',
    isVisible: 'visible',
    lackOf: 'none',
  });

  const {
    date,
    isVisible,
    lackOf,
  } = state;

  const handleSelectChange = useCallback((event) => {
    const { target: { name, value } } = event;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilter = useCallback(() => {
    const filters = {};

    if (date && date !== 'all') {

      if (date === 'beforeStart' || date === 'afterStart') {
        const dateToCompareUnix = new Date().getTime();

        if (date === 'beforeStart') {
          Object.assign(filters, {
            date: {
              type: 'before',
              time: dateToCompareUnix,
            },
          });
        } else {
          Object.assign(filters, {
            date: {
              type: 'after',
              time: dateToCompareUnix,
            },
          });
        }
      } else if (date === 'beforeEnd' || date === 'afterEnd') {
        // MATCH_DURATION_MINUTES
        const dateToCompareUnix = moment(new Date()).subtract(MATCH_DURATION_MINUTES, 'minutes').toDate().getTime();

        if (date === 'beforeEnd') {
          Object.assign(filters, {
            date: {
              type: 'before',
              time: dateToCompareUnix,
            },
          });
        } else {
          Object.assign(filters, {
            date: {
              type: 'after',
              time: dateToCompareUnix,
            },
          });
        }
      }
    }

    if (isVisible && isVisible !== 'all') {
      Object.assign(filters, {
        isVisible: isVisible === 'visible',
      });
    }

    if (lackOf && lackOf !== 'none') {

      Object.assign(filters, {
        lackOf,
      });
    }

    onFilter(filters);
  }, [onFilter, date, isVisible, lackOf]);

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography gutterBottom>{t('matchFilters.date')}</Typography>
              <Select
                value={date}
                onChange={handleSelectChange}
                placeholder={t('matchFilters.date')}
                name="date"
                inputProps={{
                  id: 'date',
                }}
                fullWidth
              >
                {DATE_CHOICES.map(choice => (
                  <MenuItem
                    key={choice.value}
                    value={choice.value}
                    selected={choice.value === date}
                  >
                    {choice.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>{t('matchFilters.isVisible')}</Typography>
              <Select
                value={isVisible}
                onChange={handleSelectChange}
                placeholder={t('matchFilters.isVisible')}
                name="isVisible"
                inputProps={{
                  id: 'isVisible',
                }}
                fullWidth
              >
                {IS_VISIBLE_CHOICES.map(choice => (
                  <MenuItem
                    key={choice.value}
                    value={choice.value}
                    selected={choice.value === isVisible}
                  >
                    {choice.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>{t('matchFilters.lackOf')}</Typography>
              <Select
                value={lackOf}
                onChange={handleSelectChange}
                placeholder={t('matchFilters.lackOf')}
                name="lackOf"
                inputProps={{
                  id: 'lackOf',
                }}
                fullWidth
              >
                {LACK_OF_CHOICES.map(choice => (
                  <MenuItem
                    key={choice.value}
                    value={choice.value}
                    selected={choice.value === lackOf}
                  >
                    {choice.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleFilter}
              >
                {t('global.filter')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default MatchesFilters;
