import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Api from 'services/api';
import { setIsLoading } from 'components/app/app.actions';
import ClubByPower from './clubByPower.component';

function ClubsByPower() {
  const [clubs, setClubs] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch(); 
  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    dispatch(setIsLoading(true));

    const {
      data: clubs,
    } = await Api.get('/clubs/byTier');

    setClubs(clubs);
    dispatch(setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const getValues = (clubId, value) => (prevValues) => {
    const originalValue = clubs.find(({ _id: originalClubId }) => clubId === originalClubId).tier;

    if (originalValue.toString() === value.toString()) {
      const {
        [clubId]: clubIdToRemove,
        ...rest
      } = prevValues;

      return rest;
    } else {
      return {
        ...prevValues,
        [clubId]: value,
      }
    }
  }

  const [handleChangeWithFix] = useDebouncedCallback(
    (clubId, newValue) => {
      setValues(getValues(clubId, newValue));
    },
    500
  );

  const handleChange = useCallback((clubId, value) => {
    const floatValue = parseFloat(value);

    if (isNaN(floatValue) || floatValue < 0 || floatValue > 5.49999) {
      setErrors(prevErrors => ([
        ...prevErrors,
        clubId,
      ]));
    } else {
      setErrors(prevErrors => ([
        ...prevErrors.filter(errorClubId => errorClubId !== clubId)
      ]));
    }

    setValues(getValues(clubId, value));

    if (value != floatValue && !isNaN(floatValue)) handleChangeWithFix(clubId, floatValue);
  }, [clubs]);

  const handleSubmit = useCallback(async () => {
    dispatch(setIsLoading(true));

    await Api.patch('/clubs/updateTiers', values);

    setValues({});

    fetchData();
  }, [values]);

  const valuesArr = Object.values(values);

  return (
    <Paper>
      <Box p={3}>
        {clubs.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {errors.length > 0 && (
                <Typography>{t('clubsByPower.cannotSave')}</Typography>
              )}

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                disabled={(valuesArr.length === 0 || errors.length > 0)}
              >
                {t('clubsByPower.saveFor', { nrItems: valuesArr.length })}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <table className="clubs-by-power">
                <tbody>
                  {clubs.map(({ _id: clubId, tier, name, transliterationName }) => {
                    return (
                      <ClubByPower
                        key={clubId}
                        clubId={clubId}
                        tier={tier}
                        name={name}
                        transliterationName={transliterationName}
                        tierValue={values[clubId]}
                        isError={errors.includes(clubId)}
                        handleChange={handleChange}
                      />
                    );
                  })}
                </tbody>
              </table>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
}

export default ClubsByPower;
