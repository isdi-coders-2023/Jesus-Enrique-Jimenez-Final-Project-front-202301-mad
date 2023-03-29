import { configureStore } from '@reduxjs/toolkit';
import { User } from '../models/users';
import { playerReducer } from '../reducer/players.slice';
import { userReducer } from '../reducer/users.slice';
import { RootState } from '../store/store';
const mockPlayer = {
  id: '',
  name: '',
  nationality: '',
  age: 30,
  position: '',
  preferredFoot: '',
  picture: '',
  creator: '',
};
export const preloadedState: Partial<RootState> = {
  users: {
    userLogged: null as unknown as User,
    allUsers: [],
    user: {} as User,
  },
  players: {
    allPlayers: [mockPlayer],
    player: mockPlayer,
  },
};

export const mockStore = configureStore({
  reducer: {
    users: userReducer,
    players: playerReducer,
  },
  preloadedState,
});
