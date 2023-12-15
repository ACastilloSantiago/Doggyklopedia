import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { order, filter, reset, tempFilter } from "../../redux/actions";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
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
  const [modalType, setModalType] = useState("");
  const [openModal, setOpenModal] = useState(false);
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
        </div>
      );
    } else {
      return (
        <div>
          {/* <button onClick={handlerReset} className={style.slide_diagonal}>
            ResetT
          </button> */}
          <Loading />
        </div>
      );
    }
  } else {
    return (
      <main className={style.container}>
        <section className={style.buttons}>
          <button
            onClick={() => {
              setOpenModal(true);

              setModalType("filter");
            }}
            className={style.button}
          >
            Filtrados
          </button>
          <button
            onClick={() => {
              setOpenModal(true);

              setModalType("order");
            }}
            className={style.button}
          >
            Ordenamientos
          </button>
          <button onClick={handlerReset} className={style.button}>
            Reset
          </button>
        </section>
        <Modal
          openModal={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          type={modalType}
        />

        <section className={style.cards}>
          {dogsPaginado.map((dog) => {
            return (
              <>
                <Card
                  name={dog.name}
                  life_span={dog.life_span}
                  weight={dog.weight}
                  temperament={dog.temperaments}
                  id={dog.id}
                  image={dog.image}
                />
              </>
            );
          })}
        </section>
      </main>
    );
  }
};

export default CardContainer;
