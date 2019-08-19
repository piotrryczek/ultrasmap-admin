import React from 'react';

function ClubAfter(props) {
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
    data: {
      name,
      logo,
      tier,
      location,
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

  /*
  Usuniety / Dodany / Utworzony (dodany) / Bez zmian
  */

  return (
    <p>After</p>
  );
}

export default ClubAfter;
