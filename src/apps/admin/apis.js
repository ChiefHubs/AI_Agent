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

// get users api
export const getRoles = () => {
  return axios.get(`${API_URL}/admin/getRoles`);
};
