// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import React from 'react';
import { RouterProps } from 'react-router';
import { Link } from 'react-router-dom';
import { loginRequested } from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import loginSchema from '../../utils/schemas/login';
import useStyles from './styles';

interface LoginFormProps extends AuthState, RouterProps {
  readonly login: (
    email: string,
    password: string
  ) => ReturnType<typeof loginRequested>;
}

export interface LoginValues {
  readonly email: string;
  readonly password: string;
}

const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles();

  const { loginLoading, loginError, login } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: '', password: '' }}
          validateOnChange={false}
          onSubmit={async ({ email, password }) => login(email, password)}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            const hasEmailError = Boolean(errors.email && touched.email);
            const hasPasswordError = Boolean(
              errors.password && touched.password
            );

            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  helperText={errors.email}
                  error={hasEmailError}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  helperText={errors.password}
                  error={hasPasswordError}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {loginError && (
                  <div
                    style={{
                      border: '1px solid red',
                      color: 'red',
                      padding: '10px',
                    }}
                  >
                    {loginError}
                  </div>
                )}

                <Button
                  disabled={loginLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log in
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">Don't have an account? Register</Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      </div>
    </Container>
  );
};
// tslint:disable-next-line:max-file-line-count
export default LoginForm;
