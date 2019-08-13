import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Auth/UnauthenticatedRoute';
import ErrorBoundary from './components/ErrorBoundaries/Page/index';
import Layout from './components/Layout';
import {
  DASHBOARD,
  LOGIN,
  REGISTER,
  REMIND_PASSWORD,
  RESET_PASSWORD,
  ROOT,
  VERIFY,
} from './constants/routes';
import Loading from './pages/Loading';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const RemindPassword = lazy(() => import('./pages/RemindPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <Layout>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route exact path={ROOT} component={Home} />
            <Route exact path={RESET_PASSWORD} component={ResetPassword} />
            <Route exact path={VERIFY} component={VerifyAccount} />

            <UnauthenticatedRoute exact path={REGISTER} component={Register} />
            <UnauthenticatedRoute exact path={LOGIN} component={Login} />
            <UnauthenticatedRoute
              exact
              path={REMIND_PASSWORD}
              component={RemindPassword}
            />

            <AuthenticatedRoute exact path={DASHBOARD} component={Dashboard} />

            {/* TODO: remove below error route */}
            <Route
              path="/error"
              exact
              render={() => {
                throw new Error('test error');
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </Layout>
  </Fragment>
);

export default App;
