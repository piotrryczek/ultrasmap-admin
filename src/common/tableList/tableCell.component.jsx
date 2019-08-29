import React from 'react'
import _get from 'lodash/get';

import TableCellMUI from '@material-ui/core/TableCell';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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

    case 'boolean': {
      if (data[name]) {
        return (<CheckIcon />);
      }

      return (<CloseIcon />);
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
