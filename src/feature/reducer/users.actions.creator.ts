import { createAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/users';
import { usersActions } from './users.actions.type';

export const readAllCreator = createAction<UserStructure[]>(
  usersActions.readAll
);
export const readOneCreator = createAction<UserStructure[]>(
  usersActions.readOne
);
export const createCreator = createAction<UserStructure>(usersActions.create);
export const updateCreator = createAction<Partial<UserStructure>>(
  usersActions.update
);
export const logUserCreator = createAction<UserStructure>(usersActions.logUser);
