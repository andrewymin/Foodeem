import React, { createContext, useContext, useReducer } from "react";
import { customAxios, isAxiosError } from "../hooks/axiosInstance";
import useToast from "../components/Toastify";
import { useNavigate } from "react-router-dom";
import CheckCookieExists from "../hooks/checkCookie";

interface State {
  user: String;
  pwd: String;
  allowVerify: Boolean;
  isAuth: Boolean;
}

type Action =
  | { type: "USER"; payload: String }
  | { type: "PWD"; payload: String }
  | { type: "ALLOW_VERIFY"; payload: Boolean }
  | { type: "IS_AUTH"; payload: Boolean };

const initialState: State = {
  user: "",
  pwd: "",
  allowVerify: false,
  isAuth: false,
};

interface AxiosCallFunction {
  (): Promise<void>;
}

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  login: AxiosCallFunction;
  register: AxiosCallFunction;
  logout: AxiosCallFunction;
  authCheck: AxiosCallFunction;
  userDataFetch: AxiosCallFunction;
}
const AuthContext = createContext<AppContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "USER": {
      return { ...state, user: action.payload };
    }
    case "PWD": {
      return { ...state, pwd: action.payload };
    }
    case "IS_AUTH": {
      return { ...state, isAuth: action.payload };
    }
    case "ALLOW_VERIFY": {
      return { ...state, isAuth: action.payload };
    }
    default:
      return state;
  }
};

// Define the type for the provider component props
interface ProviderChildern {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<ProviderChildern> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showError } = useToast();
  const navigate = useNavigate();

  const register = async () => {
    // console.log("Clicked signup");
    console.log(state.user, state.pwd);
    try {
      await customAxios
        .post("user/signup", {
          userID: state.user,
          userPass: state.pwd,
        })
        .then((res) => {
          dispatch({ type: "ALLOW_VERIFY", payload: res.data.allowVerify });
          console.log(res.data.msg);
          navigate(`/verify`);
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          // Server responded with a status other than 2xx
          // toastify will only work with toastContainer! don't forget
          showError(error.response.data.errorMsg);
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
      // console.log(error.response.data.errorMsg);
    }
  };

  const login = async () => {
    // console.log("clicked login");
    try {
      await customAxios
        .post("user/login", {
          userID: state.user,
          userPass: state.pwd,
        })
        .then((res) => {
          dispatch({ type: "IS_AUTH", payload: res.data.authorized });
          // console.log(res.data.userData.email);
          // localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          // Server responded with a status other than 2xx
          // toastify will only work with toastContainer! don't forget
          showError(error.response.data.errorMsg);
          console.log(error.response.data.errorMsg);
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
    }
  };

  const logout = async () => {
    // console.log("working?");
    try {
      await customAxios.get("user/logout").then((res) => {
        dispatch({ type: "IS_AUTH", payload: res.data.authorized });
        // console.log(res.data.isAuthorized);
        // console.log(res.data.token);
        console.log("logout auth successful");
        navigate("/");
      });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
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
    }
  };

  const userDataFetch = async () => {
    // try {
    //   await customAxios.get("user/data").then((res) => {
    //     // console.log(res.data.userData);
    //     dispatch({ type: "USER", payload: res.data.userData });
    //   });
    // } catch (error) {
    //   // notifyError(error.response.data.errorMsg);
    //   navigate("/");
    // }
  };

  const authCheck = async () => {
    // console.log(state.user, state.pwd);
    const token = CheckCookieExists("token");
    if (token) dispatch({ type: "IS_AUTH", payload: true });
    // try {
    //   await customAxios.get("auth/protected-route").then((res) => {
    //     // TODO: check what actually gets send back to payload to fix
    //     //  this should just be false or true
    //     dispatch({ type: "IS_AUTH", payload: res.data.authorized });
    //   });
    // } catch (error) {
    //   dispatch({ type: "IS_AUTH", payload: false });
    //   // console.log(error.response);
    //   // may need to change this to only naviagte to home if not already
    //   //  on home page to stop double load even with useEffect
    //   //  Or get rid of this for a privateRoute strat.
    //   navigate("/");
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        register,
        login,
        logout,
        authCheck,
        userDataFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
