import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './ApiSice';
import { UserSlice } from './UserSlice';

const store =  configureStore({
  reducer: {
    apiSlice: ApiSlice.reducer,
    userSlice: UserSlice.reducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
