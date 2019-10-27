import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createPersistedReducer, { State } from './rootReducer';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState?: State): Store {
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    createPersistedReducer(history),
    preloadedState as any,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  
  
  sagaMiddleware.run(rootSaga);
  
  const persistor = persistStore(store);
  
  return { persistor, store } as any;
}
