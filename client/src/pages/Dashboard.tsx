import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";
import { useData } from "../context/DataContext";
import { deleteConfirm } from "../hooks/modalRefs";

function Dashboard() {
  const { delAcct } = useAuth();
  const { dataState, userDataFetch } = useData();
  // const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false); // seeing if modal is open or not
  const modalRef = useRef<HTMLDivElement>(null);
  // console.log(cat);

  const body = document.querySelector("body");

  useEffect(() => {
    userDataFetch();
  }, []);

  const openConfirm = () => {
    setConfirm(true);
    body?.classList.add("no-scrolling");
  };

  const closeConfirm = () => {
    setConfirm(false);
    body?.classList.remove("no-scrolling");
  };

  const resetPass = () => {
    navigate("reset-password");
  };

  deleteConfirm(modalRef, () => closeConfirm());

  return (
    <div id="dashboard">
      <h1>Profile</h1>
      <div className="dashboard-info">
        <h2>Email: </h2>
        <h2>{dataState.userData?.email}</h2>
        <h2>Google Linked: </h2>
        <h2>{dataState.userData?.googleLink}</h2>
        <h2>Github Linked: </h2>
        <h2>{dataState.userData?.githubLink}</h2>
        <h2>Reset Password: </h2>
        <button onClick={resetPass}>Reset password</button>
      </div>

      <button className="del-acct" onClick={openConfirm}>
        Delete Account
      </button>

      {confirm && (
        <div className="del-modal-wrapper">
          <div className="del-modal" ref={modalRef}>
            <h3>Are you sure you wish to delete your account?</h3>
            <div className="del-btns">
              <button onClick={closeConfirm}>No</button>
              <button onClick={delAcct}>Yes</button>
            </div>
          </div>
          <div className="blur"></div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
