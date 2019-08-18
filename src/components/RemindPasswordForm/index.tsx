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
import { RouteProps } from 'react-router';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/routes';
import { remindPasswordRequested } from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import remindPasswordSchema from '../../utils/schemas/remindPassword';
import useStyles from './styles';

interface RemindPasswordProps extends AuthState, RouteProps {
  readonly remindPassword: (
    values: RemindPasswordValues
  ) => ReturnType<typeof remindPasswordRequested>;
}

export interface RemindPasswordValues {
  readonly email: string;
}

const RemindPasswordForm = (props: RemindPasswordProps) => {
  const classes = useStyles();

  const { remindPasswordLoading, remindPassword } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Remind Password
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
                  label="Email Address"
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
                  Remind password
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to={LOGIN}>Back to login</Link>
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
