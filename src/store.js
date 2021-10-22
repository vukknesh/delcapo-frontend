import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
// const middleWare = [thunk];
const middleWare = [thunk];

// const devTools =
//   process.env.NODE_ENV === "production"
//     ? applyMiddleware(...middleWare)
//     : composeWithDevTools(applyMiddleware(...middleWare));

// const store = createStore(rootReducer, initialState, devTools);

const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
