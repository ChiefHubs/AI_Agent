import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_ERROR,
  REGISTER_ERROR,
  SET_ACTIVE_MODEL
} from "./constants";

const initialState = {
  isAuthenticated: false,
  user: {},
  requesting: true,
  successful: false,
  messages: "",
  error: "",
  activeModel:"",
};

const authReducer = (state = initialState, action) => {
  
  // console.log(action);
  switch (action.type) {
    case REGISTER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
      };

    case CLIENT_SET:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        requesting: false,
        successful: true,
        error: "",
      };
    case SET_ACTIVE_MODEL:
      return {
        ...state,
        activeModel: action.activeModel,
      };

    case CLIENT_UNSET:
      return {
        ...state,
        initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
