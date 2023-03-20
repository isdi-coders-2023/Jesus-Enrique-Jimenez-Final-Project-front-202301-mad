import { useState } from 'react';
import Login from '../login/login';
import Register from '../register/register';

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
      <div className="container">
        <h2 className="h2">¡Bienvenidos Madridistas!</h2>
        <p className="p">Registrate o inicia sesión</p>

        <div className="buttons">
          <button className="login" onClick={() => handleChange(true)}>
            Login
          </button>
          <button className="register" onClick={() => handleChange(false)}>
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
