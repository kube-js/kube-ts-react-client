import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AppWrapper from './components/AppWrapper';
import { LOGIN, REGISTER, ROOT } from './constants/routes';
import Loading from './pages/Loading';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <AppWrapper>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={ROOT} component={Home} />
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={LOGIN} component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AppWrapper>
  </Fragment>
);

export default App;
