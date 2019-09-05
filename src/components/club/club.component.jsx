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
import { setMessage, setIsLoading } from 'components/app/app.actions';
import ClubForm from './clubForm.component';

const parseClubData = ({
  name,
  transliterationName = '',
  searchName = '',
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
  transliterationName,
  searchName,
  name,
  logo,
  tier,
  coordinates: location.coordinates,
  friendships,
  agreements,
  positives,
  satellites,
  satelliteOf,
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
    transliterationName: '',
    searchName: '',
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
    dispatch(setIsLoading(true));
    const { data: clubData } = await Api.get(`/clubs/${clubId}`);
    setFields(parseClubData(clubData));
    setInitiallyLoaded(true);
    dispatch(setIsLoading(false));
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
      transliterationName,
      searchName,
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
      transliterationName,
      searchName,
      logo,
      newLogo,
      tier,
      coordinates,
      friendships: friendships.map(club => club._id),
      agreements: agreements.map(club => club._id),
      positives: positives.map(club => club._id),
      satellites: satellites.map(club => club._id),
      satelliteOf: satelliteOf ? satelliteOf._id : null,
    });

    dispatch(setIsLoading(true));

    if (editType === 'new') {
      const { data: clubId } = await Api.post(`/clubs`, formData);

      dispatch(setMessage('success', 'CLUB_ADDED_SUCCESS'));
      history.push(`/clubs/${clubId}`);
    } else {
      await Api.put(`/clubs/${clubId}`, formData);

      dispatch(setMessage('success', 'CLUB_UPDATED_SUCCESS'));
    }

    dispatch(setIsLoading(false));
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
