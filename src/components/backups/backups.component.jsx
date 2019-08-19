import React, { useEffect, useState, useCallback } from 'react';

import Button from '@material-ui/core/Button';

import { formatDate } from 'util/helpers';

import Auth from 'services/auth';
import Api from 'services/api';

function Backups() {
  const [backups, setBackups] = useState([]);

  const hasCreateBackupCredential = Auth.hasCredentialLocal('createBackup');
  const hasRestoreBackupCredential = Auth.hasCredentialLocal('restoreBackup');

  const fetchData = useCallback(async () => {
    const { data: backups } = await Api.get('/backups');

    setBackups(backups);
  }, []);

  const restoreBackup = useCallback((fileName) => async () => {
    await Api.post('/backups/restore', {
      fileName,
    });


  }, []);

  const createBackup = useCallback(async () => {
    await Api.post('/backups/create');
    await fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {hasCreateBackupCredential && <Button variant="contained" color="primary" type="button" onClick={createBackup}>Create</Button>}
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Created at</th>
            {hasRestoreBackupCredential && <th>Restore</th>}
          </tr>
        </thead>
        <tbody>
          {backups.map(({ fileName, createdAt }) => (
            <tr key={fileName}>
              <td>{fileName}</td>
              <td>{formatDate(createdAt)}</td>
              {hasRestoreBackupCredential && (
                <td>
                  <Button variant="contained" color="primary" type="button" onClick={restoreBackup(fileName)}>Restore</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Backups;
