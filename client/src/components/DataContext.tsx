import React, { createContext, useContext, useReducer, Dispatch } from "react";
// import { useNavigate } from "react-router-dom";

interface State {
  isLoading: boolean;
  randomRecipe: undefined | React.SetStateAction<undefined>;
}

const initialState = {
  isLoading: false,
  randomRecipe: undefined,
};

type Action =
  | { type: "LOADING" }
  | { type: "UNLOADING" }
  | { type: "RANDOMRECIPE"; payload?: React.SetStateAction<undefined> };

interface DataContextType {
  state: State;
  dispatch: Dispatch<Action>;
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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "UNLOADING":
      return { ...state, isLoading: false };
    case "RANDOMRECIPE":
      return { ...state, randomRecipe: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const [randomRecipe, setrandomRecipe] = useState();

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
