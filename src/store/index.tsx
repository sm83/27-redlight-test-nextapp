import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import sessionReducer from './sessionSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    session: sessionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
