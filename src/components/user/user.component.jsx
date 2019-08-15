import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik } from 'formik';

import history from 'config/history';
import userSchema from 'schemas/user';
import Api from 'services/api';

import { setMessage } from 'components/app/app.actions';

const parseUserData = (data) => {
  const {
    email,
    name,
    role: {
      _id: roleId,
    },
  } = data;

  return {
    email,
    name,
    role: roleId,
    password: '',
    isNewPassword: false,
  };
};

function User(props) {
  const {
    editType,
    match: {
      params: {
        id: userId,
      },
    },
  } = props;

  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    email: '',
    name: '',
    role: '',
    password: '',
    isNewPassword: false,
  });
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    const { data: roles } = await Api.get(`/roles`);

    setRoles(roles);
  }

  const fetchData = async () => {
    const { data: userData } = await Api.get(`/users/${userId}`);

    setFields(parseUserData(userData));
  }

  useEffect(() => {
    fetchRoles();
    if (editType === 'update') {
      fetchData();
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={fields}
        enableReinitialize
        onSubmit={async (values) => {
          const {
            isNewPassword,
            password,
            ...restValues
          } = values;

          if (editType === 'new' || isNewPassword) {
            Object.assign(restValues, {
              password,
            });
          }

          if (editType === 'new') {
            const { data: userId } = await Api.post(`/users`, restValues);

            dispatch(setMessage('success', 'USER_ADDED_SUCCESS'));
            history.push(`/users/${userId}`);

          } else {
            await Api.put(`/users/${userId}`, restValues);

            dispatch(setMessage('success', 'USER_UPDATED_SUCCESS'));
          }
          
        }}
        validate={async (values) => {
          const { isNewPassword, password } = values;

          const errors = {};

          if (
            (editType === 'new' || (isNewPassword && editType === 'update'))
            && password === ''
          ) {
            Object.assign(errors, {
              password: 'Password has to be filled', // TODO: translate
            });
          }
          
          try {
            await userSchema.validate(values, {
              abortEarly: false,
            });
          } catch (error) {
            
            const { inner: schemaErrors } = error;

            const parsedErrors = schemaErrors.reduce((acc, { path, message }) => {
              Object.assign(acc, {
                [path]: message,
              });

              return acc;
            }, {});

            Object.assign(errors, parsedErrors);

            throw errors;
          }

          throw errors;
        }}
        render={({
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
        }}
      />
    </>
  );
}

export default User;
