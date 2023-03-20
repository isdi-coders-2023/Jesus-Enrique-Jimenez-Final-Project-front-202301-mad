import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/users';
import { UsersRepo } from '../../services/users.repo';

export default function Login() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userLogin } = useUsers(repo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = ev.currentTarget;
    const userLog: Partial<User> = {
      userName: (formData.elements[0] as HTMLFormElement).value,
      password: (formData.elements[1] as HTMLFormElement).value,
    };

    userLogin(userLog);
    console.log(userLog);
    formData.reset();
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
