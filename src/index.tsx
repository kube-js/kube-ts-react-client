/* istanbul ignore next */
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore, { history } from './redux/configureStore';
import defaultTheme from './themes/default';

const store = configureStore();

render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
