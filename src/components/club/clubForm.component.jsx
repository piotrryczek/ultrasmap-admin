import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SelectAutocomplete from 'react-select';
import { useDebouncedCallback } from 'use-debounce';

import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import { setMessage } from 'components/app/app.actions';
import { useLabelStyles } from 'theme/useStyles';
import { DEFAULT_COORDINATES, IMAGES_URL } from 'config/config';
import { parseCoordinates } from 'util/helpers';
import Api from 'services/api';

import ImageUploader from 'common/imageUploader/ImageUploader.component';

const GoogleMapLocation = withScriptjs(withGoogleMap((props) => {
  const {
    markerCoordination,
    setFieldValue,
  } = props;

  const handleDragEnd = useCallback((event) => {
    const { latLng: { lat, lng } } = event;

    setFieldValue('coordinates', [lat(), lng()]);
  }, []);

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={markerCoordination}
    >
      <Marker
        position={markerCoordination}
        draggable
        onDragEnd={handleDragEnd}
      />
    </GoogleMap>
  );
}));

function ClubForm({
  clubId,
  editType,
  initiallyLoaded,
  values: {
    name,
    logo,
    tier,
    coordinates,
    friendships,
    agreements,
    positives,
    satellites,
    satelliteOf,
  },
  errors,
  touched,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldValue,
  isSubmitting,
  isValid,
}) {
  const isError = (field) => errors[field] && touched[field];

  const [possibleClubRelations, updatePossibleClubRelations] = useState([]);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (isSubmitting && !isValid) {
      dispatch(setMessage('error', 'FORM_INCORRECT'))
    }
  }, [isSubmitting, isValid]);

  const getCurrentRelations = () => {
    const allRelations = [
      ...friendships,
      ...agreements,
      ...positives,
      ...satellites,
    ];

    if (satelliteOf) allRelations.push(satelliteOf);

    return allRelations.map(({ value }) => value);
  }

  const handleSelectChange = (type) => (value) => {
    const newValue = value || [];

    setFieldValue(type, newValue);
    updatePossibleClubRelations([]);

    return newValue;
  }

  const handleLogoChange = useCallback((file) => {
    setFieldValue('newLogo', file);
  }, []);

  const [searchDebounched] = useDebouncedCallback(async (value) => {
    if (!value.length) {
      updatePossibleClubRelations([]);
      return false;
    }

    const excluded = getCurrentRelations();

    if (editType === 'update') excluded.push(clubId);

    const { data: clubs } = await Api.get('/clubs/possibleRelations', {
      searchName: value,
      excluded: excluded,
    });

    const clubsOptions = clubs.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));

    updatePossibleClubRelations(clubsOptions);
  }, 500);

  const finalCoordination= parseCoordinates(coordinates || DEFAULT_COORDINATES);

  const labelClasses = useLabelStyles({}); 

  return (
    <form onSubmit={handleSubmit}>

      {(editType === 'new' || initiallyLoaded) && (
        <GoogleMapLocation
          markerCoordination={finalCoordination}
          setFieldValue={setFieldValue}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      )}

      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={isError('name')}
              helperText={isError('name') ? errors.name : ''}
              label="Name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="role" className={labelClasses.fontSize}>Tier</InputLabel>
            <Select
              error={isError('tier')}
              value={tier}
              onChange={handleChange}
              onBlur={handleBlur}
              name="tier"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Logo:</Typography></Box>

            {logo && (
              <img src={`${IMAGES_URL}${logo}`} alt="" />
            )}

            <ImageUploader
              fieldId="logo"
              onChange={handleLogoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Zgody:</Typography></Box>

            <SelectAutocomplete
              isMulti
              name="friendships"
              closeMenuOnSelect={false}
              options={possibleClubRelations}
              value={friendships}
              onChange={handleSelectChange('friendships')}
              onBlur={handleBlur}
              onInputChange={searchDebounched}
              placeholder="Start typing and choose clubs with which has friendships..."
            />
            {errors.relationsNotUnique && (
              <p>Relacje musza byc unikalne</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Układy:</Typography></Box>

            <SelectAutocomplete
              isMulti
              name="agreements"
              closeMenuOnSelect={false}
              options={possibleClubRelations}
              value={agreements}
              onChange={handleSelectChange('agreements')}
              onBlur={handleBlur}
              onInputChange={searchDebounched}
              placeholder="Start typing and choose clubs with which has agreements..."
            />
            {errors.relationsNotUnique && (
              <p>Relacje musza byc unikalne</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Pozytywne relacje / prywatne kontakty:</Typography></Box>

            <SelectAutocomplete
              isMulti
              name="positives"
              closeMenuOnSelect={false}
              options={possibleClubRelations}
              value={positives}
              onChange={handleSelectChange('positives')}
              onBlur={handleBlur}
              onInputChange={searchDebounched}
              placeholder="Start typing and choose clubs with which has positive relations..."
            />
            {errors.relationsNotUnique && (
              <p>Relacje musza byc unikalne</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Satelity / Fan Cluby:</Typography></Box>

            <SelectAutocomplete
              isMulti
              name="satellites"
              closeMenuOnSelect={false}
              options={possibleClubRelations}
              value={satellites}
              onChange={handleSelectChange('satellites')}
              onBlur={handleBlur}
              onInputChange={searchDebounched}
              placeholder="Start typing and choose satellites..."
            />
            {errors.relationsNotUnique && (
              <p>Relacje musza byc unikalne</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}><Typography variant="subtitle1">Satelita klubu:</Typography></Box>

            <SelectAutocomplete
              isClearable
              name="satelliteOf"
              options={possibleClubRelations}
              value={satelliteOf}
              onChange={handleSelectChange('satelliteOf')}
              onBlur={handleBlur}
              onInputChange={searchDebounched}
              placeholder="Start typing and choose which satellite of club is..."
            />

            {errors.relationsNotUnique && (
              <p>Relacje musza byc unikalne</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default ClubForm;