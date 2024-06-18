import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  const { state, userDataFetch } = useAuth();
  // const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false); // Track active tab
  // console.log(cat);

  useEffect(() => {
    userDataFetch();
  }, [navigate]);

  const openConfirm = () => {
    console.log("use ref to open and close modal to make things easy");
  };

  const email = "place email";

  return (
    <div id="dashboard">
      <h1>Profile</h1>
      <div className="dashboard-info">
        <h2>Email: </h2>
        <h2>{email}</h2>
        <h2>Reset Password: </h2>
        <button>Reset password</button>
      </div>

      <button className="del-acct" onClick={openConfirm}>
        Delete Account
      </button>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
