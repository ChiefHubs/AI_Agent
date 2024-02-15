import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./apps/auth/store";
import setAuthHeader from "./_helpers/setAuthHeader";
import { setActiveModel, setUser, setTheme } from "./apps/auth/actions";

if (sessionStorage.getItem("user")) {
  setAuthHeader(sessionStorage.getItem("user"));
  store.dispatch(setUser(JSON.parse(sessionStorage.getItem("user"))));
  store.dispatch(setActiveModel("gpt"));
  // store.dispatch(setTheme(true));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId="9830403119-j8ad74iabe28adr9lre1gc55ol5h0hgh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
