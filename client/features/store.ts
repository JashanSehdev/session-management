
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers, Reducer, UnknownAction } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer, { authTransform } from './auth/auth.slice'
import storage from './storage';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const appReducer = combineReducers({
  auth : authReducer
});

type AppState = ReturnType<typeof appReducer>;

const rootReducer: Reducer<AppState, UnknownAction> = appReducer;

const persistConfig = {
  key: 'root',
  storage,
  transforms :[authTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const persistor = persistStore(store);