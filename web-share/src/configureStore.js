/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './redux/reducers/rootReducer';

export default function configureStore(history) {
  let composeEnhancers = compose;

  // If Redux Dev Tools is installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Create the store with two middlewares
  // 1. thunk: Makes redux-thunk work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];
  const serializedState = localStorage.getItem('state');
  const initialState =
    serializedState === null ? {} : JSON.parse(serializedState);

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./redux/reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  // const persistor = persistStore(store);
  return { store, persistor: persistStore(store) };
}
