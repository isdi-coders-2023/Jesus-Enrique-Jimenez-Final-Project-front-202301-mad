type HeaderProps = { children: JSX.Element };

export function Header({ children }: HeaderProps) {
  return (
    <header className="header-container">
      <div className="header-logo-title">
        <a href="Access">
          <img className="header-logo" src="./logo-header.png" alt="" />
          <img
            className="header-parche"
            src="./parche_champions_14.png"
            alt=""
          />
        </a>
      </div>
      <div className="header-menu-logo">
        {children}
        <img src="./menu-hamburguesa.png" alt=""></img>
      </div>
    </header>
  );
}
