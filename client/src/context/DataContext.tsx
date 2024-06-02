import React, { createContext, useContext, useReducer, Dispatch } from "react";
// import { useNavigate } from "react-router-dom";

interface State {
  isLoading: boolean;
  randomRecipe: undefined | React.SetStateAction<undefined>;
  videoNum: number;
}

type Action =
  | { type: "LOADING" }
  | { type: "UNLOADING" }
  | { type: "RANDOMRECIPE"; payload?: React.SetStateAction<undefined> }
  | { type: "VID_NUM"; payload: number };

const initialState = {
  isLoading: false,
  randomRecipe: undefined,
  videoNum: 0,
};

interface DataContextType {
  state: State;
  dispatch: Dispatch<Action>;
  // intervalId: ReturnType<typeof setInterval>;
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
    case "VID_NUM": {
      return { ...state, videoNum: action.payload };
    }
    default:
      return state;
  }
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // // setting time interval for videos to loop, 0-4 videos
  // const intervalId = setInterval(() => {
  //   // Get previous videoNum using 'pre' and
  //   //   increment the count and reset to 0 if it reaches 4
  //   dispatch({ type: "VID_NUM", payload: (state.videoNum + 1) % 5 });
  //   console.log("Video Index in set interval: ", state.videoNum);
  // }, 5000); // 10000 milliseconds = 10 seconds

  return (
    // <DataContext.Provider value={{ state, dispatch, intervalId }}>
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
