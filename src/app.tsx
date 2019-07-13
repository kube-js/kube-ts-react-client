import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AppWrapper from './components/AppWrapper';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Auth/UnauthenticatedRoute';
import { DASHBOARD, LOGIN, REGISTER, ROOT } from './constants/routes';
import Loading from './pages/Loading';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <AppWrapper>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={ROOT} component={Home} />
          <UnauthenticatedRoute exact path={REGISTER} component={Register} />
          <UnauthenticatedRoute exact path={LOGIN} component={Login} />
          <AuthenticatedRoute exact path={DASHBOARD} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AppWrapper>
  </Fragment>
);

export default App;
