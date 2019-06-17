import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import AppWrapper from './components/AppWrapper';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App = () => (
  <Fragment>
    <CssBaseline />
    <AppWrapper>
      <Switch>
        <Route exact path="/" render={() => <div>Home page</div>} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route render={() => <div>Not found</div>} />
      </Switch>
    </AppWrapper>
  </Fragment>
);

export default App;
