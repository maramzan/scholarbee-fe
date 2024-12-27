import { combineReducers } from 'redux';
import authSlice from '../slices/authSlice';
import { programsApi } from '../api/programApi';
import { userApi } from '../api/userApi';
import admissionSlice from '../slices/admissionSlice';
import { universitiesApi } from '../api/universitiesApi';
import { contactApi } from '../api/contactApi';
import { applicationsApi } from '../api/applicationApi';

const rootReducer = combineReducers({
  auth: authSlice,
  admission: admissionSlice,
  [programsApi.reducerPath]: programsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [universitiesApi.reducerPath]: universitiesApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer
});

export default rootReducer;
