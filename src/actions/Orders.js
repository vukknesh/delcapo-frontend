import axios from "axios";
import api from "../utils/config";
import { tokenConfig } from "./auth";
import { message } from "antd";
import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  CLEAR_ORDERS,
  CLEAR_ORDER,
  DELETE_ORDER,
  ORDER_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_THERE_MORE_DATA,
} from "./types";
//add post
export const addOrder = (eventData, token, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post(api + "/api/pizzas/create/", eventData, config)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
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
export const getOrders = () => (dispatch) => {
  dispatch({ type: ORDER_LOADING });
  axios
    .get(api + "/api/pizzas/all-orders/")
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
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
export const getOpenOrders = () => (dispatch, getState) => {
  const orders = getState().orders.orders;
  console.log("actions orders", orders);
  dispatch({ type: ORDER_LOADING, payload: true });
  axios
    .get(api + "/api/pizza/open-orders/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
      dispatch({
        type: IS_THERE_MORE_DATA,
        payload: orders.results?.length < res.data?.count,
      });
      dispatch({
        type: ORDER_LOADING,
        payload: false,
      });
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
      dispatch({
        type: ORDER_LOADING,
        payload: false,
      });
    });
};

export const updateOrder = (orderData, id) => (dispatch, getState) => {
  axios
    .put(api + `/api/pizza/order/${id}/edit/`, orderData, tokenConfig(getState))
    .then((res) => {
      message.success("Pedido alterado com sucesso!");
      dispatch(getOpenOrders());
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data,
      });
    });
};

// delete hotel

export const deleteOrder = (id) => (dispatch, getState) => {
  axios
    .delete(api + `/api/pizzas/order/${id}/delete/`, tokenConfig(getState))

    .then((res) => {
      message.success(`Pedido deletado com sucesso!`);
      dispatch(getOpenOrders());
      dispatch({
        type: DELETE_ORDER,
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

export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING,
  };
};

//clear errorrs

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

//clear events

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  };
};

//clear event
export const clearOrder = () => {
  return {
    type: CLEAR_ORDER,
  };
};
