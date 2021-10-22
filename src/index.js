import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  store.dispatch(loadUser());
}

let myComponent = document.getElementById("root");
if (myComponent !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    myComponent
  );
}
