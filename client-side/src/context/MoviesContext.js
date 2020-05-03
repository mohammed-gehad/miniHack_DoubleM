import React, { useReducer } from "react";
import { AsyncStorage } from "react-native";
import MoviesAPI from "../api/MoviesAPI";
const _ = require("lodash");

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "getMovies":
        return action.payload;
      case "logout":
        return [];
      default:
        return prevState;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const getMovies = () =>
    new Promise(async (resolve, reject) => {
      try {
        await MoviesAPI.get("/movies")
          .then(
            ({ data }) =>
              new Promise((resolve, reject) => {
                dispatch({ type: "getMovies", payload: data });
                resolve(data);
              })
          )
          .then((data) => {
            _saveLocal(data);
          });
        return resolve();
      } catch (e) {
        console.log(e);
        return reject();
      }
    });

  const _saveLocal = (data) =>
    new Promise(async (resolve, reject) => {
      if (data)
        await AsyncStorage.setItem("state", JSON.stringify(data)).then(resolve);
      else reject();
    });

  const _getLocal = () =>
    new Promise(async (resolve, reject) => {
      await AsyncStorage.getItem("state").then((data) => {
        data = JSON.parse(data);
        if (data) dispatch({ type: "getMovies", payload: data });
        else getMovies();
        resolve();
      });
    });

  const logout = async () => {
    try {
      dispatch({ type: "logout" });
      await AsyncStorage.clear();
    } catch (e) {}
  };

  return (
    <Context.Provider
      value={{
        state,
        _saveLocal,
        _getLocal,
        logout,
        getMovies,
      }}
    >
      {children}
    </Context.Provider>
  );
};
