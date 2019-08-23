import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { setMessage } from 'components/app/app.actions';
import { formatDate } from 'util/helpers';

import Auth from 'services/auth';
import Api from 'services/api';

function Backups() {
  const dispatch = useDispatch(); 

  const [backups, setBackups] = useState([]);
  const [restoreDialog, setRestoreDialog] = useState({
    isOpened: false,
    fileName: null,
  });

  const {
    isOpened: isDialogOpened,
    fileName,
  } = restoreDialog;

  const hasCreateBackupCredential = Auth.hasCredentialLocal('createBackup');
  const hasRestoreBackupCredential = Auth.hasCredentialLocal('restoreBackup');

  const fetchData = useCallback(async () => {
    const { data: backups } = await Api.get('/backups');

    setBackups(backups);
  }, []);

  const restoreBackup = useCallback(async () => {
    await Api.post('/backups/restore', {
      fileName,
    });

    setRestoreDialog({
      fileName: null,
      isOpened: false,
    });

    dispatch(setMessage('success', 'BACKUP_RESTORED'))
  }, [fileName]);

  const createBackup = useCallback(async () => {
    await Api.post('/backups/create');
    await fetchData();

    dispatch(setMessage('success', 'BACKUP_CREATED'))
  }, []);

  const handleOpenDialog = fileName => () => {
    setRestoreDialog({
      fileName,
      isOpened: true,
    });
  };

  const handleCloseDialog = useCallback(() => {
    setRestoreDialog({
      fileName: null,
      isOpened: false,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper>
      <Box p={3}>
        <Grid container spacing={2}>
          {hasCreateBackupCredential && (
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="button" onClick={createBackup} size="large">Create backup</Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File name</TableCell>
                  <TableCell>Created at</TableCell>
                  {hasRestoreBackupCredential && <TableCell>Restore</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {backups.map(({ fileName, createdAt }) => (
                  <TableRow key={fileName}>
                    <TableCell>{fileName}</TableCell>
                    <TableCell>{formatDate(createdAt)}</TableCell>
                    {hasRestoreBackupCredential && (
                      <TableCell>
                        <Button variant="contained" color="primary" type="button" onClick={handleOpenDialog(fileName)}>Restore</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog
              open={isDialogOpened}
              onClose={handleCloseDialog}
            >
              <DialogTitle>Are you sure you want to restore this backup?</DialogTitle>
              
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
                <Button
                  onClick={restoreBackup}
                  variant="contained"
                  color="secondary"
                >
                  Restore
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default Backups;
