import { createReducer } from '@reduxjs/toolkit';
import { UserStructure } from '../models/users';
import * as ac from './users.actions.creator';

export type State = {
  userLogged: UserStructure;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {} as UserStructure,
  users: [],
};
export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.readAllCreator, (state, { payload }) => {
    return { ...state, users: payload };
  });

  builder.addCase(ac.readOneCreator, (state, { payload }) => {
    return { ...state, users: payload };
  });

  builder.addCase(ac.createCreator, (state, { payload }) => {
    return { ...state, users: [...state.users, payload] };
  });

  builder.addCase(ac.updateCreator, (state, { payload }) => {
    const actualInfo = [...state.users];
    const newInfo = actualInfo.map((item) =>
      item.id === payload.id ? { ...item, ...payload } : item
    );
    return { ...state, users: newInfo };
  });

  builder.addCase(ac.logUserCreator, (state, { payload }) => {
    return { ...state, loggedUser: payload };
  });

  builder.addDefaultCase((state) => state);
});
