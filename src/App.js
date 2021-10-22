import React, { useEffect } from "react";

import { connect } from "react-redux";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import BaseRouter from "./routes";
function App({ auth }) {
  return (
    <div className="App">
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(App);
