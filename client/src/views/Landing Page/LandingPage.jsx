import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <main className={style.landing}>
      <div className={style.vector}>
        {/* <img
          src="../../../vector-landing-2.svg"
          alt=""
          className={style.vector}
        /> */}
      </div>

      <header className={style.text}>
        <h1 className={style.text__title}>DOGGYKLOPEDIA</h1>
        <p className={style.text__paragraph}>
          Aplicación web enfocada en proveer información detallada sobre las
          distintas razas de perros en el mundo!
        </p>
      </header>

      <img
        className={style.landing__img}
        src="../../../dog-landing.png"
        alt="perro-fondo"
      />
      <Link to={"/home"} className={style.landing__button}>
        Comencemos!
      </Link>
    </main>
  );
};
export default LandingPage;
