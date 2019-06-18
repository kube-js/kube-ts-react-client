import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AppWrapper from './components/AppWrapper';

// TODO: move to separate files when reach high number
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <AppWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </AppWrapper>
  </Fragment>
);

export default App;
