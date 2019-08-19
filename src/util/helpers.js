import moment from 'moment';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';

export const parseCoordinates = (coordinates) => {
  return coordinates.reduce((acc, el, index) => {
    const property = index === 0 ? 'lat' : 'lng';
    acc[property] = el;

    return acc;
  }, {})
};

export const formatDate = date => moment(date).format('YYYY-MM-DD hh:mm');

export const getRelationsToEdit = (prevRelations, newRelations) => {
  const relationsSame = _intersection(prevRelations, newRelations);

  return {
    toAdd: newRelations.filter(id => !relationsSame.includes(id)),
    toRemove: prevRelations.filter(prevId => !relationsSame.includes(prevId)),
  };
};

export const parseClubsToIds = clubs => clubs.map(club => club._id);

export const compareSuggestionBeforeAfter = (original, data) => {
  const comparision = {
    isNewName: false,
    isNewTier: false,
    isNewLogo: false,
    isNewLocation: false,
    toAddFriendships: [],
    toRemoveFriendships: [],
    toAddAgreements: [],
    toRemoveAgreements: [],
    toAddPositives: [],
    toRemovePositives: [],
    toAddSatellites: [],
    toRemoveSatellites: [],
    toAddSatelliteOf: false,
    toRemoveSatelliteOf: false,
  };

  if (original.name !== data.name) _set(comparision, 'name', true);
  if (original.tier !== data.tier) _set(comparision, 'tier', true);
  if (original.logo !== data.logo) _set(comparision, 'logo', true);
  if (!_isEqual(original.location.coordinates, data.location.coordinates)) _set(comparision, 'location', true);

  const compareRelations = (originalRelations, afterRelations, toAddKey, toRemovekey) => {
    const {
      toAdd: toAddIds,
      toRemove: toRemoveIds,
    } = getRelationsToEdit(parseClubsToIds(originalRelations), parseClubsToIds(afterRelations));

    _set(comparision, toAddKey, toAddIds);
    _set(comparision, toRemovekey, toRemoveIds);
  }

  compareRelations(original.friendships, data.friendships, 'toAddFriendships', 'toRemoveFriendships');
  compareRelations(original.agreements, data.agreements, 'toAddAgreements', 'toRemoveAgreements');
  compareRelations(original.positives, data.positives, 'toAddPositives', 'toRemovePositives');
  compareRelations(original.satellites, data.satellites, 'toAddSatellites', 'toRemoveSatellites');

  if (original.satelliteOf && !data.satelliteOf && !data.satelliteOfToCreate) {
    _set(comparision, 'toRemoveSatelliteOf', true);
  } else if(!original.satelliteOf && (data.satelliteOf || data.satelliteOfToCreate)) {
    _set(comparision, 'toAddSatelliteOf', true);
  }
  
  return comparision;
};