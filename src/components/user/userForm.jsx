import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// eslint-disable-next-line react/display-name
const userForm = (editType, roles) => ({
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
}) => {
  const isError = (field) => errors[field] && touched[field];

  const handleChangeIsNewPassword = (event, isChecked) => {
    if (!isChecked) {
      setFieldValue('password', '');
    }

    setFieldTouched('password', false);
    setFieldValue('isNewPassword', isChecked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">
        User data
      </Typography>
      <ul className="fields">
        <li className="field">
          <TextField
            error={isError('email')}
            helperText={isError('email') ? errors.email : ''}
            label="Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
          />
        </li>
        <li className="field">
          <TextField
            error={isError('name')}
            helperText={isError('name') ? errors.name : ''}
            label="Name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
        </li>
        <li className="field">
          <Select
            error={isError('role')}
            value={role}
            onChange={handleChange}
            onBlur={handleBlur}
            name="role"
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
        </li>
      </ul>
      <Typography variant="h6">
        Password
      </Typography>
      
      {editType === 'update' && (
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
      )}

      {(isNewPassword || editType === 'new')  && (
        <ul className="fields">
          <li className="field">
            <TextField
              error={isError('password')}
              helperText={isError('password') ? errors.password : ''}
              label="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
            />
          </li>
        </ul>
      )}
      <Button variant="contained" color="primary" type="submit">Send</Button>
    </form>
  );
};

export default userForm;
