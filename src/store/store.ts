import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducer/users.slice';
import { playerReducer } from '../reducer/players.slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    players: playerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
