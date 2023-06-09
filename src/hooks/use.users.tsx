import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models/users';
import { UsersApiRepo } from '../services/users.api.repo';
import { AppDispatch, RootState } from '../store/store';
import { register, login } from '../reducer/users.slice';

export function useUsers(repo: UsersApiRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const userRegister = async (info: Partial<User>, _file?: File) => {
    try {
      const data = await repo.create(info, 'register');
      dispatch(register(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const userLogin = async (info: Partial<User>) => {
    try {
      const data = await repo.create(info, 'login');
      console.log(data);

      dispatch(login(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    users,
    userRegister,
    userLogin,
  };
}
