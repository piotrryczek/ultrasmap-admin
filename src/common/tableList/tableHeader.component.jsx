import React, { memo, useState, useCallback } from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableHeadMUI from '@material-ui/core/TableHead';
import TableRowMUI from '@material-ui/core/TableRow';
import TableCellMUI from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useButtonStyles } from 'theme/useStyles';

const useStyles = makeStyles(theme => ({
  leftMargin: {
    marginLeft: theme.spacing(2),
  }
}));

function TableHeader(props) {
  const {
    handleDelete,
    isAllChecked,
    toggleSelected,
    columns,
    canRemove,
  } = props;

  const [isRemoveDialogOpened, setIsRemoveDialogOpened] = useState(false);

  const handleOpenRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(true);
  }, []);

  const handleCloseRemoveDialog = useCallback(() => {
    setIsRemoveDialogOpened(false);
  }, []);

  const buttonClasses = useButtonStyles({});
  const classes = useStyles({});

  return (
    <TableHeadMUI>
      <TableRowMUI>
        <TableCellMUI>
          <Checkbox
            checked={isAllChecked}
            onChange={toggleSelected}
          />

          {canRemove && (
            <>
              <Dialog
                open={isRemoveDialogOpened}
                onClose={handleCloseRemoveDialog}
              >
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                
                <DialogActions>
                  <Button
                    onClick={handleCloseRemoveDialog}
                    variant="contained"
                    color="primary"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="primary"
                    className={buttonClasses.remove}
                  >
                    Remove
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleOpenRemoveDialog}
                className={classNames(buttonClasses.remove, classes.leftMargin)}
              >
                Usuń
              </Button>
            </>
          )}
        </TableCellMUI>
        {columns.map(({ name, alignment = 'left', label }) => (
          <TableCellMUI key={name} align={alignment}>
            {label}
          </TableCellMUI>
        ))}
        <TableCellMUI>Actions</TableCellMUI>
      </TableRowMUI>
    </TableHeadMUI>
  );
}

const TableHeaderMemoized = memo(props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TableHeader {...props} />
));
TableHeaderMemoized.displayName = 'TableHeader';

export default TableHeaderMemoized;
