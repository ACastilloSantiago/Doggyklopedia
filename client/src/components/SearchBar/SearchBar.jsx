import style from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { cleanError, getDogs, getDogsByRaza, reset } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { UseSelector } from "react-redux";
const SearchBar = () => {
  const dispatch = useDispatch();
  const erR = useSelector((state) => state.error);
  const [raza, setRaza] = useState("");
  const handlerInput = (event) => {
    console.log("input", event.target.value);
    // if (!event.target.value) dispatch(reset());
    setRaza(event.target.value);
  };
  // const Search = (raza) => {
  //   dispatch(getDogsByRaza(raza));
  // };
  useEffect(() => {
    // console.log("raza", raza);
    // if (raza) {
    dispatch(getDogsByRaza(raza));
    // } else {
    //   // console.log("borrado");
    //   dispatch(getDogs());
    // }
  }, [raza]);

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
