import React, { createContext, useContext, useReducer } from "react";
import { customAxios, isAxiosError } from "../hooks/axiosInstance";
import useToast from "../components/Toastify";
import { useNavigate } from "react-router-dom";
// import CheckCookieExists from "../hooks/checkCookie";

interface State {
  user: string;
  pwd: string;
  allowVerify: boolean;
  isAuth: boolean;
}

type Action =
  | { type: "USER"; payload: string }
  | { type: "PWD"; payload: string }
  | { type: "ALLOW_VERIFY"; payload: boolean }
  | { type: "IS_AUTH"; payload: boolean };

const initialState: State = {
  user: "",
  pwd: "",
  allowVerify: false,
  isAuth: false,
};

interface AxiosCallFunction {
  (): Promise<void>;
}

interface newPassAxiosCall {
  (token: string | undefined): Promise<void>;
}

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  login: AxiosCallFunction;
  register: AxiosCallFunction;
  logout: AxiosCallFunction;
  authCheck: AxiosCallFunction;
  forgotPasswordLink: AxiosCallFunction;
  setNewPassword: newPassAxiosCall;
  delAcct: AxiosCallFunction;
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
      return { ...state, allowVerify: action.payload };
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
  const { showError, showSuccess } = useToast();
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
          // console.log(res.data.msg);
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
          // authorizing user from backend
          dispatch({ type: "IS_AUTH", payload: res.data.authorized });
          // getting saved recipes from user and placing them in localstorage
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(res.data.userRecipes)
          );
          // redirect to home page after success
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
        localStorage.removeItem("savedRecipes");
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

  const authCheck = async () => {
    try {
      await customAxios.get("auth/protected-route").then((res) => {
        dispatch({ type: "IS_AUTH", payload: res.data.authorized });
        navigate("/");
      });
    } catch (error) {
      dispatch({ type: "IS_AUTH", payload: false });
      localStorage.removeItem("savedRecipes");
      navigate("/");
    }
  };

  const forgotPasswordLink = async () => {
    try {
      await customAxios
        .post("user/reset-password-link", {
          userId: state.user,
        })
        .then((res) => {
          // console.log(res);
          showSuccess(res.data.successMsg);
          // return res.data.success
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          showError(error.response.data.errorMsg);
          // console.log(error);
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

  const setNewPassword = async (token: string | undefined) => {
    try {
      await customAxios
        .post("user/reset-password", {
          userPass: state.pwd,
          token: token,
        })
        .then((res) => {
          // console.log(res);
          showSuccess(res.data.msg);
          logout();
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          showError(error.response.data.msg);
          // console.log(error);
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

  const delAcct = async () => {
    const body = document.querySelector("body");
    body?.classList.remove("no-scrolling");
    try {
      await customAxios.delete(`user/delete`).then((res) => {
        showSuccess(res.data.successMsg);
        dispatch({ type: "IS_AUTH", payload: false });
        navigate("/");
      });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          showError(error.response.data.msg);
          // console.log(error);
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

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        register,
        login,
        logout,
        authCheck,
        forgotPasswordLink,
        setNewPassword,
        delAcct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
