import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./apps/auth/store";
import setAuthHeader from "./_helpers/setAuthHeader";
import { setActiveModel, setUser } from "./apps/auth/actions";

if (sessionStorage.getItem("user")) {
  setAuthHeader(sessionStorage.getItem("user"));
  store.dispatch(setUser(JSON.parse(sessionStorage.getItem("user"))));
  store.dispatch(setActiveModel("gpt"));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
