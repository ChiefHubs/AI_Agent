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
import { googleLogout } from "@react-oauth/google";
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

export const loginWithGoogle = (token) => async (dispatch) => {
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      axios
        .post(
          `${API_URL}/auth/googleRegister`,
          { values: res.data },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("google resdata", res.data);
          sessionStorage.setItem("user", JSON.stringify(res.data));
          dispatch(setUser(res.data.storeData));
          window.location = "/";
        })
        .catch((error) => {
          console.log("google login error----", error);
          dispatch({
            type: LOGIN_ERROR,
            error: error.response?.data?.error || error.message,
          });
        });
    })
    .catch((err) => console.log(err));
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location = "/login";
  // googleLogout()
  // window.location.reload();
  return (dispatch) => {
    dispatch(unsetUser());
  };
};
