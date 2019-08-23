import React, { useCallback } from 'react';
import { Formik } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import loginSchema from 'schemas/login';

import Auth from 'services/auth';

const usePaperStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const useContainerClasses = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

function Login() {
  const handleLogin = useCallback(async (values) => {
    const { email, password } = values;

    await Auth.login(email, password);
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const paperClasses = usePaperStyles({});
  const containerClasses = useContainerClasses({});

  return (
    <section id="login">
      <Grid
        container 
        alignContent="center"
        alignItems="center"
        justify="center"
        className={containerClasses.root}
      >
        <Grid
          item
          xs={4}
        >
          <Paper className={paperClasses.root}>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleLogin}
              validationSchema={loginSchema}
              render={({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={(errors.email && touched.email)}
                        helperText={(errors.email && touched.email) ? errors.email : ''}
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        fullWidth
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        error={(errors.password && touched.password)}
                        helperText={(errors.password && touched.password) ? errors.password : ''}
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </section>
  )
}

export default Login;
