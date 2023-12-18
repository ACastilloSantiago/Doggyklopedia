import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  order,
  filter,
  reset,
  tempFilter,
  tempSeleccionados,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
const CardContainer = () => {
  const dispatch = useDispatch();
  //!ESTADOS
  const dogs = useSelector((state) => state.dogs_Show);
  const [notFoundDataBase, setNotFoundDataBase] = useState(false);
  const temperamentosSeleccionados = useSelector(
    (state) => state.temperamentosSeleccionados
  );
  const [modalType, setModalType] = useState("");
  const [openModal, setOpenModal] = useState(false);

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

  //!! HANDLERS
  const handlerDelete = (event) => {
    dispatch(
      tempSeleccionados(
        temperamentosSeleccionados.filter((temp) => temp !== event.target.id)
      )
    );
    dispatch(
      tempFilter(
        temperamentosSeleccionados.filter((temp) => temp !== event.target.id)
      )
    );
  };
  const handlerReset = () => {
    setCurrentPage(0);
    dispatch(reset());
    dispatch(tempFilter(""));
    dispatch(tempSeleccionados(""));

    setNotFoundDataBase(false);
  };
  //!
  // if (!dogs.length) {
  //   setDatabase(true);
  // }

  if (!dogsPaginado.length) {
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
        <div className={style.tempContainer}>
          {temperamentosSeleccionados &&
            temperamentosSeleccionados.map((temp, index) => {
              console.log(temp, "temperamentos");
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
