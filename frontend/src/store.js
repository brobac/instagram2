import React, { useContext, createContext } from "react";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

//side-effect가 있을 때는 UpdateWithSideEffect, 없을 때는 Update 사용

const initialState = {
  jwtToken: "",
};

const AppContext = createContext();

const reducer = (prevState, action) => {
  if (action.type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = { ...prevState, jwtToken, isAuthenticate: true };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken);
    });
  } else if (action.type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: "",
      isAuthenticate: false,
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
    });
  }

  return prevState;
};

export default function AppProvider({ children }) {
  const jwtToken = getStorageItem("jwtToken", "");
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken,
    isAuthenticate: jwtToken.length > 0,
    //useRudecer는 3번째파라미터에 어떤 값을 읽어오는 초기화 함수를 지원해줌
    //reducer의 초기값으로 jwtToken값을 읽어오는 로직
    //useReducerWithSideEffects는 initfunction을 지원안해줘서 두번째 파라미터로 바로넣어서 초기값을 만들어줌
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
//{ type: SET_TOKEN, payload: token }값들이 reducer함수에 action에 실려서 바로 reducer가 실행됨
export const deleteToken = () => ({ type: DELETE_TOKEN });
