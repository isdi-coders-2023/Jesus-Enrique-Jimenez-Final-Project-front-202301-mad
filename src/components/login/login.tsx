import { SyntheticEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/users';
import { UsersApiRepo } from '../../services/users.api.repo';
import styles from './login.module.scss';

export default function Login() {
  const navigate = useNavigate();

  const UserRepo = useMemo(() => new UsersApiRepo(), []);

  const { userLogin, users } = useUsers(UserRepo);
  const userLogged = users.userLogged;

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formLoginUser = ev.currentTarget;

    const logUser: Partial<User> = {
      userName: (formLoginUser.elements[0] as HTMLFormElement).value,
      password: (formLoginUser.elements[1] as HTMLFormElement).value,
    };

    userLogin(logUser);

    formLoginUser.reset();
    console.log(userLogged);
    if (userLogged) {
      navigate('/home');
    }
  };
  return (
    <div className={styles.login}>
      <form className={styles.input} onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="userName" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <div className={styles.login}>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
