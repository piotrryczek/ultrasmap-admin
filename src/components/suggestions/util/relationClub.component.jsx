import React from 'react';
import classNames from 'classnames';

function RelationClub(props) {
  const {
    type,
    children,
  } = props;

  return (
    <span className={classNames('relation-club', type)}>
      {children}
    </span>
  )
}

export default RelationClub;
