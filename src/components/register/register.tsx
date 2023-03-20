import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/users';
import { UsersRepo } from '../../services/users.repo';

export default function Register() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userRegister } = useUsers(repo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formUser = ev.currentTarget;

    const registerForm: Partial<User> = {
      email: (formUser.elements[0] as HTMLFormElement).value,
      userName: (formUser.elements[1] as HTMLFormElement).value,
      password: (formUser.elements[2] as HTMLFormElement).value,
    };

    userRegister(registerForm);
  };
  return (
    <section className="container-register">
      <div className="form">
        <form className="register" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Username
            <input type="text" name="userName" required />
          </label>

          <label>
            Password
            <input type="password" name="password" required />
          </label>

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
