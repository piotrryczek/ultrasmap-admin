import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import TableCell from './tableCell/tableCell.component';

function TableRow(props) {
  const {
    columns,
    singleData,
    onSelect,
    onDeselect,
    isChecked,
    editUrl,
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
    <tr>
      <td>
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
        />
      </td>

      {columns.map(column => (
        <TableCell
          key={column.name}
          data={singleData}
          column={column}
        />
      ))}

      <td>
        {editUrl && hasEditCredential && (
          <Link to={`${editUrl}/${singleData._id}`}>
            <Button variant="contained" color="primary">Edytuj</Button>
          </Link>
        )}
      </td>
    </tr>
  )
}

export default TableRow;
