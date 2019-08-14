import React from 'react';

function TableHeader(props) {
  const {
    columns,
  } = props;

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.name}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
