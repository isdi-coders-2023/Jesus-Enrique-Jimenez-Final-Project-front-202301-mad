import { Link } from 'react-router-dom';
import style from './error.page.style.module.scss';

export default function ErrorPage() {
  return (
    <section className={style.errorPage}>
      <div className={style.errorPageTitle}>
        <p className={style.errorPageTitleCode}></p>
        <p className={style.errorPageTitleMessage}>Page not found</p>
      </div>
      <img src="./error.png" alt="player"></img>

      <Link to="./home"></Link>
    </section>
  );
}
