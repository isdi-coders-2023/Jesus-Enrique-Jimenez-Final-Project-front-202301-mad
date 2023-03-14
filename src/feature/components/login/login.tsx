import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/users';
import { UsersRepo } from '../../services/repository/users.api.repo';

export default function Login() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { loginUser } = useUsers(repo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formLoginUser = ev.currentTarget;

    const logUser: Partial<UserStructure> = {
      userName: (formLoginUser[0] as HTMLFormElement).value,
      password: (formLoginUser[1] as HTMLFormElement).value,
    };

    console.log(logUser);

    loginUser(logUser);

    formLoginUser.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="userName" required />
      </label>

      <label>
        Password
        <input type="password" name="password" required />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}
