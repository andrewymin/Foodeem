import React, { useState } from "react";
import Input from "./inputs";
import { useAuth } from "../context/AuthContext";
import useToast from "./Toastify";
import { ToastContainer } from "react-toastify";

interface AxiosCallFunction {
  (): Promise<void>;
}

interface newPassAxiosCall {
  (token: string | undefined): Promise<void>;
}

interface Props {
  axiosCall: AxiosCallFunction | newPassAxiosCall;
  newPassToken: string | undefined;
}

function PassInput(props: Props) {
  const { dispatch } = useAuth();
  const { showError } = useToast();

  // using properties of state instead of actual state values do to delay
  //  from asyncronous updating
  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

  const showPSW = () => {
    const eye = document.querySelector(".fa-eye");
    const eyeClose = document.querySelector(".fa-eye-slash");
    eyeClose?.classList.toggle("hide");
    eye?.classList.toggle("show");

    const psw = document.querySelectorAll(".pwd");
    psw.forEach((i) => {
      const type = i?.getAttribute("type") === "password" ? "text" : "password";
      i?.setAttribute("type", type);
    });
  };

  // Using function to handle state property update for both pass inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, n: string) => {
    setPasswordState({
      // merging previous state to new state object with the "..."
      ...passwordState,
      [n]: e.target.value,
    });
  };

  const checkPassword = (
    e: React.FormEvent<HTMLFormElement>,
    onSuccessFunction: AxiosCallFunction | newPassAxiosCall
  ) => {
    // console.log("is this getting reached?");
    e.preventDefault();
    if (passwordState.password != passwordState.confirmPassword)
      return showError("Passwords do not match!");
    // the length method on a function returns how many arg that function may have
    if (onSuccessFunction.length === 0)
      // for types using union "|", using the "as" to define type of call to clear typescript errors
      (onSuccessFunction as AxiosCallFunction)();
    else (onSuccessFunction as newPassAxiosCall)(props.newPassToken);
  };

  return (
    <>
      <form
        className="formInputs"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          checkPassword(e, props.axiosCall)
        }
      >
        <div className="grid-display">
          <label htmlFor="userEmail">Email: </label>
          <Input
            inputType="email"
            name="email"
            ph="Example@email.com"
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "USER", payload: e.target.value })
            }
            lengthMin={0}
          />
        </div>
        <div className="grid-display">
          <label htmlFor="userPass">Password: </label>
          <div className="revealPsw">
            <Input
              inputType="password"
              name="pwd"
              ph="Password"
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "password")
              }
              lengthMin={12}
            />
          </div>
        </div>
        <div className="grid-display">
          <label htmlFor="userPass">Confirm Password: </label>
          <div className="revealPsw">
            <Input
              inputType="password"
              name="pwd"
              ph="Confirm Password"
              change={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e, "confirmPassword");
                // must place this here since it has the same delay if placed above with register()
                dispatch({ type: "PWD", payload: e.target.value });
              }}
              lengthMin={12}
            />
            <span onClick={showPSW}>
              <i className="fas fa-eye"></i>
            </span>
            <span onClick={showPSW}>
              <i className="fas fa-eye-slash"></i>
            </span>
          </div>
        </div>
        <p>
          Must contain 12+ characters, including at least 1 letter, 1 number, 1
          symbol and 1 uppercase.
        </p>
        <div className="submit-buttons">
          <button type="submit" id="registerBtn">
            Sign Up
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default PassInput;
