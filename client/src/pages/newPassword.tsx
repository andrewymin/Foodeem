// import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import PassInput from "../components/PassInput";

function ResetPassPage() {
  const { setNewPassword } = useAuth();
  const { token } = useParams();

  return (
    <section id="resetPass">
      <div className="signup-wrapper">
        <PassInput axiosCall={setNewPassword} newPassToken={token} />
      </div>
    </section>
  );
}

export default ResetPassPage;
