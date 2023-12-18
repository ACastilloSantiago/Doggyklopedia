import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation().pathname;

  return (
    <nav className={style.nav}>
      <Link to={"/"}>
        <img
          className={style.nav__icon_landing}
          src="../../../icon-lightgreen-removebg-preview.png"
          alt=""
        />
      </Link>
      {!location.includes("/home") && (
        <Link to="/home" className={style.nav__link}>
          Inicio
        </Link>
      )}

      {!location.includes("/detail") && !location.includes("/creator") && (
        <SearchBar />
      )}

      {!location.includes("/creator") && (
        <Link to="/creator" className={style.nav__link}>
          {/* <img

            className={style.nav__icon_newdog}
            src="../../../public/agregar-removebg-preview.png"
            alt=""
          /> */}
          Agregar
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
