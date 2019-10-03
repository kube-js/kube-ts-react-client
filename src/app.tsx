import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, StrictMode, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Auth/UnauthenticatedRoute';
import CourseView from './components/CourseView';
import ErrorBoundary from './components/ErrorBoundaries/Page/index';
import Layout from './components/Layout';
import {
  COURSE_VIEW,
  DASHBOARD,
  LOGIN,
  REGISTER,
  REMIND_PASSWORD,
  RESET_PASSWORD,
  ROOT,
  VERIFY,
} from './constants/routes';
import Home from './containers/Home';
import Loading from './containers/Loading';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Notifier from './containers/Notifier';
import Register from './containers/Register';

const RemindPassword = lazy(() => import('./containers/RemindPassword'));
const ResetPassword = lazy(() => import('./containers/ResetPassword'));
const VerifyAccount = lazy(() => import('./containers/VerifyAccount'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <Notifier />
    <Layout>
      <Suspense fallback={<Loading />}>
        <StrictMode>
          <ErrorBoundary>
            <Switch>
              <Route exact path={ROOT} component={Home} />
              <Route exact path={COURSE_VIEW} component={CourseView} />
              <Route exact path={RESET_PASSWORD} component={ResetPassword} />
              <Route exact path={VERIFY} component={VerifyAccount} />

              <UnauthenticatedRoute
                exact
                path={REGISTER}
                component={Register}
              />
              <UnauthenticatedRoute exact path={LOGIN} component={Login} />
              <UnauthenticatedRoute
                exact
                path={REMIND_PASSWORD}
                component={RemindPassword}
              />

              <AuthenticatedRoute
                exact
                path={DASHBOARD}
                component={Dashboard}
              />

              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </StrictMode>
      </Suspense>
    </Layout>
  </Fragment>
);

export default App;
