import {
  GET_ORDER,
  GET_ORDERS,
  ADD_ORDER,
  CLEAR_ORDERS,
  CLEAR_ORDER,
  DELETE_ORDER,
  ORDER_LOADING,
  IS_THERE_MORE_DATA,
} from "../actions/types";

const initialState = {
  order: null,
  orders: [],
  isLoading: false,
  moreData: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case ORDER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_THERE_MORE_DATA:
      return {
        ...state,
        moreData: action.payload,
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null,
        order: null,
        isLoading: false,
      };
    case CLEAR_ORDER:
      return {
        ...state,

        order: null,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
}
