import React, { memo } from 'react';

import TableRow from './tableRow/tableRow.component';

const TableRowMemozied = memo(({ singleData, columns, isChecked, onSelect, onDeselect  }) => (
  <TableRow
    singleData={singleData}
    columns={columns}
    isChecked={isChecked}
    onSelect={onSelect}
    onDeselect={onDeselect}
  />
));
TableRowMemozied.displayName = 'TableRow';

function TableBody(props) {
  const {
    data,
    columns,
    selected,
    onSelect,
    onDeselect,
  } = props;

  return (
    <tbody>
      {data.map(singleData => {
        const isChecked = selected.includes(singleData._id);

        return (
          <TableRowMemozied
            key={singleData._id}
            singleData={singleData}
            columns={columns}
            isChecked={isChecked}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        );
      })}
    </tbody>
  );
}

export default TableBody;
