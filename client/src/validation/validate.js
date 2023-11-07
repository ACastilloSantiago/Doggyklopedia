const validate = (data, name) => {
  console.log("validate", data);
  console.log("name", name);

  //!NAME
  if (name === "name") {
    if (data.name) {
      setError({ ...error, name: "" });
    }
    if (/[0-9]/.test(data.name)) {
      setError({ ...error, name: "No puede ingresar numeros!" });
    }
    if (!/^\S/.test(data.name)) {
      console.log("si", data.name);
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
      console.log("se");
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
    console.log(1, data.height_max, 2, data.height_min);
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
      console.log(data.height_max);
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
      console.log(data.height_min);
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
    console.log(data);
    if (data.length) {
      setError({ ...error, temps: "" });
    }

    if (!data.length) {
      setError({ ...error, temps: "Este parametro no puede estar vacio!" });
    }
  }
};
