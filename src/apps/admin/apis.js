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

// get llm option with users api
export const getLLMOptionWithUser = () => {
  return axios.get(`${API_URL}/llm_option/getOptionWithUser`);
};

export const createChatbotApp = (values) => {
  return axios.post(`${API_URL}/admin/createChatbotApp`, { values });
};

export const updateChatbotApp = (values) => {
  return axios.post(`${API_URL}/admin/updateChatbotApp`, { values });
};

export const deleteApp = (id) => {
  return axios.post(`${API_URL}/admin/deleteApp`, { id });
};

// get apps for chatbot integration
export const getAllApps = () => {
  return axios.get(`${API_URL}/admin/getApps`);
};

export const deleteOrg = (id) => {
  return axios.post(`${API_URL}/admin/deleteOrg`, { id });
};

export const getAllOrgs = () => {
  return axios.get(`${API_URL}/admin/getOrgs`);
};

export const createChatbotOrg = (values) => {
  return axios.post(`${API_URL}/admin/createChatbotOrg`, { values });
};

export const updateChatbotOrg = (values) => {
  return axios.post(`${API_URL}/admin/updateChatbotOrg`, { values });
};

// get chatbots
export const getChatbots = () => {
  return axios.get(`${API_URL}/admin/getChatbots`);
};
