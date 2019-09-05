import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SelectAutocomplete from 'react-select/async';
import _isEmpty from 'lodash/isEmpty';

import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

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

import AddressSearch from 'common/addressSearch/addressSearch.component';
import ImageUploader from 'common/imageUploader/ImageUploader.component';

const GoogleMapLocation = withGoogleMap((props) => {
  const {
    markerCoordination,
    setFieldValue,
  } = props;

  const handleDragEnd = useCallback((event) => {
    const { latLng: { lat, lng } } = event;

    setFieldValue('coordinates', [lng(), lat()]);
  }, []);

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={markerCoordination}
      center={markerCoordination}
    >
      <Marker
        position={markerCoordination}
        draggable
        onDragEnd={handleDragEnd}
      />
    </GoogleMap>
  );
});

const getOptionValue = ({ _id }) => _id;
const getOptionLabel = ({ name }) => name;

function ClubForm({
  clubId,
  editType,
  initiallyLoaded,
  values: {
    name,
    transliterationName,
    searchName,
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
  setFieldTouched,
}) {
  const isError = (field) => errors[field] && touched[field];

  const dispatch = useDispatch(); 
  const { t } = useTranslation();
  const [otherFoundClubs, setOtherFoundClubs] = useState([]);

  useEffect(() => {
    if (isSubmitting && !_isEmpty(errors)) { // isValid is false when form is same as before
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

    if (satelliteOf && !Array.isArray(satelliteOf)) allRelations.push(satelliteOf);

    return allRelations.reduce((acc, { __isNew__: isNew, _id: clubId }) => {
      if (!isNew) {
        acc.push(clubId);
      }

      return acc;
    }, []);
  }

  const handleSelectChange = (type) => (value) => {
    const newValue = value || [];

    setFieldValue(type, newValue);

    return newValue;
  }

  const handleLogoChange = useCallback((file) => {
    setFieldValue('newLogo', file);
  }, []);

  const handleCoordinatesChange = useCallback((coordinates) => {
    setFieldValue('coordinates', coordinates);
  }, []);

  const handleGetPossibleRelations = value => new Promise(async (resolve, reject) => {
    const excluded = getCurrentRelations();
    if (editType === 'edit') excluded.push(clubId);

    const { data: clubs } = await Api.get('/clubs/possibleRelations', {
      searchName: value,
      excluded: excluded,
    });

    resolve(clubs);
  });

  const handleFieldNameBlur = useCallback(async (event) => {
    setFieldTouched('name', true);

    const { value: name } = event.target;

    const body = { search: { name: { value: name, type: 'text' } } };

    if (clubId) Object.assign(body, { excluded: [clubId] });

    const { data: clubs } = await Api.get('/clubs', body);

    setOtherFoundClubs(clubs);
  }, []);

  const finalCoordination= parseCoordinates(coordinates || DEFAULT_COORDINATES);

  const labelClasses = useLabelStyles({});

  return (
    <form onSubmit={handleSubmit}>

      {(editType === 'new' || initiallyLoaded) && (
        <div className="location-wrapper">
          <GoogleMapLocation
            markerCoordination={finalCoordination}
            setFieldValue={setFieldValue}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

          <AddressSearch onChange={handleCoordinatesChange} />
        </div>
      )}

      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={isError('name')}
              helperText={isError('name') ? t(errors.name) : ''}
              label={t('club.name')}
              value={name}
              onChange={handleChange}
              onBlur={handleFieldNameBlur}
              name="name"
              fullWidth
            />
            {otherFoundClubs.length > 0 && (
              <Typography>
                {t('club.otherFoundByName')}
                <strong>{otherFoundClubs.map(club => club.name).join(', ')}</strong>
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={isError('transliterationName')}
              helperText={isError('transliterationName') ? t(errors.transliterationName) : ''}
              label={t('club.transliterationName')}
              value={transliterationName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="transliterationName"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={isError('searchName')}
              helperText={isError('searchName') ? t(errors.searchName) : ''}
              label={t('club.searchName')}
              value={searchName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="searchName"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="role" className={labelClasses.fontSize}>{t('club.tier')}</InputLabel>
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
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.logo')}
                :
              </Typography>
            </Box>

            {logo && (
              <img src={`${IMAGES_URL}/h180/${logo}`} alt="" />
            )}

            <ImageUploader
              fieldId="logo"
              onChange={handleLogoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.friendships')}
                :
              </Typography>
            </Box>

            <SelectAutocomplete
              isMulti
              name="friendships"
              closeMenuOnSelect={false}
              loadOptions={handleGetPossibleRelations}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              value={friendships}
              onChange={handleSelectChange('friendships')}
              onBlur={handleBlur}
              placeholder={t('club.friendshipsPlaceholder')}
            />
            {errors.relationsNotUnique && (
              <p>{t(errors.relationsNotUnique)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.agreements')}
                :
              </Typography>
            </Box>

            <SelectAutocomplete
              isMulti
              name="agreements"
              closeMenuOnSelect={false}
              loadOptions={handleGetPossibleRelations}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              value={agreements}
              onChange={handleSelectChange('agreements')}
              onBlur={handleBlur}
              placeholder={t('club.agreementsPlaceholder')}
            />
            {errors.relationsNotUnique && (
              <p>{t(errors.relationsNotUnique)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.positives')}
                :
              </Typography>
            </Box>

            <SelectAutocomplete
              isMulti
              name="positives"
              closeMenuOnSelect={false}
              loadOptions={handleGetPossibleRelations}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              value={positives}
              onChange={handleSelectChange('positives')}
              onBlur={handleBlur}
              placeholder={t('club.positivesPlaceholder')}
            />
            {errors.relationsNotUnique && (
              <p>{t(errors.relationsNotUnique)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.satellites')}
                :
              </Typography>
            </Box>

            <SelectAutocomplete
              isMulti
              name="satellites"
              closeMenuOnSelect={false}
              loadOptions={handleGetPossibleRelations}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              value={satellites}
              onChange={handleSelectChange('satellites')}
              onBlur={handleBlur}
              placeholder={t('club.satellitesPlaceholder')}
            />
            {errors.relationsNotUnique && (
              <p>{t(errors.relationsNotUnique)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box pb={1}>
              <Typography variant="subtitle1">
                {t('club.satelliteOf')}
                :
              </Typography>
            </Box>

            <SelectAutocomplete
              isClearable
              name="satelliteOf"
              loadOptions={handleGetPossibleRelations}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              value={satelliteOf}
              onChange={handleSelectChange('satelliteOf')}
              onBlur={handleBlur}
              placeholder={t('club.satelliteOfPlaceholder')}
            />
            {errors.relationsNotUnique && (
              <p>{t(errors.relationsNotUnique)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              {t('global.save')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default ClubForm;