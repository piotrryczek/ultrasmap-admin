import React, { useCallback } from 'react'
import Checkbox from '@material-ui/core/Checkbox';

import TableCell from './tableCell/tableCell.component';

function TableRow(props) {
  console.log('TableRow rerender')

  const {
    columns,
    singleData,
    selected = [],
    onSelect,
    onDeselect,
    isChecked,
  } = props;

  const { _id: id } = singleData;

  const handleChange = useCallback(() => {
    if (isChecked) {
      onDeselect(id)
    } else {
      onSelect(id);
    }
  }, [selected]);

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
    </tr>
  )
}

export default TableRow;
