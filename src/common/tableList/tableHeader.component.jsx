import React from 'react';

function TableHeader(props) {
  const {
    columns,
  } = props;

  return (
    <thead>
      <tr>
        <th>Tutaj checkbox</th>
        {columns.map(column => (
          <th key={column.name}>
            {column.label}
          </th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
