/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuOption, menuOptions } from '../app/app';
import styles from './menu.module.scss';

type MenuProps = {
  MenuOptions: MenuOption[];
};

export function Menu({ MenuOptions }: MenuProps) {
  return (
    <>
      <nav>
        <div className={styles.menu}>
          <a href="#" className={styles.burger}>
            <img
              className={styles.burgerImg}
              src="./menu-hamburguesa.png"
              alt="burger menu"
            ></img>
          </a>
        </div>
        <div className={styles.yo}>
          <ul className="menu">
            {menuOptions.map((option) => (
              <li key={option.label}>
                <a href={option.path}>{option.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      ;
    </>
  );
}
