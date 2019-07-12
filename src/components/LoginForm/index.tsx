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
import React, { SyntheticEvent, useState } from 'react';
import { Redirect, RouterProps } from 'react-router';
import { Link } from 'react-router-dom';
import { DASHBOARD } from '../../constants/routes';
import { loginRequested } from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import useStyles from './styles';

interface LoginFormProps extends AuthState, RouterProps {
  readonly login: (
    email: string,
    password: string
  ) => ReturnType<typeof loginRequested>;
}

const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login, user } = props;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    login(email, password);
  };

  if (user) {
    return <Redirect push to={DASHBOARD} />;
  }

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
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />

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
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />

          <Button
            disabled={loading}
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
