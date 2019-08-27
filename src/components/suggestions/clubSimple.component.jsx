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

import Field from './util/field.component';
import FieldWrapper from './util/fieldWrapper.component';
import RelationClub from './util/relationClub.component';

function ClubSimple(props) {
  const {
    type,
    comment,
    data: {
      name,
      logo,
      tier,
      location: { coordinates },
      friendshipsToCreate = [],
      friendships,
      agreementsToCreate = [],
      agreements,
      positivesToCreate = [],
      positives,
      satellites,
      satellitesToCreate = [],
      satelliteOf,
      satelliteOfToCreate = null,
    }
  } = props;

  const relationChangeType = type === 'new' ? 'add' : 'no-change';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <Field label="Title:" value={name} className={classNames({ 'to-add': type === 'new'})} />
          <Divider />
          <Field label="Tier:" value={tier} className={classNames({ 'to-add': type === 'new'})} />
          <Divider />
          <FieldWrapper>
            <Grid item xs={2}>
              <Typography color="textSecondary">
                Logo:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {logo && (
                <img src={`${IMAGES_URL}/h180/${logo}`} alt="" className={classNames({ 'to-add': type === 'new'})} />
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
              {friendships.map(club => <RelationClub key={club._id} type={relationChangeType}>{club.name}</RelationClub>)}
              {friendshipsToCreate.map(clubName => <RelationClub key={clubName} type="create">{clubName}</RelationClub>)}
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
              {agreements.map(club => <RelationClub key={club._id} type={relationChangeType}>{club.name}</RelationClub>)}
              {agreementsToCreate.map(clubName => <RelationClub key={clubName} type="create">{clubName}</RelationClub>)}
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
              {positives.map(club => <RelationClub key={club._id} type={relationChangeType}>{club.name}</RelationClub>)}
              {positivesToCreate.map(clubName => <RelationClub key={clubName} type="create">{clubName}</RelationClub>)}
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
              {satellites.map(club => <RelationClub key={club._id} type={relationChangeType}>{club.name}</RelationClub>)}
              {satellitesToCreate.map(clubName => <RelationClub key={clubName} type="create">{clubName}</RelationClub>)}
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
              {satelliteOfToCreate && <RelationClub type="create">{satelliteOfToCreate}</RelationClub>}
              {satelliteOf && <RelationClub type={relationChangeType}>{satelliteOf.name}</RelationClub>}
            </Grid>
          </FieldWrapper>
          {comment && (
            <>
              <Divider />
              <Field label="Uwagi:" value={comment} />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box mt={3} className="to-change">
          <GoogleMapsStaticLocation
            markerCoordination={parseCoordinates(coordinates)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ClubSimple;
