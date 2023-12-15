import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <main className={style.landing}>
      <img src="../../../Vector-1ss.svg" alt="" className={style.vector} />

      <div className={style.text}>
        <h1 className={style.text__title}>DOGGYKLOPEDIA</h1>
        <p className={style.text__paragraph}>
          Aplicación web enfocada en proveer información detallada sobre las
          distintas razas de perros en el mundo!
        </p>
      </div>

      <img
        className={style.landing__img}
        src="../../../dog1.png"
        alt="perro-fondo"
      />

      <Link to={"/home"} className={style.landing__button}>
        Comencemos!
      </Link>
    </main>
  );
};
export default LandingPage;
