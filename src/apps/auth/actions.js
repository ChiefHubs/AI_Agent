import axios from "axios";
import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_ERROR,
  REGISTER_ERROR,
} from "./constants";

const API_URL = process.env.REACT_APP_API_URL;

export function setUser(user) {
  return {
    type: CLIENT_SET,
    user,
  };
}

export function unsetUser() {
  return {
    type: CLIENT_UNSET,
  };
}

export const register = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    sessionStorage.setItem("user", JSON.stringify(data));
    dispatch(setUser(data.storeData));
    window.location = "/";
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: REGISTER_ERROR,
      error: error.response.data.error,
    });
  }
};

export const login = (loginInput) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, loginInput, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    sessionStorage.setItem("user", JSON.stringify(data));
    dispatch(setUser(data.storeData));
    window.location = "/";
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: LOGIN_ERROR, error: error.response.data.error });
  }
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location = "/login";
  // window.location.reload();
  return (dispatch) => {
    dispatch(unsetUser());
  };
};
