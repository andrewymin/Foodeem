import axios from "axios";
import React, { useState, useRef } from "react";
import Input from "../components/inputs";
import { Link } from "react-router-dom";
// import Buttons from "../components/button";
import { useAuth } from "../context/AuthContext";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";

function Register() {
  const { register, dispatch } = useAuth();
  const { showError } = useToast();
  // using properties of state instead of actual state values do to delay
  //  from asyncronous updating
  const [state, setState] = useState({
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
    setState({
      // merging previous state to new state object with the "..."
      ...state,
      [n]: e.target.value,
    });
  };

  const checkPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (state.password != state.confirmPassword)
      return showError("Passwords do not match!");
    else {
      //   register();
      console.log("Password matches thus send to server.");
    }
  };

  return (
    <section id="register" className="full-page">
      <div className="signup-wrapper">
        <form className="formInputs" onSubmit={checkPassword}>
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
      </div>

      <div>
        <p>
          Already have an account?{" "}
          <span>
            <Link to={"/login"}>Log in</Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
