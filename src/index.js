import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./apps/auth/store";
import setAuthHeader from "./_helpers/setAuthHeader";
import { setUser } from "./apps/auth/actions";

if (sessionStorage.getItem("user")) {
  setAuthHeader();
  store.dispatch(setUser(JSON.parse(sessionStorage.getItem("user"))));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
