import { useState } from 'react';
import Login from '../login/login';
import Register from '../register/register';
import styles from './access.module.scss';

export function Access() {
  const [toChange, setIsChanged] = useState<boolean | null>(null);

  const handleChange = (boolean: boolean) => {
    setIsChanged(boolean);
    if (boolean === toChange) {
      setIsChanged(null);
    } else {
      setIsChanged(boolean);
    }
  };

  return (
    <>
      <div className={styles.access}>
        <h2 className={styles.access__h2}>¡Bienvenidos Madridistas!</h2>
        <p className={styles.access__p}>Registrate o inicia sesión</p>

        <div className={styles.access__buttons}>
          <button
            className={styles.access__login}
            onClick={() => handleChange(true)}
          >
            Login
          </button>
          <button
            className={styles.access__register}
            onClick={() => handleChange(false)}
          >
            Register
          </button>
        </div>
        {toChange === true && <Login />}
        {toChange === false && <Register />}
      </div>
    </>
  );
}

export default Access;
