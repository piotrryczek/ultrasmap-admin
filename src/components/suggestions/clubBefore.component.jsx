import React from 'react';

function ClubBefore(props) {

  const {
    data: {
      name,
      logo,
      tier,
      friendships,
      agreements,
      positives,
      satellites,
      satelliteOf,
    }
  } = props;

  return (
    <p>Before</p>
  );
}

export default ClubBefore;
