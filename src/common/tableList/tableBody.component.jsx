import React, { memo } from 'react';

import TableRow from './tableRow.component';

const TableRowMemozied = memo(({ singleData, columns, isChecked, onSelect, onDeselect, canEdit, apiPath, hasEditCredential }) => (
  <TableRow
    singleData={singleData}
    columns={columns}
    isChecked={isChecked}
    onSelect={onSelect}
    onDeselect={onDeselect}
    canEdit={canEdit}
    apiPath={apiPath}
    hasEditCredential={hasEditCredential}
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
    canEdit,
    apiPath,
    hasEditCredential,
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
            canEdit={canEdit}
            apiPath={apiPath}
            hasEditCredential={hasEditCredential}
          />
        );
      })}
    </tbody>
  );
}

export default TableBody;
