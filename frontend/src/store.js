import React, { useContext, createContext } from "react";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

//side-effect가 있을 때는 UpdateWithSideEffect, 없을 때는 Update 사용

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type, payload } = action;
  if (type === SET_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: payload.token,
      isAuthenticated: true,
      username: payload.username,
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", payload.token);
      setStorageItem("username", payload.username);
    });
  } else if (type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: "",
      isAuthenticated: false,
      username: "",
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
      setStorageItem("username", "");
    });
  } else {
    return prevState;
  }
};

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");
  const username = getStorageItem("username", "");
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken: jwtToken,
    isAuthenticated: jwtToken.length > 0,
    username: username,
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators
export const setToken = (token, username) => ({
  type: SET_TOKEN,
  payload: {
    token: token,
    username: username,
  },
});
export const deleteToken = () => ({ type: DELETE_TOKEN });
