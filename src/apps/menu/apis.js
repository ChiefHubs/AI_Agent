import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// user profile api
export const getProfile = () => {
  return axios.get(`${API_URL}/profile`);
};

export const editProfile = (values) => {
  return axios.put(`${API_URL}/profile/edit`, values);
};

// change password api
export const updatePassword = (values) => {
    return axios.put(`${API_URL}/auth/updatepassword`, values);
  };