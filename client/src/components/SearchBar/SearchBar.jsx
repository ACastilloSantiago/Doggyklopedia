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
    <div className={style.mainContenedor}>
      {/* <h1>SearchBar</h1> */}
      <input
        type="search"
        value={raza}
        onChange={handlerInput}
        className={style.input}
      />
      <button
        className={style.slide_diagonal}
        onClick={() => {
          Search(raza);
          setRaza("");
        }}
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
