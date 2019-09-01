import React from 'react';
import { useTranslation } from 'react-i18next';
import _get from 'lodash/get';

import TableCellMUI from '@material-ui/core/TableCell';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { IMAGES_URL } from 'config/config';

const renderValue = (data, column, t) => {
  const {
    type,
    name,
    field,
    translate,
  } = column;

  switch (type) {
    case 'text': {
      const fieldValue = field ? _get(data, field) : data[name];
      const finalValue = translate ? t(`${translate}.${fieldValue}`) : fieldValue;
      
      return finalValue;
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
  const { t } = useTranslation();

  const {
    column,
    column: {
      alignment = 'left',
    },
    data,
  } = props;

  return (
    <TableCellMUI align={alignment}>{renderValue(data, column, t)}</TableCellMUI>
  );
}

export default TableCell;
