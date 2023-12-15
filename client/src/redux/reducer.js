import {
  GET_DOGBYID,
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGSBYRAZA,
  POST_DOG,
  FILTER,
  ORDER,
  RESET,
  TEMPFILTER,
  ERROR,
} from "./actions-types";
/// Un estado con TODOS LOS PERROS PARA LOS FILTROS=> TIENE QUE TENER LOS BUSCADOS POR RAZA Y LOS DE LA RUTA GET =>  ALLDOGS
//                                                  DOGS_SHOW
///
let initialState = {
  dogs_Show: [], // para usar con los filtros
  allDogs: [], // todos en general
  dogId: {},
  temps: [],
  error: "",
  temperamentosSeleccionados: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Presentaciones
    // case "TEMPSELECTED":
    //   console.log(action.payload, "temperamentos seleccionados");
    //   // return {
    //   //   ...state,
    //   //   temperamentosSeleccionados: [
    //   //     ...state.temperamentosSeleccionados,
    //   //     action.payload,
    //   //   ],
    //   // };
    //   state.temperamentosSeleccionados.push(action.payload);
    //   return {
    //     state,
    //   };
    case ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case TEMPFILTER:
      if (typeof action.payload === "string") {
        return {
          ...state,
          dogs_Show: [...state.dogs_Show].filter((dog) => {
            if (dog.temperaments) {
              if (dog.temperaments.includes(action.payload)) return dog;
            }
            return;
          }),
        };
      } else {
        // caso de array en payload
        console.log("entre en borrar");
        let delet = [...state.allDogs];
        for (const temp of action.payload) {
          console.log("temperamento de broorar", temp, delet);
          delet = delet.filter((dog) => {
            if (dog.temperaments) {
              if (dog.temperaments.includes(temp.trim())) return dog;
              return;
            }
          });
          console.log("temperamento borradp", temp, delet);
        }
        console.log("dogShow terminado", delet);
        return {
          ...state,
          dogs_Show: [...delet],
        };
      }

    case RESET:
      return {
        ...state,
        dogs_Show: [...state.allDogs],
      };
    case FILTER:
      switch (action.payload) {
        case "BaseF": {
          return {
            ...state,
            dogs_Show: [...state.allDogs],
          };
        }
        case "Api":
          return {
            ...state,
            dogs_Show: [...state.allDogs].filter(
              (dog) => dog.created === false
            ),
          };

        case "DataBase": {
          return {
            ...state,
            dogs_Show: [...state.allDogs].filter((dog) => dog.created === true),
          };
        }
        default:
          return { ...state };
      }
    case ORDER:
      switch (action.payload) {
        case "BaseO":
          return {
            ...state,
            dogs_Show: [...state.allDogs],
          };
        case "RazaA":
          return {
            ...state,
            dogs_Show: [...state.dogs_Show].sort((a, b) => {
              if (a?.name.toLowerCase() > b?.name.toLowerCase()) {
                return 1;
              }
              if (a?.name.toLowerCase() < b?.name.toLowerCase()) {
                return -1;
              }

              return 0;
            }),
          };
        case "RazaB":
          return {
            ...state,
            dogs_Show: [...state.dogs_Show].sort((a, b) => {
              if (a?.name.toLowerCase() < b?.name.toLowerCase()) {
                return 1;
              }
              if (a?.name.toLowerCase() > b?.name.toLowerCase()) {
                return -1;
              }

              return 0;
            }),
          };
        case "PesoA":
          return {
            ...state,
            dogs_Show: [...state.dogs_Show].sort((a, b) => {
              let mediaA = 0;
              a?.weight.split(" - ").forEach((num) => {
                // console.log(num);
                isNaN(num) ? (mediaA += 0) : (mediaA += Number(num));
              });
              let mediaB = 0;
              b?.weight.split(" - ").forEach((num) => {
                // console.log(num);

                isNaN(num) ? (mediaB += 0) : (mediaB += Number(num));
              });

              if (Math.ceil(mediaA / 2) > Math.ceil(mediaB / 2)) {
                return 1;
              }
              if (Math.ceil(mediaA / 2) < Math.ceil(mediaB / 2)) {
                return -1;
              }

              return 0;
            }),
          };
        case "PesoB":
          return {
            ...state,
            dogs_Show: [...state.dogs_Show].sort((a, b) => {
              let mediaA = 0;
              a?.weight.split(" - ").forEach((num) => {
                isNaN(num) ? (mediaA += 0) : (mediaA += Number(num));
              });
              let mediaB = 0;
              b?.weight.split(" - ").forEach((num) => {
                isNaN(num) ? (mediaB += 0) : (mediaB += Number(num));
              });
              if (Math.ceil(mediaA / 2) < Math.ceil(mediaB / 2)) {
                return 1;
              }
              if (Math.ceil(mediaA / 2) > Math.ceil(mediaB / 2)) {
                return -1;
              }

              return 0;
            }),
          };
        default:
          return { ...state };
      }

    // Datos
    case GET_DOGBYID:
      return { ...state, dogId: action.payload };
    case GET_DOGS:
      return {
        ...state,
        allDogs: [...action.payload],
        dogs_Show: [...action.payload],
      };
    case GET_DOGSBYRAZA:
      return {
        ...state,

        dogs_Show: [...action.payload],
      };
    case GET_TEMPERAMENTS:
      return { ...state, temps: action.payload };
    case POST_DOG:
      return {
        ...state,
        allDogs: [...action.payload, ...state.allDogs],
        dogs_Show: [...action.payload, ...state.allDogs],
        error: "Creado con exito!",
      };
    default:
      return { ...state };
  }
};

export default reducer;
