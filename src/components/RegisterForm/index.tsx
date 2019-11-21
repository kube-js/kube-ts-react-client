// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PasswordField from '../../atoms/PasswordField';
import { LOGIN } from '../../constants/routes';
import {
  RegisterOptions,
  registerRequested,
} from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import registerSchema from '../../utils/schemas/register';
import useStyles from './styles';

export interface Props {
  readonly loginLinkProps?: any;
}

const RegisterForm = ({ loginLinkProps = {} }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { registerLoading } = useSelector(({ auth }: State) => auth);

  const dispatch = useDispatch();

  const register = (options: RegisterOptions) =>
    dispatch(registerRequested(options));

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        {t('auth.register')}
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

          const hasPasswordError = Boolean(errors.password && touched.password);

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
                    label={t('auth.email')}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12}>
                  <PasswordField
                    helperText={t('auth.passwordHelperText')}
                    error={hasPasswordError}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={t('auth.password')}
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
                    label={t('auth.passwordConfirmation')}
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
                    disabled={registerLoading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                  >
                    {t('auth.registerAction')}
                  </Button>
                </Grid>
              </Grid>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={LOGIN} {...loginLinkProps}>
                    {t('auth.alreadyHaveAccount')}
                  </Link>
                </Grid>
              </Grid>
            </form>
          );
        }}
      />
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default RegisterForm;
