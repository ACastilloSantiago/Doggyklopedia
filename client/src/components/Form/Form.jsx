import style from "./Form.module.css";
import { useState } from "react";
// const validate = require("../../validation/validate");
import { useDispatch, useSelector } from "react-redux";
import { cleanError, postDog } from "../../redux/actions";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Form = () => {
  //!!ESTADOS
  const temps = useSelector((state) => state.temps);
  const errR = useSelector((state) => state.error);
  const [selectedTemps, setSelectedTemps] = useState([]);
  //? Estado que envio
  const [dog, setDog] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temps: "",
    image: "",
  });
  //? Pre estado diferenciando max y min
  const [preDog, setPreDog] = useState({
    height_min: "",
    height_max: "",
    weight_max: "",
    weight_min: "",
  });
  const dispatch = useDispatch();
  //!!
  const history = useNavigate();
  const [error, setError] = useState({
    name: "Este parametro no puede estar vacio!",
    height_min: "Este parametro no puede estar vacio!",
    height_max: "Este parametro no puede estar vacio!",
    weight_max: "Este parametro no puede estar vacio!",
    weight_min: "Este parametro no puede estar vacio!",
    life_span: "Este parametro no puede estar vacio!",
    temps: "Este parametro no puede estar vacio!",
    image: "Este parametro no puede estar vacio!",
  });
  //!!Validaciones
  const validate = (data, name) => {
    // console.log("validate", data);
    // console.log("name", name);

    //!NAME
    if (name === "name") {
      if (data.name) {
        setError({ ...error, name: "" });
      }
      if (/[0-9]/.test(data.name)) {
        setError({ ...error, name: "No puede ingresar numeros!" });
      }
      if (!/^\S/.test(data.name)) {
        setError({ ...error, name: "No puede comenzar con espacios vacios!" });
      }
      if (data.name.length > 35) {
        setError({ ...error, name: "La longitud maxima es 35!" });
      }
      if (!data.name) {
        setError({ ...error, name: "Este parametro no puede estar vacio! " });
      }
    }

    // //!Años de vida
    if (name === "life_span") {
      if (data.life_span) {
        setError({ ...error, [name]: "" });
      }
      if (!/^\d{2} - \d{2}$/.test(data.life_span)) {
        setError({ ...error, [name]: "Siga el ejemplo => 05 - 10!" });
      }
      if (/[A-z]/.test(data.life_span)) {
        setError({ ...error, [name]: "No puede ingresar letras!" });
      }
      if (data.life_span.length > 7) {
        setError({ ...error, [name]: "La longitud maxima es 8!" });
      }
      if (!/\S/.test(data.life_span)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (!data.life_span) {
        setError({ ...error, [name]: "Este parametro no puede estar vacio!" });
      }
    }
    //!!!
    // //!Altura Max
    if (name === "height_max") {
      if (data.height_max) {
        setError({
          ...error,
          [name]: "",
        });
      }

      if (
        data.height_max &&
        data.height_min &&
        +data.height_max < +data.height_min
      ) {
        setError({
          ...error,
          height_max: "La altura maxima no puede ser mas chica que la minima!",
          height_min: "No puede ser mas grande que la maxima!",
        });
      } else {
        setError({
          ...error,
          height_max: "",
          height_min: "",
        });
      }
      if (isNaN(data.height_max)) {
        // console.log(data.height_max);
        setError({ ...error, [name]: "No puede ingresar letras!" });
      }
      if (/\s/.test(data.height_max)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (data.height_max.length > 3) {
        setError({ ...error, [name]: "La longitud maxima es 3!" });
      }
      if (!data.height_max) {
        setError({
          ...error,
          [name]: "Este parametro no puede estar vacio!",
        });
      }
    }
    // //!Altura Min
    if (name === "height_min") {
      if (data.height_min) {
        setError({
          ...error,
          [name]: "",
        });
      }
      if (
        data.height_min &&
        data.height_max &&
        +data.height_max < +data.height_min
      ) {
        setError({
          ...error,
          height_max: "La altura maxima no puede ser mas chica que la minima!",
          height_min: "No puede ser mas grande que la maxima!",
        });
      } else {
        setError({
          ...error,
          height_max: "",
          height_min: "",
        });
      }
      if (isNaN(data.height_min)) {
        // console.log(data.height_min);
        setError({ ...error, [name]: "No puede ingresar letras!" });
      }
      if (/\s/.test(data.height_min)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (data.height_min.length > 3) {
        setError({ ...error, [name]: "La longitud minima es 3!" });
      }
      if (!data.height_min) {
        setError({
          ...error,
          [name]: "Este parametro no puede estar vacio!",
        });
      }
    }
    // //!peso Maxx
    if (name === "weight_max") {
      if (data.weight_max) {
        setError({
          ...error,
          [name]: "",
        });
      }
      if (
        data.weight_max &&
        data.weight_min &&
        +data.weight_max < +data.weight_min
      ) {
        setError({
          ...error,
          weight_max: "El peso maximo no puede ser mas chico que el minimo!",
          weight_min: "No puede ser mas grande que el maximo!",
        });
      } else {
        setError({
          ...error,
          weight_max: "",
          weight_min: "",
        });
      }

      if (isNaN(data.weight_max)) {
        setError({ ...error, [name]: "No puede ingresar letras!" });
      }

      if (/\s/.test(data.weight_max)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (data.weight_max.length > 3) {
        setError({ ...error, [name]: "La longitud maxima es 3!" });
      }

      if (!data.weight_max) {
        setError({
          ...error,
          [name]: "Este parametro no puede estar vacio!",
        });
      }
    }

    // //!peso Min
    if (name === "weight_min") {
      if (data.weight_min) {
        console.log("entre");
        setError({
          ...error,
          [name]: "",
        });
      }
      if (
        data.weight_min &&
        data.weight_max &&
        +data.weight_max < +data.weight_min
      ) {
        setError({
          ...error,
          weight_max: "El peso maximo no puede ser mas chico que el minimo!",
          weight_min: "No puede ser mas grande que el maximo!",
        });
      } else {
        setError({
          ...error,
          weight_max: "",
          weight_min: "",
        });
      }
      if (isNaN(data.weight_min)) {
        setError({ ...error, [name]: "No puede ingresar letras!" });
      }

      if (/\s/.test(data.weight_min)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (data.weight_min.length > 3) {
        setError({ ...error, [name]: "La longitud minima es 3!" });
      }

      if (!data.weight_min) {
        setError({
          ...error,
          [name]: "Este parametro no puede estar vaci!",
        });
      }
    }

    // //!url
    if (name === "image") {
      if (
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g.test(
          data.image
        )
      ) {
        setError({ ...error, [name]: "" });
      }
      if (
        !/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g.test(
          data.image
        )
      ) {
        setError({ ...error, [name]: "No es una url admitida" });
      }
      if (/\s/.test(data.image)) {
        setError({
          ...error,
          [name]: "No puede contener espacios vacios!",
        });
      }
      if (!data.image) {
        setError({ ...error, [name]: "Este parametro no puede estar vacio!" });
      }
    }
    //!temps
    if (name === "temps") {
      if (data.length) {
        setError({ ...error, temps: "" });
      }

      if (!data.length) {
        setError({ ...error, temps: "Este parametro no puede estar vacio!" });
      }
    }
  };

  //! HANDLRES
  const handlerDog = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setDog({ ...dog, [name]: value });
    validate({ ...dog, [name]: value }, name);
  };

  const handlerPreDog = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setPreDog({ ...preDog, [name]: value });
    validate({ ...preDog, [name]: value }, name);
  };
  const handlerTemps = (event) => {
    setSelectedTemps([...new Set([...selectedTemps, event.target.value])]);
    validate([...new Set([...selectedTemps, event.target.value])], "temps");
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    const dogg = {
      height:
        preDog.height_min && preDog.height_max
          ? `${preDog.height_min} - ${preDog.height_max}`
          : "",
      weight:
        preDog.weight_min && preDog.weight_max
          ? `${preDog.weight_min} - ${preDog.weight_max}`
          : "",
    };
    setDog({
      ...dog,
      height: dogg.height,
      weight: dogg.weight,
      temps: selectedTemps.join(", "),
    });

    dog &&
      dispatch(
        postDog({
          ...dog,
          height: dogg.height,
          weight: dogg.weight,
          temps: selectedTemps.join(", "),
        })
      );
    // console.log("error", errR);
    // if (errR === "Creado con exito!") {
    //   setTimeout(() => {
    //     console.log("paso el segundo");
    //   }, 1000);
    // }
  };

  const handlerDelete = (event) => {
    setSelectedTemps(selectedTemps.filter((temp) => temp !== event.target.id));
    validate(
      selectedTemps.filter((temp) => temp !== event.target.id),
      "temps"
    );
  };
  const disbleSend = () => {
    let send = true;
    for (let err in error) {
      if (error[err] === "") {
        send = false;
      } else {
        send = true;
        break;
      }
    }
    return send;
  };
  if (errR) {
    console.log(2, errR);
    errR === "Creado con exito!"
      ? setTimeout(() => {
          // alert(errR);
          history("/home");
          dispatch(cleanError());
        }, 1000)
      : alert(errR);
    dispatch(cleanError());
  }
  return (
    <div className={style.mainContenedor}>
      <h1>Añadí una raza!</h1>

      <form onSubmit={handlerSubmit} className={style.form}>
        <div className={style.divForm}>
          <label htmlFor="">Nombre</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Nombre"
            name="name"
            value={dog.name}
            onChange={handlerDog}
          />

          {error.name && <span>{error.name}</span>}

          <label htmlFor="">Años de vida</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="05 - 10"
            name="life_span"
            value={dog.life_span}
            onChange={handlerDog}
          />

          {error.life_span && <span>{error.life_span}</span>}

          <label htmlFor="">Altura Max</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="30"
            name="height_max"
            onChange={handlerPreDog}
            value={preDog.height_max}
          />

          {error.height_max && <span>{error.height_max}</span>}

          <label htmlFor="">Altura Min</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="10"
            name="height_min"
            onChange={handlerPreDog}
            value={preDog.height_min}
          />

          {error.height_min && <span>{error.height_min}</span>}

          <label htmlFor="">Peso Max</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="6"
            name="weight_max"
            value={preDog.weight_max}
            onChange={handlerPreDog}
          />

          {error.weight_max && <span>{error.weight_max}</span>}

          <label htmlFor="">Peso Min</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="2"
            name="weight_min"
            value={preDog.weight_min}
            onChange={handlerPreDog}
          />

          {error.weight_min && <span>{error.weight_min}</span>}

          <label htmlFor="">URL de la Imagen</label>
          <input
            autoComplete="off"
            type="text"
            placeholder="img.com"
            name="image"
            value={dog.image}
            onChange={handlerDog}
          />

          {error.image && <span>{error.image}</span>}

          <label htmlFor="">Seleccione temperamentos</label>

          <select onChange={handlerTemps}>
            <option value="" selected disabled>
              Temperamentos
            </option>
            {temps.map((temp) => {
              return (
                <option value={temp.name} key={temp.id}>
                  {temp.name}
                </option>
              );
            })}
          </select>

          <div className={style.tempsContainer}>
            {selectedTemps &&
              selectedTemps.map((temp, index) => (
                // {temp&& }
                <div key={index} className={style.temp}>
                  {/* <span className={style.sp}>{temp}</span> */}
                  <button type="button" id={temp} onClick={handlerDelete}>
                    {temp}
                  </button>
                </div>
              ))}
          </div>
          {error.temps && <span>{error.temps}</span>}

          <div className={style.submit}>
            <button disabled={disbleSend()} type="submit">
              Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
