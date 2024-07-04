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
    // get current single path and replace '/' with ''
    let path = location.pathname.replaceAll("/", "");
    // get heading
    const heading = document.getElementById("heading");
    // get navbar-wide-screen links
    const navList = document.querySelectorAll(".navbar-w a");
    // check if path not homepage
    if (path != "") {
      // adding background color depending on path
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
    // check if path is homepage
    if (path == "") {
      // get rid of any background styling
      heading?.classList.remove("navBgColor");
      navList.forEach((i) => {
        i.classList.remove("p-current");
      });
    }
    authCheck();
    // rerun on change of url path
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
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Route>
      <Route path="/password-reset/:token" element={<ResetPassPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;
