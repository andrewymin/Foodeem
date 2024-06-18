import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { customAxios, isAxiosError } from "../hooks/axiosInstance";
// import { notifyError } from "../components/notifications";
import { ToastContainer } from "react-toastify";
import useToast from "../components/Toastify";

const VerificationCode = ({ length = 6 }) => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const MAX_AGE = 180000; // in ms thus 3min
  const { showError } = useToast();
  // State to hold the code's values
  const [code, setCode] = useState(Array(length).fill(""));
  // References to input fields
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Check if user is allowed to see this page, i.e. if they clicked sign-in or just tried to use url
  useEffect(() => {
    // place setTimeout for max_age of token and useHistory from
    //  react-router-dom history.push('/') for the verify page
    //  to redirect to home
    const verifyPageTime = setTimeout(() => {
      navigate("/");
    }, MAX_AGE);

    return () => {
      clearTimeout(verifyPageTime);
    };
  }, [navigate]);

  const onComplete = async (userCode: string) => {
    // Send an axios call to server to check if mongo User code matches
    console.log(userCode);
    try {
      await customAxios
        .post("verification/verifyCode", {
          userCode: userCode,
        })
        .then((res) => {
          // code was verified thus set isAuth to true
          dispatch({ type: "IS_AUTH", payload: res.data.isAuth });
          dispatch({ type: "ALLOW_VERIFY", payload: res.data.allowVerify });
          // console.log(res.data.msg);
          // sending to home page since the cookie for auth will be created on B.E.
          navigate(`/`);
        });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          // Server responded with a status other than 2xx
          // toastify will only work with toastContainer! don't forget
          showError(error.response.data);
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

  const requestCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(state.user, state.pwd);
    try {
      await customAxios.post("verification/newCode").then((res) => {
        // dispatch({ type: "IS_AUTH", payload: res.data.isAuth });
        console.log(res.data.msg);
      });
    } catch (error) {
      if (isAxiosError(error)) {
        // `error` is an AxiosError
        console.error("Error message: ", error.message);
        console.error("Error message: ", error.code);
        if (error.response) {
          // Server responded with a status other than 2xx
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
    }
  };

  // Handle changes in the input fields
  const handleChange = (value: string, index: number) => {
    // Validate numeric input
    if (/^\d$/.test(value) || value === "") {
      // Update the code array with the new value
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // If input is not empty and there are more inputs, focus on the next input
      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      // Check if the code is complete
      if (newCode.join("").length === length) {
        onComplete(newCode.join(""));
      }
    }
  };

  // Handle key down events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move focus to the previous input if the backspace key is pressed and the current field is empty
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <section id="verify-code">
      <div className="verification-input">
        <div className="verification-info">
          <h1>Verify Your Identity</h1>
        </div>
        <form className="verification-code">
          <p>
            A verification code has been sent to the provided email. Enter the
            code to continue and be redirected.
          </p>
          <div className="input-boxes">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="code-input"
              />
            ))}
          </div>
          <button onClick={requestCode}>Resend code</button>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
};

export default VerificationCode;
