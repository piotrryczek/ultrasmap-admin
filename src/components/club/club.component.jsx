import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';

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

// TODO: Validation
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
    coordinates: null,
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
      coordinates, // TODO: To change
      friendships,
      agreements,
      positives,
      satellites,
      satelliteOf,
    } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);
    formData.append('tier', tier);
    formData.append('location', JSON.stringify(coordinates));
    formData.append('friendships', JSON.stringify(parseOptionsToIds(friendships)));
    formData.append('agreements', JSON.stringify(parseOptionsToIds(agreements)));
    formData.append('positives', JSON.stringify(parseOptionsToIds(positives)));
    formData.append('satellites', JSON.stringify(parseOptionsToIds(satellites)));

    if (satelliteOf) formData.append('satelliteOf', satelliteOf.value);
    if (newLogo) formData.append('newLogo', newLogo);

    if (editType === 'new') {
      const { data: clubId } = await Api.post(`/clubs`, formData);

      dispatch(setMessage('success', 'CLUB_ADDED_SUCCESS'));
      history.push(`/clubs/${clubId}`);
    } else {
      await Api.put(`/clubs/${clubId}`, formData);

      dispatch(setMessage('success', 'CLUB_UPDATED_SUCCESS'));
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={fields}
        enableReinitialize
        onSubmit={handleSubmit}
        // validationSchema={clubSchema}
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
    </>
  );
}

export default Club;
