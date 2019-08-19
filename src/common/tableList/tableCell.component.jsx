import React from 'react'
import _get from 'lodash/get';

const retrieveValue = (data, column) => {
  const { type, name, field } = column;

  switch (type) {
    case 'text': {
      if (field) {
        return _get(data, field);
      }

      return data[name];
    }

    default:
      return false;
  }
};

function TableCell(props) {
  const {
    column,
    data,
  } = props;

  const value = retrieveValue(data, column);

  return (
    <td>{value}</td>
  );
}

export default TableCell;
