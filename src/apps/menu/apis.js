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
  
// upload file
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
    return axios.post(`${API_URL}/user_query/uploadFile`,formData,config);
  };
// retrain model (file)
export const retrainModel = (file) => {
    return axios.post(`${API_URL}/user_query/retrainModel`,file);
  };
// retrieve all files api 
export const getAllFiles = (values) => {
  
    return axios.get(`${API_URL}/user_query/getAllFiles`);
  };