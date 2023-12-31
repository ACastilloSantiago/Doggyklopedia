import style from "./Modal.module.css";

import {
  order,
  filter,
  reset,
  tempFilter,
  tempSeleccionados,
  page,
  notFound,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Modal = ({ type, openModal, closeModal }) => {
  if (!openModal) return;
  console.log("entre");

  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  const notFoundDataBase = useSelector((state) => state.notFoundDataBase);

  const [cleanFilterTemps, setCleanFilterTemps] = useState(false);
  const temperamentosSeleccionados = useSelector(
    (state) => state.temperamentosSeleccionados
  );

  //! HANDLERS
  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
    dispatch(page(0));

    //? setCurrentPage(0);
    setCleanFilterTemps(false);
  };
  const handlerFilter = (event) => {
    dispatch(filter(event.target.value));
    dispatch(page(0));

    //? setCurrentPage(0);
    setCleanFilterTemps(false);
    if (event.target.value === "DataBase") {
      //?   setNotFoundDataBase(true);
      dispatch(notFound(true));
    }
  };
  const handlerTempFilter = (event) => {
    if (event.target.value) {
      dispatch(tempFilter(event.target.value));
      dispatch(
        tempSeleccionados([
          ...new Set([...temperamentosSeleccionados, ` ${event.target.value}`]),
        ])
      );
      dispatch(page(0));

      //?   setCurrentPage(0);
      setCleanFilterTemps(false);
      //?   setNotFoundDataBase(true);
      dispatch(notFound(true));
    }
  };
  const handlerDelete = (event) => {
    dispatch(
      tempFilter(
        temperamentosSeleccionados.filter((temp) => temp !== event.target.id)
      )
    );
    dispatch(
      tempSeleccionados(
        temperamentosSeleccionados.filter((temp) => temp !== event.target.id)
      )
    );
    setCleanFilterTemps(true);
  };

  if (type === "order") {
    return (
      <article className={style.modal}>
        <div className={style.modal_width}>
          <h2 className={style.modal__title}>Ordenamientos</h2>

          <button
            onClick={handlerOrder}
            value="RazaA"
            className={style.modal__button}
          >
            Raza A/Z.
          </button>
          <button
            onClick={handlerOrder}
            value="RazaB"
            className={style.modal__button}
          >
            Raza Z/A.
          </button>
          <button
            onClick={handlerOrder}
            value="PesoA"
            className={style.modal__button}
          >
            Peso -/+.
          </button>
          <button
            onClick={handlerOrder}
            value="PesoB"
            className={style.modal__button}
          >
            Peso +/-.
          </button>
          {/* <div className={style.exit}> */}
          <button onClick={closeModal} className={style.exit__button}>
            Aplicar ordenaminetos
          </button>
          {/* </div> */}
        </div>
      </article>
    );
  }
  if (type === "filter") {
    return (
      <article className={style.modal}>
        <div className={style.modal_width}>
          <h2 className={style.modal__title}>Filtrados</h2>
          <select
            className={style.modal__button}
            name="Filtrado De Temperamentos"
            onChange={handlerTempFilter}
          >
            <option selected={cleanFilterTemps}>
              Filtrado de Temperamentos
            </option>
            {temps.map((temp, index) => {
              return (
                <option value={temp.name} key={index}>
                  {temp.name}
                </option>
              );
            })}
          </select>
          {/* //!! Temperamentos seleccionados en filtros */}
          <div className={style.filters}>
            {temperamentosSeleccionados &&
              temperamentosSeleccionados.map((temp, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    id={temp}
                    onClick={handlerDelete}
                    className={style.filter__button}
                  >
                    {temp}
                  </button>
                );
              })}
          </div>
          <button
            onClick={handlerFilter}
            value="DataBase"
            className={style.modal__button}
          >
            Base de datos
          </button>
          <button
            onClick={handlerFilter}
            value="Api"
            className={style.modal__button}
          >
            Api
          </button>
          <div className={style.exit}>
            <button onClick={closeModal} className={style.exit__button}>
              Aplicar filtros
            </button>
          </div>
        </div>
      </article>
    );
  }
};

export default Modal;
