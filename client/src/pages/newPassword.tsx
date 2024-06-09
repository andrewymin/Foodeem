import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import PassInput from "../components/PassInput";

function ResetPassPage() {
  const { setNewPassword } = useAuth();
  const { token } = useParams();

  useEffect(() => {
    // 4/29 commented for testing
    // authCheck();
  }, []);

  return (
    <div>
      <PassInput axiosCall={setNewPassword(token)} />
    </div>
  );
}

export default ResetPassPage;
