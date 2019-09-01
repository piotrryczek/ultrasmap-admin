import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import TableRowMUI from '@material-ui/core/TableRow';
import TableCellMUI from '@material-ui/core/TableCell';

import TableCell from './tableCell.component';

function TableRow(props) {
  const {
    columns,
    singleData,
    onSelect,
    onDeselect,
    isChecked,
    canEdit,
    apiPath,
    hasEditCredential,
  } = props;

  const { _id: id } = singleData;

  const handleChange = useCallback(() => {
    if (isChecked) {
      onDeselect(id)
    } else {
      onSelect(id);
    }
  }, [isChecked, id, onDeselect, onSelect]);

  return (
    <TableRowMUI>
      <TableCellMUI>
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
        />
      </TableCellMUI>

      {columns.map(column => (
        <TableCell
          key={column.name}
          data={singleData}
          column={column}
        />
      ))}

      {hasEditCredential && (
        <TableCellMUI>
          {canEdit && hasEditCredential && (
            <Link to={`${apiPath}/${singleData._id}`}>
              <Button variant="contained" color="primary">Edytuj</Button>
            </Link>
          )}
        </TableCellMUI>
      )}
      
    </TableRowMUI>
  )
}

export default memo(TableRow);
