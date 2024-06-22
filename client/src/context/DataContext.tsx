import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { customAxios, isAxiosError } from "../hooks/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useToast } from "react-toastify";
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
  randomOne: AxiosCallFunction;
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

  const randomOne = async () => {
    dispatch({ type: "LOADING" });
    await customAxios
      .get("randomfood") // place nodejs(aws) created route for url, using server to hide api keys
      // .get(
      //   "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/randomfood"
      // ) // place nodejs(aws) created route for url, using server to hide api keys
      .then((res) => {
        // this will return a list of recipes, i.e. recipes: array
        // after success place data of that arrayinto recipeData
        // props.getRandomRecipe(response.data.body);
        dispatch({ type: "RANDOMRECIPE", payload: res.data });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          // `error` is an AxiosError
          console.error("Error message: ", error.message);
          console.error("Error message: ", error.code);
          if (error.response) {
            // showError(error.response);
            console.log(error.response);
          } else if (error.request) {
            // Request was made but no response was received
            console.error("Request data:", error.request);
          } else {
            // Something happened in setting up the request
            console.error("Error:", error.message);
          }
        } else {
          // Handle non-Axios errors
          console.error("Unexpected error:", error);
        }
      })
      .finally(() => {
        dispatch({ type: "UNLOADING" });
      });

    navigate("/recipes");
  };

  return (
    // <DataContext.Provider value={{ dataState, dispatch, intervalId }}>
    <DataContext.Provider
      value={{ dataState, dispatch, userDataFetch, randomOne }}
    >
      {children}
    </DataContext.Provider>
  );
};
