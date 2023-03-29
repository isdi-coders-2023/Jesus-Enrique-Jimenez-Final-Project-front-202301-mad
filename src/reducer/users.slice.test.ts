import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/users';
import { userReducer, UserState } from './users.slice';

describe('Given the userSlice with payload and initial state mocked', () => {
  let mockInitialState: UserState;
  let mockPayload: User;
  let mockUser: User;

  beforeEach(() => {
    mockInitialState = {
      userLogged: {} as User,
      allUsers: [],
      user: {} as User,
    };

    mockPayload = {
      userName: 'Test',
      email: 'test',
      password: 'test',
      players: [],
      id: '3',
      results: '1',
    };

    mockUser = {
      id: '1',
      userName: 'Test1',
      email: 'test1',
      password: 'test1',
      players: [],
      results: '1',
    };
  });

  describe('When the register action is called', () => {
    test('Then, if the initial state allUsers is an empty array, it should return the payload in the allUsers property of the state', () => {
      const mockRegisterAction: PayloadAction<User> = {
        type: 'user/register',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockRegisterAction);
      expect(result).toEqual({
        userLogged: {} as User,
        allUsers: [mockPayload],
        user: {},
      });
    });
  });

  describe('When the login action is called', () => {
    test('Then, if the initial state userLogged is empty, it should return the payload in the userLogged property of the state', () => {
      const mockLoginAction: PayloadAction<User> = {
        type: 'user/login',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockLoginAction);
      expect(result).toEqual({
        userLogged: mockPayload,
        allUsers: [],
        user: {},
      });
    });
  });

  describe('When the readId action is called', () => {
    test('Then, if the initial state user is empty, it should return the payload in the user property of the state', () => {
      const mockReadIdAction: PayloadAction<User> = {
        type: 'user/readId',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockReadIdAction);
      expect(result).toEqual({
        userLogged: {
          userName: 'Test',
          email: 'test',
          password: 'test',
          players: [],
          id: '3',
          results: '1',
        },
        allUsers: [],
        user: {},
      });
    });
  });

  describe('When the update action is called', () => {
    test('Then, if the initial state allUsers is an Array with mockUser and mockPayload, it should return the update with mockUpdateAction', () => {
      mockInitialState = {
        userLogged: {} as User,
        allUsers: [mockUser, mockPayload],
        user: {} as User,
      };

      const mockUpdateAction: PayloadAction<User> = {
        type: 'user/update',
        payload: {
          userName: 'Test',
          email: 'test',
          password: 'test',
          players: [],
          id: '3',
          results: '1',
        },
      };
      const result = userReducer(mockInitialState, mockUpdateAction);
      expect(result).toEqual({
        userLogged: {
          userName: 'Test',
          email: 'test',
          password: 'test',
          players: [],
          id: '3',
          results: '1',
        },
        allUsers: [
          mockUser,
          {
            userName: 'Test',
            email: 'test',
            password: 'test',
            players: [],
            id: '3',
            results: '1',
          },
        ],
        user: {},
      });
    });
  });
});
