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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector,  } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/routes';
import { remindPasswordRequested } from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import remindPasswordSchema from '../../utils/schemas/remindPassword';
import useStyles from './styles';

export interface RemindPasswordValues {
  readonly email: string;
}

const RemindPasswordForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { remindPasswordLoading } = useSelector(({ auth }: State) => auth);

  const dispatch = useDispatch();

  const remindPassword = (values: RemindPasswordValues) =>
    dispatch(remindPasswordRequested(values));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {t('auth.remindPassword')}
        </Typography>

        <Formik
          validationSchema={remindPasswordSchema}
          initialValues={{ email: '' }}
          validateOnChange={false}
          onSubmit={remindPassword}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            const hasEmailError = Boolean(errors.email && touched.email);

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
                  label={t('auth.email')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Button
                  disabled={remindPasswordLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                >
                  {t('auth.remindPassword')}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to={LOGIN}>{t('auth.backToLogin')}</Link>
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
export default RemindPasswordForm;
