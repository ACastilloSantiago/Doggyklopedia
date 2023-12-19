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
import axios from "axios";
//
export const reset = () => {
  return {
    type: RESET,
  };
};

export const tempFilter = (value) => {
  return {
    type: TEMPFILTER,
    payload: value,
  };
};
export const filter = (value) => {
  return {
    type: FILTER,
    payload: value,
  };
};
export const order = (value) => {
  return {
    type: ORDER,
    payload: value,
  };
};

export const tempSeleccionados = (value) => {
  return {
    type: "TEMPSELECTED",
    payload: value,
  };
};
export const page = (value) => {
  return {
    type: "PAGE",
    payload: value,
  };
};
//
export const getDogById = (id) => {
  return async (dispatch) => {
    try {
      if (id === "") {
        return dispatch({
          type: GET_DOGBYID,
          payload: "",
        });
      }
      const { data } = await axios(`/dogs/${id}`);
      return dispatch({
        type: GET_DOGBYID,
        payload: data,
      });
    } catch (error) {
      // console.log(error.message);
    }
  };
};
export const getDogsByRaza = (raza) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/dogs/name?name=${raza}`);
      return dispatch({
        type: GET_DOGSBYRAZA,
        payload: data,
      });
    } catch (error) {
      // console.log(error.request.response);
      return dispatch({
        type: ERROR,
        payload: "wdasd",
      });
    }
  };
};

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/dogs`);
      return dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
      // console.log(error.message);
    }
  };
};

//

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/temperaments`);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const postDog = (dog) => {
  return async (dispatch) => {
    try {
      const endpoint = `/dogs`;
      const { data } = await axios.post(endpoint, dog);
      // console.log([data]);
      return dispatch({
        type: POST_DOG,
        payload: [data],
      });
    } catch (error) {
      if (error.request.response === "Validation error") {
        return dispatch({
          type: ERROR,
          payload: "Esta raza ya existe!",
        });
      }
      // console.log(error.request.response);
      // return error.request.response;

      // console.log(error.message);
    }
  };
};
export const cleanError = () => {
  return {
    type: ERROR,
    payload: "",
  };
};
