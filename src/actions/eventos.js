import axios from "axios";
import api from "../utils/config";
import { tokenConfig } from "./auth";
import { message } from "antd";
import {
  GET_EVENTS,
  ADD_EVENT,
  CLEAR_EVENTS,
  CLEAR_EVENT,
  DELETE_EVENT,
  EVENT_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "./types";
//add post

export const addEvent = (eventData, token, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post(api + "/api/eventos/create/", eventData, config)
    .then((res) => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEventsDesmarcadosByProfessor = () => (dispatch, getState) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(api + "/api/eventos/desmarcado-by-prof/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEventsDesmarcados = () => (dispatch, getState) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(api + "/api/eventos/mostrar-desmarcados/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEvents = () => (dispatch) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(api + "/api/eventos/list-all/")
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEventsByProfessor = () => (dispatch, getState) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(api + "/api/eventos/list-by-professor/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEventsByPagination = (url) => (dispatch) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};
export const getEventsDate = (conteudo, data_inicial, data_final) => (
  dispatch
) => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(
      api +
        `/api/eventos/?q=${conteudo}&data_inicial=${data_inicial}&data_final=${data_final}`
    )
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data.results,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};

//Get post

export const updateEvent = (profileData, id) => (dispatch, getState) => {
  axios
    .put(
      api + `/api/eventos/${id}/admin-edit/`,
      profileData,
      tokenConfig(getState)
    )
    .then((res) => {
      if (profileData.desmarcado) {
        message.success(`Aula desmarcada com sucesso!`);
      } else {
        message.success(`Aula marcada com sucesso!`);
      }

      dispatch(getEvents());
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};

// delete hotel

export const deleteEvent = (id) => (dispatch, getState) => {
  axios
    .delete(api + `/api/eventos/${id}/delete/`, tokenConfig(getState))

    .then((res) => {
      message.success(`Aula deletada com sucesso!`);
      dispatch(getEvents());
      dispatch({
        type: DELETE_EVENT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      })
    );
};
export const deleteAulasAluno = (id) => (dispatch, getState) => {
  axios
    .delete(api + `/api/eventos/delete_all_aulas/${id}`, tokenConfig(getState))

    .then((res) => {
      message.success(`Aulas deletadas com sucesso!`);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      })
    );
};

export const setEventLoading = () => {
  return {
    type: EVENT_LOADING,
  };
};

//clear errorrs

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

//clear events

export const clearEvents = () => {
  return {
    type: CLEAR_EVENTS,
  };
};

//clear event
export const clearEvent = () => {
  return {
    type: CLEAR_EVENT,
  };
};
