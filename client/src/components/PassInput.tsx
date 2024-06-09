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

interface onSuccessCall {
  axiosCall: any;
}

function PassInput(props: onSuccessCall) {
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
    e.preventDefault();
    if (passwordState.password != passwordState.confirmPassword)
      return showError("Passwords do not match!");
    else {
      onSuccessFunction;
    }
  };

  return (
    <>
      <form
        className="formInputs"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          checkPassword(e, props.axiosCall)
        }
      >
        {/* <label htmlFor='userEmail'>UserName: </label>
            <Input inputType="text" name="user" ph="HappyUser01" change={(e)=> setUser(e.target.value)} charLength="0"/> */}
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
          {/* this is for testing purposes */}
          {/* <Input inputType="password" name="userPass" ph="0123abc!#$" change={this.handleChange} charLength="12"/> */}
          {/* this is for testing purposes */}
          {/* <Input inputType="password" name="userPass" ph="0123abc!#$" change={(e: any)=> setPwd(e.target.value)} charLength="3"/> */}
          <div className="revealPsw">
            <Input
              inputType="password"
              name="pwd"
              ph="Password"
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "password")
              }
              lengthMin={3}
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
              lengthMin={3}
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
          Must contain 8+ characters, including at least 1 letter, 1 number, 1
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
