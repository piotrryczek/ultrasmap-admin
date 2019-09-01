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

  if (original.name !== data.name) _set(comparision, 'isNewName', true);
  if (original.logo !== data.logo) _set(comparision, 'isNewLogo', true);
  if (!_isEqual(original.location.coordinates, data.location.coordinates)) _set(comparision, 'isNewLocation', true);

  const compareRelations = (originalRelations, afterRelations, toAddKey, toRemovekey) => {
    const {
      toAdd: toAddIds,
      toRemove: toRemoveIds,
    } = getRelationsToEdit(parseClubsToIds(originalRelations), parseClubsToIds(afterRelations));

    _set(comparision, toAddKey, toAddIds);
    _set(comparision, toRemovekey, originalRelations.reduce((acc, club) => {
      if (toRemoveIds.includes(club._id)) acc.push(club);

      return acc;
    }, []));
  }

  compareRelations(original.friendships, data.friendships, 'toAddFriendships', 'toRemoveFriendships');
  compareRelations(original.agreements, data.agreements, 'toAddAgreements', 'toRemoveAgreements');
  compareRelations(original.positives, data.positives, 'toAddPositives', 'toRemovePositives');
  compareRelations(original.satellites, data.satellites, 'toAddSatellites', 'toRemoveSatellites');

  if (
    original.satelliteOf && (
      data.satelliteOfToCreate || (
        data.satelliteOf && original.satelliteOf._id !== data.satelliteOf._id
      )
    )
  ) {
    _set(comparision, 'toRemoveSatelliteOf', original.satelliteOf);
  }

  if (
    data.satelliteOf && (
      !original.satelliteOf || (
        data.satelliteOf._id !== original.satelliteOf._id
      )
    )
  ) {
    _set(comparision, 'toAddSatelliteOf', data.satelliteOf);
  }
  
  return comparision;
};

export const prepareClubFormData = ({
  name,
  logo,
  newLogo = null,
  tier,
  coordinates,
  friendships,
  agreements,
  positives,
  satellites,
  satelliteOf,
}, excludes = []) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('logo', logo);
  if (!excludes.includes('tier')) formData.append('tier', tier);
  formData.append('location', JSON.stringify(coordinates));
  formData.append('friendships', JSON.stringify(friendships));
  formData.append('agreements', JSON.stringify(agreements));
  formData.append('positives', JSON.stringify(positives));
  formData.append('satellites', JSON.stringify(satellites));

  if (satelliteOf) formData.append('satelliteOf', satelliteOf);
  if (newLogo) formData.append('newLogo', newLogo);

  return formData;
};

export const translateChoices = (t, choices, translate) => choices.map(choice => ({
  value: choice,
  label: t(`${translate}.${choice}`),
}))
