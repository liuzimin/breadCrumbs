import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import Layout from "./components/Layout/Layout";
import MainPage from "./components/MainPage/MainPage";
import FlipImageContainer from "./components/FlipImageContainer/FlipImageContainer";

function App() {
  let routes = (
    <Switch>
      {/* <Route exact path="/home/myname" component={MainPage} /> */}
      {/* <Route exact path="/home/myname" component={MainPage} /> */}
      <Route path="/home" component={MainPage} />
      <Route exact path="/" component={FlipImageContainer} />
      <Route path="/ErrorScreen" component={ErrorScreen} />
      <Redirect to="/ErrorScreen" />
    </Switch>
  );
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
