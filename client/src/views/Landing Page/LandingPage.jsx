import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className={style.landing}>
      {/* <h1>Bienvenidos al WebSite de Dogs!</h1> */}
      <div className={style.land}>
        <h1>WELCOME TO DOGS PAGE!</h1>
        <div className={style.dog}>
          <img className={style.imgd} src="../../../dog1.png" alt="" />

          <Link to={"/home"}>
            <img className={style.logoHome} src="../../../home.png" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
{
  // ../../../stock-vector-dog-house-icon.png
}
