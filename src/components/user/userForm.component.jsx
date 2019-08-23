import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { setMessage } from 'components/app/app.actions';
import { useLabelStyles } from 'theme/useStyles';

function UserForm({
  editType,
  roles,
  values: {
    email,
    name,
    role,
    password,
    isNewPassword,
  },
  errors,
  touched,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  isSubmitting,
  isValid
}) {
  const dispatch = useDispatch(); 

  const isError = (field) => errors[field] && touched[field];

  useEffect(() => {
    if (isSubmitting && !isValid) {
      dispatch(setMessage('error', 'FORM_INCORRECT'))
    }
  }, [isSubmitting, isValid]);

  const handleChangeIsNewPassword = useCallback((event, isChecked) => {
    if (!isChecked) {
      setFieldValue('password', '');
    }

    setFieldTouched('password', false);
    setFieldValue('isNewPassword', isChecked);
  }, [])

  const labelClasses = useLabelStyles({});

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={isError('email')}
            helperText={isError('email') ? errors.email : ''}
            label="Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError('name')}
            helperText={isError('name') ? errors.name : ''}
            label="Name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="role" className={labelClasses.fontSize}>Role</InputLabel>
          <Select
            error={isError('role')}
            value={role}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Role"
            name="role"
            inputProps={{
              id: 'role',
            }}
            fullWidth
          >
            {roles.map(({ _id: id, name }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {editType === 'update' && (
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isNewPassword}
                  onChange={handleChangeIsNewPassword}
                  name="isNewPassword"
                />
              )}
              label="Set new password"
            />
          </Grid>
        )}
        {(isNewPassword || editType === 'new')  && (
          <Grid item xs={12}>
            <TextField
              error={isError('password')}
              helperText={isError('password') ? errors.password : ''}
              label="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}




export default UserForm;
