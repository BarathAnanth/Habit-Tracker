import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import habitsReducer from './habitSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;