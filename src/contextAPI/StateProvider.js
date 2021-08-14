import { useContext, createContext, useReducer } from "react";

export const StateProviderContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProviderContext.Provider>
);

export const useContextProvider = () => useContext(StateProviderContext);
