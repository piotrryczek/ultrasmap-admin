import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import _uniq from 'lodash/uniq';
import { Formik } from 'formik';

import Paper from '@material-ui/core/Paper';

import { DEFAULT_COORDINATES } from 'config/config';
import { prepareClubFormData } from 'util/helpers';
import history from 'config/history';
import clubSchema from 'schemas/club';
import Api from 'services/api';
import { setMessage } from 'components/app/app.actions';
import ClubForm from './clubForm.component';

const parseClubsToOptions = clubs  => clubs.map(({ name: clubName, _id }) => ({ label: clubName, value: _id }));
const parseOptionsToIds = options => options.map(({ value }) => value);

const parseClubToOption = (club) => {
  if (!club) return null;

  const { name, _id } = club;

  return {
    label: name,
    value: _id,
  }
}

const parseClubData = ({
  name,
  logo,
  tier,
  location,
  friendships,
  agreements,
  positives,
  satellites,
  satelliteOf,
}) => ({
  newLogo: null,
  name,
  logo,
  tier,
  coordinates: location.coordinates,
  friendships: parseClubsToOptions(friendships),
  agreements: parseClubsToOptions(agreements),
  positives: parseClubsToOptions(positives),
  satellites: parseClubsToOptions(satellites),
  satelliteOf: parseClubToOption(satelliteOf),
});

function Club(props) {
  const {
    editType,
    match: {
      params: {
        id: clubId,
      },
    },
  } = props;

  const dispatch = useDispatch();

  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  const [fields, setFields] = useState({
    newLogo: null,
    name: '',
    logo: '',
    tier: 1,
    coordinates: DEFAULT_COORDINATES,
    friendships: [],
    agreements: [],
    positives: [],
    satellites: [],
    satelliteOf: null,
  });

  const fetchData = async () => {
    const { data: clubData } = await Api.get(`/clubs/${clubId}`);

    setFields(parseClubData(clubData));
    setInitiallyLoaded(true);
  }

  useEffect(() => {
    if (editType === 'update') {
      fetchData();
    }
  }, []);

  const handleSubmit = useCallback(async (values) => {
    const {
      newLogo, // file
      name,
      logo, // url
      tier,
      coordinates,
      friendships,
      agreements,
      positives,
      satellites,
      satelliteOf,
    } = values;

    const formData = prepareClubFormData({
      name,
      logo,
      newLogo,
      tier,
      coordinates,
      friendships: parseOptionsToIds(friendships),
      agreements: parseOptionsToIds(agreements),
      positives: parseOptionsToIds(positives),
      satellites: parseOptionsToIds(satellites),
      satelliteOf: satelliteOf ? satelliteOf.value : null,
    });

    if (editType === 'new') {
      const { data: clubId } = await Api.post(`/clubs`, formData);

      dispatch(setMessage('success', 'CLUB_ADDED_SUCCESS'));
      history.push(`/clubs/${clubId}`);
    } else {
      await Api.put(`/clubs/${clubId}`, formData);

      dispatch(setMessage('success', 'CLUB_UPDATED_SUCCESS'));
    }
  }, []);

  const handleValidate = useCallback(async (values) => {
    const errors = {};

    const {
      friendships,
      agreements,
      positives,
      satellites,
      satelliteOf,
    } = values;

    const allRelations = [...friendships, ...agreements, ...positives, ...satellites, satelliteOf];
    const uniqueAllRelations = _uniq(allRelations);

    if (allRelations.length > 0 && allRelations.length !== uniqueAllRelations.length) {
      Object.assign(errors, {
        relationsNotUnique: 'formErrors.relationsNotUnique',
      });
    }   

    try {
      await clubSchema.validate(values, {
        abortEarly: false,
      });
    } catch (error) {
      
      const { inner: schemaErrors } = error;

      const parsedErrors = schemaErrors.reduce((acc, { path, message }) => {
        Object.assign(acc, {
          [path]: message,
        });

        return acc;
      }, {});

      Object.assign(errors, parsedErrors);

      throw errors;
    }

    throw errors;
  }, []);

  return (
    <Paper>
      <Formik
        initialValues={fields}
        enableReinitialize
        onSubmit={handleSubmit}
        validate={handleValidate}
        render={(props) => (
          <ClubForm
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            clubId={clubId}
            editType={editType}
            initiallyLoaded={initiallyLoaded}
          />
        )}
      />
    </Paper>
  );
}

export default Club;
