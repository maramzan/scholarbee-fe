import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import { programsApi } from './api/programApi';
import { userApi } from './api/userApi';
import { applicationsApi } from './api/applicationApi';
import { universitiesApi } from './api/universitiesApi';
import { contactApi } from './api/contactApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['admission', 'auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
        ignoredPaths: ['register']
      }
    }).concat(
      programsApi.middleware,
      userApi.middleware,
      applicationsApi.middleware,
      universitiesApi.middleware,
      contactApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
