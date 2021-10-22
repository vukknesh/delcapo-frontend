import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import StyledSpinner from "./utils/StyledSpinner";
const Login = lazy(() => import("./screens/Login"));
const Dashboard = lazy(() => import("./screens/Dashboard"));
const BaseRouter = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledSpinner />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={Login} />
        <Dashboard>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Dashboard>
      </Switch>
    </Suspense>
  );
};

export default BaseRouter;
