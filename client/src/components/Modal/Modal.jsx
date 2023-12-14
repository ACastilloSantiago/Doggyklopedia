import style from "./Modal.module.css";

import { order, filter, reset, tempFilter } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Modal = ({ type, openModal, closeModal }) => {
  if (!openModal) return;
  console.log("entre");

  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  const [cleanFilterTemps, setCleanFilterTemps] = useState(false);
  const [temperamentsSelecteds, setTemperamentsSelectedsFilter] = useState([]);
  //! HANDLERS
  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
    //? setCurrentPage(0);
    setCleanFilterTemps(false);
  };
  const handlerFilter = (event) => {
    dispatch(filter(event.target.value));
    //? setCurrentPage(0);
    setCleanFilterTemps(false);
    if (event.target.value === "DataBase") {
      //?   setNotFoundDataBase(true);
    }
  };
  const handlerTempFilter = (event) => {
    if (event.target.value) {
      setTemperamentsSelectedsFilter([
        ...new Set([...temperamentsSelecteds, ` ${event.target.value}`]),
      ]);
      dispatch(tempFilter(event.target.value));
      //?   setCurrentPage(0);
      setCleanFilterTemps(false);
      //?   setNotFoundDataBase(true);
    }
  };
  const handlerDelete = (event) => {
    setTemperamentsSelectedsFilter(
      temperamentsSelecteds.filter((temp) => temp !== event.target.id)
    );
    dispatch(
      tempFilter(
        temperamentsSelecteds.filter((temp) => temp !== event.target.id)
      )
    );
    setCleanFilterTemps(true);
  };
  const handlerReset = () => {
    //? setCurrentPage(0);
    dispatch(reset());
    setCleanFilterTemps(true);
    dispatch(tempFilter(""));
    setTemperamentsSelectedsFilter([]);
    //? setNotFoundDataBase(false);
  };

  if (type === "order") {
    return (
      <article>
        <button
          onClick={handlerOrder}
          value="RazaA"
          className={style.slide_diagonal}
        >
          Raza Asc.
        </button>
        <button
          onClick={handlerOrder}
          value="RazaB"
          className={style.slide_diagonal}
        >
          Raza Des.
        </button>
        <button
          onClick={handlerOrder}
          value="PesoB"
          className={style.slide_diagonal}
        >
          Peso Des.
        </button>
        <button
          onClick={handlerOrder}
          value="PesoA"
          className={style.slide_diagonal}
        >
          Peso Asc.
        </button>
        <button onClick={closeModal} className={style.slide_diagonal}>
          x
        </button>
      </article>
    );
  }
  if (type === "filter") {
    return (
      <article>
        <button
          onClick={handlerFilter}
          value="Api"
          className={style.slide_diagonal}
        >
          Api
        </button>
        <button
          onClick={handlerFilter}
          value="DataBase"
          className={style.slide_diagonal}
        >
          Base de datos
        </button>
        <select
          className={style.slide_diagonal}
          name="Filtrado De Temperamentos"
          onChange={handlerTempFilter}
        >
          <option selected={cleanFilterTemps}>Filtrado de Temperamentos</option>
          {temps.map((temp, index) => {
            return (
              <option value={temp.name} key={index}>
                {temp.name}
              </option>
            );
          })}
        </select>
        <div className={style.tempContainer}>
          {temperamentsSelecteds &&
            temperamentsSelecteds.map((temp, index) => {
              return (
                <div key={index} className={style.tempSelected}>
                  <span>{temp}</span>
                  <button type="button" id={temp} onClick={handlerDelete}>
                    x
                  </button>
                </div>
              );
            })}
        </div>
        e//! Botton reset
        <section className={style.filtro}>
          <button onClick={closeModal} className={style.slide_diagonal}>
            x
          </button>
          {/* <button onClick={handlerReset} className={style.slide_diagonal}>
            Reset
          </button> */}
        </section>
      </article>
    );
  }
};

export default Modal;
