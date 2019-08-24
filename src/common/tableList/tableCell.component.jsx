import React from 'react'
import TableCellMUI from '@material-ui/core/TableCell';
import _get from 'lodash/get';

import { IMAGES_URL } from 'config/config';

const renderValue = (data, column) => {
  const {
    type,
    name,
    field,
  } = column;

  switch (type) {
    case 'text': {
      if (field) {
        return _get(data, field);
      }

      return data[name];
    }

    case 'image': {
      const imageSrc = data[name];

      return (
        <img src={`${IMAGES_URL}/h180/${imageSrc}`} alt="" className="table-image" />
      );
    }

    default:
      return false;
  }
};

function TableCell(props) {
  const {
    column,
    column: {
      alignment = 'left',
    },
    data,
  } = props;

  return (
    <TableCellMUI align={alignment}>{renderValue(data, column)}</TableCellMUI>
  );
}

export default TableCell;
