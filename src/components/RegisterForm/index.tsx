// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { SyntheticEvent, useState } from 'react';
import { RouterProps } from 'react-router';
import { Link } from 'react-router-dom';
import {
  RegisterOptions,
  registerRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import useStyles from './styles';

interface RegisterFormProps extends AuthState, RouterProps {
  readonly register: (
    options: RegisterOptions
  ) => ReturnType<typeof registerRequested>;
  readonly registerLoading?: boolean;
}

const RegisterForm = (props: RegisterFormProps) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { registerLoading, register } = props;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    register({ email, password, firstName, lastName, passwordConfirmation });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={({ target: { value } }) => setFirstName(value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={({ target: { value } }) => setLastName(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                id="passwordConfirmation"
                autoComplete="off"
                value={passwordConfirmation}
                onChange={({ target: { value } }) => setPasswordConfirmation(value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            disabled={registerLoading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

// tslint:disable-next-line:max-file-line-count
export default RegisterForm;
