import React, { useState, useEffect } from "react";
import Input from "../components/inputs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import { customAxios, AxiosError } from "../components/axiosInstance";
import { getGoogleUrl, GoogleSignInButton } from "../oauth_Urls/getGoogleUrl";
import { getGithubUrl } from "../oauth_Urls/getGithubUrl";
import useToast from "../components/Toastify";

function Login() {
  const { login, dispatch, state } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { showError, showSuccess } = useToast();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    login();
  }

  interface ServerError {
    errorMsg: string;
  }

  const sendEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // showSuccess(`Sent link to: ${state.user}`);
    try {
      await customAxios
        .post("api/user/reset-password-link", {
          userID: state.user,
        })
        .then((res) => {
          // console.log(res);
          showSuccess(res.data.successMsg);
          setOpenModal(false);
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const customError: ServerError = error.response.data;
          showError(customError.errorMsg);
        } else {
          console.error("An error occured:", error.message);
        }
      }
    }
  };

  //   showError(error.response.data.errorMsg);

  const showPSW = () => {
    const eye = document.querySelector(".fa-eye");
    const eyeClose = document.querySelector(".fa-eye-slash");
    eyeClose?.classList.toggle("hide");
    eye?.classList.toggle("show");

    const psw = document.querySelector(".pwd");
    const type = psw?.getAttribute("type") === "password" ? "text" : "password";
    psw?.setAttribute("type", type);
  };

  const registerPage = () => {
    navigate("/register");
  };

  const resetModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <section id="login" className="full-page">
      <div className="authTypes">
        {/* <a className="gg" href={getGoogleUrl()}>
          Log in with Google
        </a> */}
        <GoogleSignInButton />
        <a className="gh" href={getGithubUrl()}>
          <i className="fa-brands fa-github"></i>
          <p>Log in with Github</p>
        </a>
      </div>
      <div className="loginSection signup-wrapper">
        <form className="formInputs" onSubmit={handleSubmit}>
          <label htmlFor="user">User ID </label>
          <Input
            inputType="email"
            name="email"
            ph="User ID"
            change={(e) => dispatch({ type: "USER", payload: e.target.value })}
            lengthMin={0}
          />
          <div className="forgotPass">
            <label htmlFor="pwd">Password </label>
            <p onClick={resetModal}>Forgot Password?</p>
          </div>

          <div className="revealPsw loginPass">
            <Input
              inputType="password"
              name="pwd"
              ph="Password"
              change={(e) => dispatch({ type: "PWD", payload: e.target.value })}
              lengthMin={3}
            />
            <span onClick={showPSW}>
              <i className="fas fa-eye"></i>
            </span>
            <span onClick={showPSW}>
              <i className="fas fa-eye-slash"></i>
            </span>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <span>
            <Link to={"/register"}>Sign up</Link>
          </span>
        </p>
      </div>
      <div className={`bg-cover ${openModal ? "open" : "close"}`}></div>
      <div className={`${openModal ? "open" : "close"}`}>
        <div id="modal">
          <button type="button" onClick={resetModal}>
            ❌
          </button>
          <form onSubmit={sendEmail}>
            <label htmlFor="user">Email: </label>
            <Input
              inputType="email"
              name="user"
              ph="User ID"
              change={(e) =>
                dispatch({ type: "USER", payload: e.target.value })
              }
              lengthMin={0}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
