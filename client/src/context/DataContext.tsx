import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { customAxios } from "../hooks/axiosInstance";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

interface UserProfile {
  email: string;
  googleLink: string;
  githubLink: string;
}

interface State {
  isLoading: boolean;
  randomRecipe: undefined | React.SetStateAction<undefined>;
  videoNum: number;
  userData: UserProfile | null;
}

type Action =
  | { type: "LOADING" }
  | { type: "UNLOADING" }
  | { type: "RANDOMRECIPE"; payload?: React.SetStateAction<undefined> }
  | { type: "VID_NUM"; payload: number }
  | { type: "USER_DATA"; payload: null };

const initialState = {
  isLoading: false,
  randomRecipe: undefined,
  videoNum: 0,
  userData: null,
};

interface AxiosCallFunction {
  (): Promise<void>;
}

interface DataContextType {
  dataState: State;
  dispatch: Dispatch<Action>;
  userDataFetch: AxiosCallFunction;
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
    case "USER_DATA": {
      return { ...dataState, userData: action.payload };
    }
    default:
      return dataState;
  }
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataState, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // // setting time interval for videos to loop, 0-4 videos
  // const intervalId = setInterval(() => {
  //   // Get previous videoNum using 'pre' and
  //   //   increment the count and reset to 0 if it reaches 4
  //   dispatch({ type: "VID_NUM", payload: (dataState.videoNum + 1) % 5 });
  //   console.log("Video Index in set interval: ", dataState.videoNum);
  // }, 5000); // 10000 milliseconds = 10 seconds

  const userDataFetch = async () => {
    try {
      await customAxios.get("user/data").then((res) => {
        // console.log(res.data.userData);
        dispatch({ type: "USER_DATA", payload: res.data.userData });
      });
    } catch (error) {
      // notifyError(error.response.data.errorMsg);
      navigate("/");
    }
  };

  return (
    // <DataContext.Provider value={{ dataState, dispatch, intervalId }}>
    <DataContext.Provider value={{ dataState, dispatch, userDataFetch }}>
      {children}
    </DataContext.Provider>
  );
};
