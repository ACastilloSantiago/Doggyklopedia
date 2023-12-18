import style from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { cleanError, getDogs, getDogsByRaza } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { UseSelector } from "react-redux";
const SearchBar = () => {
  const dispatch = useDispatch();
  const erR = useSelector((state) => state.error);
  const [raza, setRaza] = useState("");
  const handlerInput = (event) => {
    setRaza(event.target.value);
  };
  const Search = (raza) => {
    dispatch(getDogsByRaza(raza));
  };
  useEffect(() => {
    if (raza) {
      dispatch(getDogsByRaza(raza));
    } else {
      // dispatch(getDogs());
    }
  }, [raza]);
  // console.log(raza);
  // console.log("error", erR);
  if (erR) {
    // setRaza("");
    alert("No existe la raza que esta buscando!");
    dispatch(cleanError());
  }
  return (
    <article className={style.searhBar}>
      <input
        type="search"
        value={raza}
        onChange={handlerInput}
        className={style.searhBar__input}
      />
      {/* <button
        className={style.searhBar__button}
        onClick={() => {
          Search(raza);
          setRaza("");
        }}
      >
        Search
      </button> */}
    </article>
  );
};
export default SearchBar;
