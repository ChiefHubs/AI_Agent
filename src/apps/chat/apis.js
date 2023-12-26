import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const generateChat = (query) => {
  return axios.post(`${API_URL}/user_query/chat`, query, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
