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
import React from 'react';
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import PasswordField from '../../atoms/PasswordField';
import { LOGIN } from '../../constants/routes';
import {
  RegisterOptions,
  registerRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import registerSchema from '../../utils/schemas/register';
import useStyles from './styles';

interface RegisterFormProps extends AuthState, RouteProps {
  readonly register: (
    options: RegisterOptions
  ) => ReturnType<typeof registerRequested>;
}

const RegisterForm = (props: RegisterFormProps) => {
  const classes = useStyles();

  const { registerLoading, registerError, register } = props;
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Formik
          validationSchema={registerSchema}
          initialValues={{ email: '', password: '', passwordConfirmation: '' }}
          validateOnChange={false}
          onSubmit={register}
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
                      label="Password"
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
                      label="Password confirmation"
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {registerError && (
                      <div
                        style={{
                          border: '1px solid red',
                          color: 'red',
                          padding: '10px',
                        }}
                      >
                        {registerError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={registerLoading}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submit}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to={LOGIN}>Already have an account? Log in</Link>
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
export default RegisterForm;
