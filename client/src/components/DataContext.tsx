import React, { createContext, useContext, useState, useReducer } from "react";
// import { useNavigate } from "react-router-dom";

interface DataContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface State {
  isLoading: boolean;
  // other properties...
}

interface Action {
  type: "loading" | "unloading";
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// this fucntion makes sure that that the context exists in the Provider, just error checking
//   more importantly instead of importing context from react just can import this fucntion to get
//   all states or props that this context uses
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an DataProvider");
  }
  return context;
};

const reducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "unloading":
      return { ...state, isLoading: false };
    default:
      throw new Error("Component not loading");
  }
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
  });
  //   const [randomRecipe, setrandomRecipe] = useState();

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
