import React from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import { IMAGES_URL } from 'config/config';
import { parseCoordinates } from 'util/helpers';
import GoogleMapsStaticLocation from 'common/googleMapStaticLocation/googleMapStaticLocation.component';

import AfterRelations from './util/afterRelations.component';
import Field from './util/field.component';
import FieldWrapper from './util/fieldWrapper.component';
import RelationClub from './util/relationClub.component';

function ClubComparission(props) {
  const {
    comparision: {
      isNewName,
      isNewTier,
      isNewLogo,
      isNewLocation,
      toAddFriendships,
      toRemoveFriendships,
      toAddAgreements,
      toRemoveAgreements,
      toAddPositives,
      toRemovePositives,
      toAddSatellites,
      toRemoveSatellites,
      toAddSatelliteOf,
      toRemoveSatelliteOf,
    },
    data,
    comparision,
    data: {
      name,
      logo,
      tier,
      location: {
        coordinates,
      },
      friendships,
      friendshipsToCreate,
      agreements,
      agreementsToCreate,
      positives,
      positivesToCreate,
      satellites,
      satellitesToCreate,
      satelliteOf,
      satelliteOfToCreate,
    }
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <Field label="Title:" value={name} className={classNames({ 'to-change': isNewName })} />
          <Divider />
          <Field label="Tier:" value={tier} className={classNames({ 'to-change': isNewTier })} />
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Logo:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {logo && (
                <img src={`${IMAGES_URL}${logo}`} alt="" className={classNames({ 'to-change': isNewLogo })} />
              )}
            </Grid>
          </FieldWrapper>
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Zgody:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <AfterRelations
                current={friendships}
                toRemove={toRemoveFriendships}
                toAdd={toAddFriendships}
                toCreate={friendshipsToCreate}
              />
            </Grid>
          </FieldWrapper>
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Układy:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <AfterRelations
                current={agreements}
                toRemove={toRemoveAgreements}
                toAdd={toAddAgreements}
                toCreate={agreementsToCreate}
              />
            </Grid>
          </FieldWrapper>
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Pozytywne relacje:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <AfterRelations
                current={positives}
                toRemove={toRemovePositives}
                toAdd={toAddPositives}
                toCreate={positivesToCreate}
              />
            </Grid>
          </FieldWrapper>
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Satelity:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <AfterRelations
                current={satellites}
                toRemove={toRemoveSatellites}
                toAdd={toAddSatellites}
                toCreate={satellitesToCreate}
              />
            </Grid>
          </FieldWrapper>
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Satelita innej drużyny:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {toRemoveSatelliteOf && <RelationClub type="remove">{toRemoveSatelliteOf.name}</RelationClub>}
              {satelliteOfToCreate && <RelationClub type="create">{satelliteOfToCreate}</RelationClub>}
              {satelliteOf && <RelationClub type={toAddSatelliteOf ? 'add' : 'no-change'}>{satelliteOf.name}</RelationClub>}
            </Grid>
          </FieldWrapper>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box
          className={classNames({
            'to-change': isNewLocation,
          })}
        >
          <GoogleMapsStaticLocation
            markerCoordination={parseCoordinates(coordinates)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ClubComparission;
