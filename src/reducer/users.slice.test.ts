import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/users';
import { userReducer, State } from './users.slice';

const userMock = {
  id: '',
  email: '',
  userName: '',
  players: [],
};

const mockInitialState: State = {
  userLogged: {} as User,
  users: [],
};

describe('Given the Users slice reducer', () => {
  describe('When we use the register method', () => {
    test('Then, it should return the users array with the new users as a state', () => {
      const registerMock: PayloadAction<User> = {
        type: 'user/register',
        payload: userMock,
      };
      const result = userReducer(mockInitialState, registerMock);
      expect(result.users).toContain(userMock);
    });
  });
  describe('When we use the LogIn method', () => {
    test('Then, it should return the logged user in UserLogged', () => {
      const loginMock: PayloadAction<User> = {
        type: 'user/login',
        payload: userMock,
      };
      const result = userReducer(mockInitialState, loginMock);
      expect(result.userLogged).toBe(userMock);
    });
  });
});
