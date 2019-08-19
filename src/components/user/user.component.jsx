import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';

import history from 'config/history';
import userSchema from 'schemas/user';
import Api from 'services/api';

import { setMessage } from 'components/app/app.actions';

import userForm from './userForm';

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

  const handleSubmit = useCallback(async (values) => {
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
  }, []);

  const handleValidate = useCallback(async (values) => {
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
  }, []);

  return (
    <>
      <Formik
        initialValues={fields}
        enableReinitialize
        onSubmit={handleSubmit}
        validate={handleValidate}
        render={userForm(editType, roles)}
      />
    </>
  );
}

export default User;
