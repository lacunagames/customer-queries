import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'customerQuery',
  initialState: {
    data: {
      firstName: '',
      surName: '',
      email: '',
      query: '',
    },
  },
  reducers: {
    setCustomerQuery: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setCustomerQuery } = slice.actions;

export default slice.reducer;
