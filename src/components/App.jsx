import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../containers/Header';
import MainSection from '../containers/MainSection';
import AppBar from './AppBar';

const App = () => (
  <div>
    <CssBaseline />
    <AppBar />
    <Header />
    <MainSection />
  </div>
);

export default App;
