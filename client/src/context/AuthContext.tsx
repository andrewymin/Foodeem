import React, { createContext, useContext, useReducer } from "react";

interface State {
  user: String;
  pwd: String;
  isAuth: Boolean;
}

type Action =
  | { type: "USER"; payload: String }
  | { type: "PWD"; payload: String }
  | { type: "IS_AUTH"; payload: Boolean };

const initialState: State = {
  user: "",
  pwd: "",
  isAuth: false,
};

interface LoginFunction {
  (): Promise<void>;
}
interface RegisterFunction {
  (): Promise<void>;
}

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  login: LoginFunction;
  register: RegisterFunction;
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

  const register = async () => {
    // console.log("Clicked signup");
    console.log(state.user, state.pwd);
    // try {
    //   await customAxios
    //     .post("api/user/signup", {
    //       userID: state.user,
    //       userPass: state.pwd,
    //     })
    //     .then((res) => {
    //       // dispatch({ type: "ACCESS_V_PAGE", payload: true });
    //       console.log(res.data.msg);
    //       navigate(`/verify`);
    //     });
    // } catch (error) {
    //   showError(error.response.data.errorMsg);
    //   // console.log(error.response.data.errorMsg);
    // }
  };

  const login = async () => {
    console.log("clicked login");
    // try {
    //   await customAxios
    //     .post("api/user/login", {
    //       userID: state.user,
    //       userPass: state.pwd,
    //     })
    //     .then((res) => {
    //       dispatch({ type: "IS_AUTH", payload: res.data.authorized });
    //       // console.log(res.data.userData.email);
    //       // localStorage.setItem("user", JSON.stringify(user));
    //       navigate("/secret");
    //     });
    // } catch (error) {
    //   showError(error.response.data.errorMsg);
    //   console.log(error.response.data.errorMsg);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
