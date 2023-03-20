import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/users';
import { UsersRepo } from '../../services/users.repo';

export default function Login() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userLogin } = useUsers(repo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formUser = ev.currentTarget;

    const loginForm: Partial<User> = {
      userName: (formUser[0] as HTMLFormElement).value,
      password: (formUser[1] as HTMLFormElement).value,
    };

    userLogin(loginForm);
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
