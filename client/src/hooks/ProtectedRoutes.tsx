import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import CheckCookieExists from "./checkCookie";

function Protected() {
  const { state } = useAuth();

  return state.isAuth ? <Outlet /> : <Navigate to="/" replace={true} />;
}

function ProtectVerifyRoute() {
  const { state } = useAuth();

  // const verifyToken = CheckCookieExists("verifyToken");
  // console.log(state.allowVerify);
  return state.allowVerify ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export { Protected, ProtectVerifyRoute };
