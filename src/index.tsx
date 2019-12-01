/* istanbul ignore next */
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { PersistGate } from 'redux-persist/integration/react';
// tslint:disable-next-line:no-import-side-effect
import 'url-search-params-polyfill';
import App from './app';
import StripeLoader from './components/StripeLoader';
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
      <StripeLoader locale={i18n.language}>
        {({ stripe, ...props }: any) => (
          <StripeProvider {...props} stripe={stripe}>
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
          </StripeProvider>
        )}
      </StripeLoader>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);
