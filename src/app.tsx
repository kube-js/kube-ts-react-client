import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import NavBar from './components/NavBar';

const App = () => (
  <Fragment>
    <CssBaseline />
    <NavBar />
    <Switch>
      <Route exact path="/" render={() => <div>Home page</div>} />
      <Route render={() => <div>Not found</div>} />
    </Switch>
  </Fragment>
);

export default App;
