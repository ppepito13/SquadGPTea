import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './ApiSice';
import { HomeworkSlice } from './HomeworkSlice';
import { PostSlice } from './PostSlice';
import { StatusSlice } from './StatusSlice';
import { UserSlice } from './UserSlice';

const store =  configureStore({
  reducer: {
    apiSlice: ApiSlice.reducer,
    homeworkSlice: HomeworkSlice.reducer,
    postSlice: PostSlice.reducer,
    statusSlice: StatusSlice.reducer,
    userSlice: UserSlice.reducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
