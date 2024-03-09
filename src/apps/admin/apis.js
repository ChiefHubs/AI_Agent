import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// get users api
export const getAllUsers = () => {
  return axios.get(`${API_URL}/admin`);
};
// delete user api
export const deleteUser = (id) => {
  return axios.post(`${API_URL}/admin/deleteUser`, { id });
};

// add user api
export const addUsers = (value) => {
  return axios.post(`${API_URL}/admin/addUsers`, { value });
};

// set page style api
export const getStyles = () => {
  return axios.get(`${API_URL}/user_style`);
};

// add page style api
export const addStyle = (value) => {
  return axios.post(`${API_URL}/user_style/addStyle`, { value });
};
