// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import _defaultTo from 'ramda/src/defaultTo';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PasswordField from '../../atoms/PasswordField';
import {
  ResetPasswordOptions,
  resetPasswordRequested,
} from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import resetPasswordSchema from '../../utils/schemas/resetPassword';
import useStyles from './styles';

const ResetPasswordForm = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { resetPasswordLoading } = useSelector(({ auth }: State) => auth);

  const dispatch = useDispatch();

  const resetPassword = (options: ResetPasswordOptions) =>
    dispatch(resetPasswordRequested(options));

  const params =
  // TODO: add polyfill
    location !== undefined ? new URLSearchParams(location.search) : null;

  const tokenParam = params !== null ? params.get('token') : '';

  const token = _defaultTo('')(tokenParam);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {t('auth.resetPassword')}
        </Typography>

        <Formik
          validationSchema={resetPasswordSchema}
          initialValues={{ password: '', passwordConfirmation: '' }}
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
                    <PasswordField
                      helperText={t('auth.passwordHelperText')}
                      error={hasPasswordError}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label={t('auth.newPassword')}
                      id="password"
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PasswordField
                      helperText={t('auth.passwordHelperText')}
                      error={hasPasswordConfirmationError}
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label={t('auth.newPasswordConfirmation')}
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={resetPasswordLoading}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submit}
                    >
                      {t('auth.resetPassword')}
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
