/* istanbul ignore next */
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { render } from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';
import config from './config';
import LoggerContext from './contexts/logger';
import i18n from './i18n';
import { authDataRetrievalRequested } from './redux/auth/actionCreators';
import configureStore, { history } from './redux/configureStore';
import loggerFactory from './services/logger';
import defaultTheme from './themes/default';

const { persistor, store }: any = configureStore();

const logger = loggerFactory(config.logger);

store.dispatch(authDataRetrievalRequested());

render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <LoggerContext.Provider value={logger}>
        <ThemeProvider theme={defaultTheme}>
          <ConnectedRouter history={history}>
            <SnackbarProvider>
              <PersistGate loading={null} persistor={persistor}>
                <App />
              </PersistGate>
            </SnackbarProvider>
          </ConnectedRouter>
        </ThemeProvider>
      </LoggerContext.Provider>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);
