// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import _defaultTo from 'ramda/src/defaultTo';
import React from 'react';
import { RouteProps } from 'react-router';
import PasswordField from '../../atoms/PasswordField';
import {
  ResetPasswordOptions,
  resetPasswordRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import resetPasswordSchema from '../../utils/schemas/resetPassword';
import ErrorMessage from '../ErrorMessage';
import useStyles from './styles';

interface ResetPasswordFormProps extends AuthState, RouteProps {
  readonly resetPassword: (
    options: ResetPasswordOptions
  ) => ReturnType<typeof resetPasswordRequested>;
}

const ResetPasswordForm = ({
  resetPasswordLoading,
  resetPasswordError,
  resetPassword,
  location,
}: ResetPasswordFormProps) => {
  const classes = useStyles();

  const params =
    location !== undefined ? new URLSearchParams(location.search) : null;

  const tokenParam = params !== null ? params.get('token') : '';
  const emailParam = params !== null ? params.get('email') : '';

  const token = _defaultTo('')(tokenParam);
  const email = _defaultTo('')(emailParam);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Reset password
        </Typography>

        <Formik
          validationSchema={resetPasswordSchema}
          initialValues={{ email, password: '', passwordConfirmation: '' }}
          validateOnChange={false}
          onSubmit={values => resetPassword({ ...values, token })}
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
            const hasPasswordConfirmationError = Boolean(
              errors.passwordConfirmation && touched.passwordConfirmation
            );

            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      helperText={errors.email}
                      error={hasEmailError}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PasswordField
                      helperText={errors.password}
                      error={hasPasswordError}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="New password"
                      id="password"
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PasswordField
                      helperText={errors.passwordConfirmation}
                      error={hasPasswordConfirmationError}
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label="New password confirmation"
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {resetPasswordError && (
                      <ErrorMessage>{resetPasswordError}</ErrorMessage>
                    )}

                    <Button
                      type="submit"
                      disabled={resetPasswordLoading}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submit}
                    >
                      Reset password
                    </Button>
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
export default ResetPasswordForm;
