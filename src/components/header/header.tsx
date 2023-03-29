import { Menu } from '../menu/menu';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="home">
        <img
          src="./logo-header.png"
          alt="logo-title"
          className={styles.header__logo}
        ></img>
      </a>
      <img
        src="./parche_champions_14.png"
        alt="logo-title2"
        className={styles.header__logo2}
      ></img>
      <Menu MenuOptions={[]}></Menu>
    </header>
  );
}
