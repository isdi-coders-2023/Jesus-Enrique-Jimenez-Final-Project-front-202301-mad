import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/users';
import { UsersApiRepo } from '../../services/users.api.repo';
import styles from './register.module.scss';

export default function Register() {
  const UsersRepo = useMemo(() => new UsersApiRepo(), []);

  const { userRegister } = useUsers(UsersRepo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formLoginUser = ev.currentTarget;

    const registerForm: Partial<User> = {
      email: (formLoginUser.elements[0] as HTMLFormElement).value,
      userName: (formLoginUser.elements[1] as HTMLFormElement).value,
      password: (formLoginUser.elements[2] as HTMLFormElement).value,
    };

    userRegister(registerForm);
  };
  return (
    <section className={styles.register}>
      <div>
        <form className={styles.input} onSubmit={handleSubmit}>
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
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
