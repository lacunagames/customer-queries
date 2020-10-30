import { configureStore } from '@reduxjs/toolkit';
import customerQueryReducer from './components/customerQuerySlice';

export default configureStore({
  reducer: {
    customerQuery: customerQueryReducer,
  },
});
