import axios from "axios";
import api from "../utils/config";
import { tokenConfig } from "./auth";
import { message } from "antd";
import {
  GET_PAGAMENTOS,
  ADD_PAGAMENTO,
  CLEAR_PAGAMENTOS,
  CLEAR_PAGAMENTO,
  DELETE_PAGAMENTO,
  PAGAMENTO_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_HISTORICO,
  GET_RESUMO,
  ADD_AVULSA,
  ADD_EXPERIMENTAL,
  GET_PAGAMENTO_PROFESSORES,
  ADD_PERSONAL
} from "./types";
//add post

export const addPagamento = payData => (dispatch, getState) => {
  axios
    .post(api + "/api/financeiro/create/", payData, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_PAGAMENTO,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const addPersonal = payData => (dispatch, getState) => {
  axios
    .post(api + "/api/financeiro/add-personal/", payData, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_PERSONAL,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const addAvulsa = payData => (dispatch, getState) => {
  axios
    .post(api + "/api/financeiro/add-avulsa/", payData, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_AVULSA,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const addExperimental = payData => (dispatch, getState) => {
  axios
    .post(
      api + "/api/financeiro/add-experimental/",
      payData,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: ADD_EXPERIMENTAL,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};

export const getPagamentos = () => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(api + "/api/financeiro/list-all/")
    .then(res => {
      dispatch({
        type: GET_PAGAMENTOS,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const getHistorico = () => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(api + "/api/financeiro/historico/")
    .then(res => {
      dispatch({
        type: GET_HISTORICO,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const getResumoMes = () => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(api + "/api/financeiro/resumo-mes/")
    .then(res => {
      dispatch({
        type: GET_RESUMO,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const getPagamentosProfessores = () => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(api + "/api/financeiro/pagamento-professores/")
    .then(res => {
      dispatch({
        type: GET_PAGAMENTO_PROFESSORES,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const getPagamentosByPagination = url => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_PAGAMENTOS,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};
export const getPagamentosDate = (
  conteudo,
  data_inicial,
  data_final
) => dispatch => {
  dispatch({ type: PAGAMENTO_LOADING });
  axios
    .get(
      api +
        `/api/financeiro/?q=${conteudo}&data_inicial=${data_inicial}&data_final=${data_final}`
    )
    .then(res => {
      dispatch({
        type: GET_PAGAMENTOS,
        payload: res.data.results
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};

//Get post

export const updatePagamento = id => (dispatch, getState) => {
  let profileData = {
    pago: true
  };
  axios
    .put(
      api + `/api/financeiro/${id}/edit/`,
      profileData,
      tokenConfig(getState)
    )
    .then(res => {
      if (profileData.pago) {
        message.success(`Pagamento realizado com sucesso!`);
      } else {
        message.success(`Pagamento desmarcado com sucesso!`);
      }

      dispatch(getPagamentos());
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      });
    });
};

// delete hotel

export const deletePagamento = id => (dispatch, getState) => {
  axios
    .delete(api + `/api/financeiro/${id}/delete/`, tokenConfig(getState))

    .then(res => {
      message.success(`Pagamento deletado com sucesso!`);
      dispatch(getPagamentos());
      dispatch({
        type: DELETE_PAGAMENTO,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data
      })
    );
};

export const setPagamentoLoading = () => {
  return {
    type: PAGAMENTO_LOADING
  };
};

//clear errorrs

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//clear events

export const clearPagamentos = () => {
  return {
    type: CLEAR_PAGAMENTOS
  };
};

//clear event
export const clearPagamento = () => {
  return {
    type: CLEAR_PAGAMENTO
  };
};
