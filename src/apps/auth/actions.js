import axios from "axios";
import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_ERROR,
  LOGIN_NOT_EXIST,
  REGISTER_ERROR,
  SET_ACTIVE_MODEL,
  SET_THEME,
} from "./constants";
import setAuthHeader from "../../_helpers/setAuthHeader";

const API_URL = process.env.REACT_APP_API_URL;

export function setUser(user) {
  return {
    type: CLIENT_SET,
    user,
  };
}
export function setActiveModel(id) {
  return {
    type: SET_ACTIVE_MODEL,
    activeModel: id,
  };
}

export function unsetUser() {
  return {
    type: CLIENT_UNSET,
  };
}

export function setTheme(value) {
  return {
    type: SET_THEME,
    value,
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
      error: error.response?.data?.error || error.message,
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
    // console.log("login data-----------", data);
    setAuthHeader(data);
    sessionStorage.setItem("user", JSON.stringify(data));
    dispatch(setUser(data.storeData));
    sessionStorage.setItem("activeModel", "gpt");
    dispatch(setActiveModel("gpt"));

    window.location = "/";
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: error.response?.data?.type === 1 ? LOGIN_NOT_EXIST : LOGIN_ERROR,
      error: error.response?.data?.error || error.message,
    });
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
