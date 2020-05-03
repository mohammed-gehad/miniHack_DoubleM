import React, { useReducer, useContext } from "react";
import { AsyncStorage } from "react-native";
import MoviesApi from "../api/MoviesAPI";
const _ = require("lodash");
import { Context as WatchlistContext } from "./MoviesContext";

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const watchlistContext = useContext(WatchlistContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return action.payload;
      case "addToWatchList":
        return { ...state, watchList: [action.payload, ...state.watchList] };
      case "getToken":
        return { ...state, token: action.payload };
      case "logout":
        return {};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    watchList: [],
  });

  const login = async (email, password) => {
    const {
      headers: { token },
      data,
    } = await MoviesApi.post("/user/login", { email, password });

    if (token) {
      await AsyncStorage.setItem("token", token);
      data.token = token;
      dispatch({
        type: "login",
        payload: _.pick(data, ["email", "username", "token"]),
      });
    } else {
      return new Promise.reject(data);
    }
  };

  const signup = async (username, email, password) => {
    const {
      headers: { token },
      data,
    } = await MoviesApi.post("/user/register", { username, email, password });
    if (token) {
      await AsyncStorage.setItem("token", token);
      data.token = token;
      dispatch({
        type: "login",
        payload: _.pick(data, ["email", "username", "token"]),
      });
    } else {
      return new Promise.reject(data);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch({ type: "getToken", payload: token });
      }
    } catch (e) {
      console.log(e);
    }
    return new Promise.resolve(false);
  };

  const logout = async () => {
    try {
      watchlistContext.logout();
      AsyncStorage.clear();
      dispatch({ type: "logout" });
    } catch (e) {
      console.log(e);
    }
  };

  const addToWatchList = async (id) => {
    try {
      await MoviesApi.post(`user/watchlist/${id}`).then(() => {
        dispatch({ type: "addToWatchList", payload: id });
      });
    } catch (e) {
      console.log(e);
    }
  };
  const deleteFromWatchList = async () => {
    try {
      await MoviesApi.delete(`user/watchlist/${id}`).then(() => {
        dispatch({ type: "deleteFromWatchList", payload: id });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Context.Provider
      value={{
        state,
        addToWatchList,
        deleteFromWatchList,
        login,
        signup,
        getToken,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
