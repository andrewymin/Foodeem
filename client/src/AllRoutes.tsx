import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerificationCode from "./pages/verify";
import NotFound from "./pages/NotFound";
import { Protected, ProtectVerifyRoute } from "./hooks/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import SavedRecipes from "./pages/SavedRecipes";
import { useAuth } from "./context/AuthContext";
import ResetPassPage from "./pages/newPassword";

function AllRoutes() {
  const location = useLocation();
  const { authCheck } = useAuth();
  // show user current page by addrress link path, also add bg to header based on link path
  useEffect(() => {
    let path = location.pathname.replaceAll("/", "");
    // console.log(location.pathname);
    const heading = document.getElementById("heading");
    const navList = document.querySelectorAll(".navbar-w a");
    // const menuList = document.querySelectorAll(".navbar-a a");
    if (path != "") {
      let navLink = document.querySelector(`.${path}`);
      heading?.classList.add("navBgColor");

      navLink?.classList.add("p-current");
      navList.forEach((i) => {
        if (i != navLink) {
          i.classList.remove("p-current");
        }
      });
      return;
    }
    if (path == "") {
      heading?.classList.remove("navBgColor");
      navList.forEach((i) => {
        i.classList.remove("p-current");
      });
    }
    authCheck();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route element={<ProtectVerifyRoute />}>
        <Route path="/verify" element={<VerificationCode />} />
      </Route>
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassPage />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Route>
      {/* <Route path="/saved-recipes" element={<SavedRecipes />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;
