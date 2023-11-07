import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { order, filter, reset, tempFilter } from "../../redux/actions";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
const CardContainer = () => {
  const dispatch = useDispatch();
  //!ESTADOS
  const temps = useSelector((state) => state.temps);
  const dogs = useSelector((state) => state.dogs_Show);
  const [notFoundDataBase, setNotFoundDataBase] = useState(false);
  const [cleanFilterTemps, setCleanFilterTemps] = useState(false);
  const [temperamentsSelecteds, setTemperamentsSelectedsFilter] = useState([]);
  // !PAGINADO
  const [currentPage, setCurrentPage] = useState(0);
  const DOGS_FOR_PAGE = 8;
  const [dogsPaginado, setDogsPaginado] = useState(
    [...dogs].splice(0, DOGS_FOR_PAGE)
  );
  const nextHandler = () => {
    const dogsIndex = dogs.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * DOGS_FOR_PAGE;
    if (firstIndex >= dogsIndex) return;
    setDogsPaginado([...dogs].splice(firstIndex, DOGS_FOR_PAGE));
    setCurrentPage(nextPage);
  };
  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * DOGS_FOR_PAGE;
    setDogsPaginado([...dogs].splice(firstIndex, DOGS_FOR_PAGE));
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    setDogsPaginado([...dogs].splice(0, DOGS_FOR_PAGE));
  }, [dogs]);
  // console.log(dogs, dogsPaginado);
  //! HANDLERS
  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
    setCurrentPage(0);
    setCleanFilterTemps(false);
  };
  const handlerFilter = (event) => {
    // console.log("sera?", event.target.value);
    dispatch(filter(event.target.value));
    setCurrentPage(0);
    setCleanFilterTemps(false);
    if (event.target.value === "DataBase") {
      setNotFoundDataBase(true);
    }
  };
  const handlerTempFilter = (event) => {
    if (event.target.value) {
      setTemperamentsSelectedsFilter([
        ...new Set([...temperamentsSelecteds, ` ${event.target.value}`]),
      ]);

      // setFilterFilter([...Filter, `${event.target.value}, `].join(""));
      // console.log("test", [...new Set([...Filter, ` ${event.target.value}`])]);
      dispatch(tempFilter(event.target.value));
      setCurrentPage(0);
      setCleanFilterTemps(false);
      setNotFoundDataBase(true);
    }
  };
  const handlerDelete = (event) => {
    setTemperamentsSelectedsFilter(
      temperamentsSelecteds.filter((temp) => temp !== event.target.id)
    );
    // console.log(temp.filter((temp) => temp !== event.target.id));
    dispatch(
      tempFilter(
        temperamentsSelecteds.filter((temp) => temp !== event.target.id)
      )
    );
    setCleanFilterTemps(true);
  };
  const handlerReset = () => {
    setCurrentPage(0);
    dispatch(reset());
    setCleanFilterTemps(true);
    dispatch(tempFilter(""));
    setTemperamentsSelectedsFilter([]);
    setNotFoundDataBase(false);
  };
  //!
  // if (!dogs.length) {
  //   setDatabase(true);
  // }

  if (!dogsPaginado.length) {
    // console.log("database if", database);
    if (notFoundDataBase) {
      return (
        <div className={style.notFoundDataBase}>
          <h1>No hay perros disponibles!</h1>
          <img
            src="https://golfwithoutlimits.com/images_home/404_page_not_found_dog.jpg"
            alt=""
          />
          <button onClick={handlerReset} className={style.slide_diagonal}>
            Back
          </button>
          <br />
          {/* {alert("No hay perros!")} */}
        </div>
      );
    } else {
      return (
        <div>
          {/* <button onClick={handlerReset} className={style.slide_diagonal}>
            Reset
          </button> */}
          <Loading />
        </div>
      );
    }
  } else {
    return (
      <div className={style.mainContainer}>
        <div className={style.filtro}>
          <div>
            {/* <h5>Origen</h5> */}
            <label>Ordenamiento/Filtrado </label>
            {/* <select name="Filtrado" onChange={handlerFilter}>
            <option value="" className={style} 
              Origen
            </option>
            </select> */}

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
            <button
              onClick={handlerFilter}
              value="Api"
              className={style.slide_diagonal}
            >
              Api
            </button>
            {/* <br /> */}
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
              // multiple
            >
              <option selected={cleanFilterTemps}>
                Filtrado de Temperamentos
              </option>
              {/* <optgroup label="Temperamentos"> */}
              {temps.map((temp, index) => {
                // console.log(temp);
                return (
                  <option value={temp.name} key={index}>
                    {temp.name}
                  </option>
                );
              })}
              {/* </optgroup> */}
            </select>
            <div className={style.tempContainer}>
              {temperamentsSelecteds &&
                temperamentsSelecteds.map((temp, index) => {
                  // console.log("prueba", temp);
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
            <button onClick={handlerReset} className={style.slide_diagonal}>
              Reset
            </button>
          </div>
        </div>
        <div className={style.Cards}>
          {dogsPaginado.map((dog) => {
            // console.log("holas", dog);
            return (
              <div key={dog.id}>
                <Card
                  name={dog.name}
                  life_span={dog.life_span}
                  weight={dog.weight}
                  temperament={dog.temperaments}
                  id={dog.id}
                  image={dog.image}
                />
              </div>
            );
          })}
        </div>
        <div className={style.paginado}>
          <button onClick={prevHandler} className={style.slide_diagonal}>
            Prev
          </button>
          <p>{currentPage}</p>
          <button onClick={nextHandler} className={style.slide_diagonal}>
            Next
          </button>
        </div>
      </div>
    );
  }
};

export default CardContainer;
