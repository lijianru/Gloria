import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { counterReducer } from './slices/counter';
import { pokemonApi } from './slices/pokemon';

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage,
    blacklist: [pokemonApi.reducerPath],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略redux-persist的action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
