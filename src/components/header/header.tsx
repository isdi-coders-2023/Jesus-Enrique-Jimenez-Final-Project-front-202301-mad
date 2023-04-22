import styles from './header.module.scss';

type HeaderProps = { children: JSX.Element };
export function Header({ children }: HeaderProps) {
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
      <div>{children}</div>
    </header>
  );
}
