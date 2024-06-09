import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckCookieExists from "./checkCookie";

function Protected() {
  const { state } = useAuth();

  return state.isAuth ? <Outlet /> : <Navigate to="/" replace={true} />;
}

function ProtectVerifyRoute() {
  const verifyToken = CheckCookieExists("verifyToken");

  return verifyToken ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export { Protected, ProtectVerifyRoute };
