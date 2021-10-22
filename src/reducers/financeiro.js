import {
  GET_PAGAMENTOS,
  ADD_PAGAMENTO,
  CLEAR_PAGAMENTOS,
  CLEAR_PAGAMENTO,
  DELETE_PAGAMENTO,
  GET_HISTORICO,
  GET_RESUMO,
  ADD_EXPERIMENTAL,
  ADD_AVULSA,
  ADD_PERSONAL,
  GET_PAGAMENTO,
  GET_PAGAMENTO_PROFESSORES,
  PAGAMENTO_LOADING
} from "../actions/types";

const initialState = {
  avulsas: null,
  professores: null,
  personals: null,
  experimentals: null,
  pagamento: null,
  pagamentos: [],
  historico: null,
  resumo: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PAGAMENTO:
      return {
        ...state,
        pagamentos: [action.payload, ...state.pagamentos]
      };
    case ADD_AVULSA:
      return {
        ...state,
        avulsas: [action.payload, ...state.pagamentos]
      };
    case ADD_EXPERIMENTAL:
      return {
        ...state,
        experimentals: [action.payload, ...state.pagamentos]
      };
    case ADD_PERSONAL:
      return {
        ...state,
        personals: [action.payload, ...state.pagamentos]
      };
    case PAGAMENTO_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_PAGAMENTOS:
      return {
        ...state,
        pagamentos: action.payload,
        isLoading: false
      };
    case GET_PAGAMENTO_PROFESSORES:
      return {
        ...state,
        professores: action.payload,
        isLoading: false
      };
    case GET_RESUMO:
      return {
        ...state,
        resumo: action.payload,
        isLoading: false
      };
    case GET_HISTORICO:
      return {
        ...state,
        historico: action.payload,
        isLoading: false
      };
    case GET_PAGAMENTO:
      return {
        ...state,
        pagamento: action.payload,
        isLoading: false
      };
    case CLEAR_PAGAMENTOS:
      return {
        ...state,
        pagamentos: null,
        pagamento: null,
        isLoading: false
      };
    case CLEAR_PAGAMENTO:
      return {
        ...state,

        pagamento: null
      };
    case DELETE_PAGAMENTO:
      return {
        ...state,
        pagamentos: state.pagamentos.filter(
          pagamento => pagamento.id !== action.payload
        )
      };
    default:
      return state;
  }
}
