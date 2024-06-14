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
  dataState: State;
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

const reducer = (dataState: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...dataState, isLoading: true };
    case "UNLOADING":
      return { ...dataState, isLoading: false };
    case "RANDOMRECIPE":
      return { ...dataState, randomRecipe: action.payload };
    case "VID_NUM": {
      return { ...dataState, videoNum: action.payload };
    }
    default:
      return dataState;
  }
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataState, dispatch] = useReducer(reducer, initialState);

  // // setting time interval for videos to loop, 0-4 videos
  // const intervalId = setInterval(() => {
  //   // Get previous videoNum using 'pre' and
  //   //   increment the count and reset to 0 if it reaches 4
  //   dispatch({ type: "VID_NUM", payload: (dataState.videoNum + 1) % 5 });
  //   console.log("Video Index in set interval: ", dataState.videoNum);
  // }, 5000); // 10000 milliseconds = 10 seconds

  return (
    // <DataContext.Provider value={{ dataState, dispatch, intervalId }}>
    <DataContext.Provider value={{ dataState, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
