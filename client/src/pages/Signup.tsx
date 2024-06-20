// import axios from "axios";
// import React, { useState, useRef } from "react";
// import Input from "../components/inputs";
import { Link } from "react-router-dom";
// import Buttons from "../components/button";
import { useAuth } from "../context/AuthContext";
// import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";
import PassInput from "../components/PassInput";

function Register() {
  const { register } = useAuth();
  // const { showError } = useToast();
  // using properties of state instead of actual state values do to delay
  //  from asyncronous updating
  // const [state, setState] = useState({
  //   password: "",
  //   confirmPassword: "",
  // });
  //
  // const showPSW = () => {
  //   const eye = document.querySelector(".fa-eye");
  //   const eyeClose = document.querySelector(".fa-eye-slash");
  //   eyeClose?.classList.toggle("hide");
  //   eye?.classList.toggle("show");

  //   const psw = document.querySelectorAll(".pwd");
  //   psw.forEach((i) => {
  //     const type = i?.getAttribute("type") === "password" ? "text" : "password";
  //     i?.setAttribute("type", type);
  //   });
  // };

  // // Using function to handle state property update for both pass inputs
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, n: string) => {
  //   setState({
  //     // merging previous state to new state object with the "..."
  //     ...state,
  //     [n]: e.target.value,
  //   });
  // };

  // const checkPassword = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (state.password != state.confirmPassword)
  //     return showError("Passwords do not match!");
  //   else {
  //     register();
  //   }
  // };

  return (
    <section id="register" className="full-page">
      <div className="signup-wrapper">
        <PassInput axiosCall={register} newPassToken={undefined} />
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
