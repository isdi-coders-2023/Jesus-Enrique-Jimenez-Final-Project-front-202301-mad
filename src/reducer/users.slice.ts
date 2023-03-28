import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/users';

export type UserState = {
  userLogged: User;
  allUsers: User[];
  user: User;
};

const initialState: UserState = {
  userLogged: {} as User,
  allUsers: [],
  user: {} as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      state.allUsers = [...state.allUsers, action.payload];
    },
    login(state, action: PayloadAction<User>) {
      state.userLogged = action.payload;
    },
    readId(state, action: PayloadAction<User>) {
      state.userLogged = action.payload;
    },
    update(state, action: PayloadAction<User>) {
      state.userLogged = { ...state.userLogged, ...action.payload };

      const actualInfo = [...state.allUsers];
      state.allUsers = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { register, login, readId, update } = userSlice.actions;

export const userReducer = userSlice.reducer;
