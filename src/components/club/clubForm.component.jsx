import React, { useCallback, useState } from 'react';
import SelectAutocomplete from 'react-select';
import { useDebouncedCallback } from 'use-debounce';

import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { DEFAULT_COORDINATES, GOOGLE_MAP_API_KEY } from 'config/config';
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
  setFieldTouched,
}) {
  const isError = (field) => errors[field] && touched[field];

  const [possibleClubRelations, updatePossibleClubRelations] = useState([]);

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

  return (
    <form onSubmit={handleSubmit}>

      {(editType === 'new' || initiallyLoaded) && (
        <GoogleMapLocation
          markerCoordination={finalCoordination}
          setFieldValue={setFieldValue}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      )}

      <Button variant="contained" color="primary" type="submit">Save</Button>

      <ul className="fields">
        <li className="field">
          <TextField
            error={isError('name')}
            helperText={isError('name') ? errors.name : ''}
            label="Name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
        </li>
      </ul>

      <Select
        error={isError('tier')}
        value={tier}
        onChange={handleChange}
        onBlur={handleBlur}
        name="tier"
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>

      <Typography variant="h6">Logo</Typography>

      {logo && (
        <img src={`${process.env.REACT_APP_API_URL}/images/${logo}`} alt="" />
      )}

      <ImageUploader
        fieldId="logo"
        onChange={handleLogoChange}
      />

      <Typography variant="h6">Zgody</Typography>

      <SelectAutocomplete
        isMulti
        options={possibleClubRelations}
        value={friendships}
        onChange={handleSelectChange('friendships')}
        onInputChange={searchDebounched}
      />

      <Typography variant="h6">Układy</Typography>
      <SelectAutocomplete
        isMulti
        options={possibleClubRelations}
        value={agreements}
        onChange={handleSelectChange('agreements')}
        onInputChange={searchDebounched}
      />

      <Typography variant="h6">Pozytywne relacje / prywatne kontakty:</Typography>
      <SelectAutocomplete
        isMulti
        options={possibleClubRelations}
        value={positives}
        onChange={handleSelectChange('positives')}
        onInputChange={searchDebounched}
      />

      <Typography variant="h6">Satelity / Fan Cluby</Typography>
      <SelectAutocomplete
        isMulti
        options={possibleClubRelations}
        value={satellites}
        onChange={handleSelectChange('satellites')}
        onInputChange={searchDebounched}
      />

      <Typography variant="h6">Jest satelitą / Fan Clubem</Typography>
      <SelectAutocomplete
        options={possibleClubRelations}
        value={satelliteOf}
        onChange={handleSelectChange('satelliteOf')}
        onInputChange={searchDebounched}
      />
    </form>
  );
}

export default ClubForm;