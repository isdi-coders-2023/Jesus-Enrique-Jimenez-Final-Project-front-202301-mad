import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { UsersRepo } from '../services/repository/users.api.repo';
import * as ac from '../reducer/users.actions.creator';
import { UserStructure } from '../models/users';
import { useEffect } from 'react';

export function useUsers(repo: UsersRepo) {
  const users = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const readAllUsers = async () => {
      try {
        console.log(users.userLogged.token);
        if (!users.userLogged.token) throw new Error('Not authorized');

        const infoUsers = await repo.readAll(users.userLogged.token);

        dispatch(ac.readAllCreator(infoUsers.results));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    readAllUsers();
  }, [dispatch, repo, users.userLogged.token]);

  const readUser = async (id: string) => {
    try {
      if (!users.userLogged.token) throw new Error('Not authorized');

      const infoUser = await repo.readOne(id, users.userLogged.token);

      dispatch(ac.readOneCreator(infoUser.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const createUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'register');

      dispatch(ac.createCreator(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateUser = async (
    userInfo: Partial<UserStructure>,
    action: string
  ) => {
    try {
      if (!users.userLogged.token) throw new Error('Not authorized');

      const infoUser = await repo.update(
        userInfo,
        action,
        users.userLogged.token
      );

      dispatch(ac.updateCreator(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loginUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'login');
      console.log(infoUser);
      dispatch(ac.logUserCreator(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    users,
    readUser,
    createUser,
    updateUser,
    loginUser,
  };
}
