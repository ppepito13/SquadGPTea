import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './ApiSice';
import { PostSlice } from './PostSlice';
import { UserSlice } from './UserSlice';

const store =  configureStore({
  reducer: {
    apiSlice: ApiSlice.reducer,
    postSlice: PostSlice.reducer,
    userSlice: UserSlice.reducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
