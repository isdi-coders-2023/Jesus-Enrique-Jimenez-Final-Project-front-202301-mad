import { Link } from 'react-router-dom';
import styles from './menu.module.scss';

export type MenuOption = {
  label: string;
  path: string;
};

export const menuOptions: MenuOption[] = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
];

type MenuProps = {
  options: MenuOption[];
};

export const Menu = ({ options }: MenuProps) => {
  return (
    <>
      <div>
        <nav className={styles.menuburguer}>
          <img
            className={styles.burguerImg}
            src="./menu-hamburguesa.png"
            alt="burger menu"
          ></img>
          <div className={styles.container__flex}>
            <ul className={styles.menupaths}>
              {options.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.menu_item}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
