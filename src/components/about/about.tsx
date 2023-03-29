import styles from './about.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <section className={styles.about}>
      <div className="main__title">
        <h2>About us</h2>
      </div>

      <div className={'about'}>
        <h3 className="about__title">NUESTRO PALMARES</h3>
        <p className="about__titletext">
          * TROFEO FIFA AL MEJOR CLUB DEL SIGLO XX * 14 COPAS DE EUROPA * 5
          SUPERCOPAS DE EUROPA * 8 MUNDIALES DE CLUBES * 35 LIGAS * 19 COPAS DEL
          REY * 12 SUPERCOPAS DE ESPAÑA
        </p>
      </div>

      <div>
        <h3 className="about__title">PROPOSITO</h3>
        <p className="about__titletext">
          Mejorar vidas utilizando el deporte para educar en valores, integrar y
          contribuir al desarrollo de la sociedad.
        </p>
      </div>

      <div>
        <h3 className="about__title">MISION</h3>
        <p className="about__titletext">
          Expresar mediante su acción social, el compromiso solidario del Real
          Madrid; preservar y conservar el patrimonio histórico del club;
          fomentar los valores inherentes al deporte como su principal activo,
          para favorecer la educación integral de la infancia y la juventud, así
          como la inclusión social de los más vulnerables.
        </p>
      </div>

      <div>
        <h3 className="about__title">VISION</h3>
        <p className="about__titletext">
          Ser un referente universal en el uso del deporte como herramienta
          educativa y de integración social.
        </p>
      </div>
    </section>
  );
}
