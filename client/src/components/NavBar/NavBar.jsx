import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation().pathname;

  return (
    <nav className={style.nav}>
      <div className={style.nav__icon}>
        <Link to={"/"}>
          <img
            className={style.nav__icon_landing}
            src="../../../icon-brown-removebg-preview.png"
            alt="landing-icon"
          />
        </Link>
      </div>

      {!location.includes("/home") && (
        <div className={style.nav__icon}>
          <Link to="/home" className={style.nav__link}>
            Inicio
          </Link>
        </div>
      )}

      {!location.includes("/detail") && !location.includes("/creator") && (
        <SearchBar />
      )}

      {!location.includes("/creator") && (
        <div className={style.nav__icon}>
          <Link to="/creator" className={style.nav__link}>
            Agregar
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
