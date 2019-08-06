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
import React from 'react';
import { RouterProps } from 'react-router';
import { Link } from 'react-router-dom';
import { loginRequested } from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import useStyles from './styles';
import useForm from '../../utils/hooks/useForm';

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

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useForm<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
  });

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

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
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
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <TextField
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
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}

          {loginError && <div>{JSON.stringify(loginError, null, 2)}</div>}
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
      </div>
    </Container>
  );
};

// tslint:disable-next-line:max-file-line-count
export default LoginForm;
