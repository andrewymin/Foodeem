import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import About from "./pages/About";
import Contact from "./pages/Contact";

function AllRoutes() {
  const [randomRecipe, setrandomRecipe] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  // show user current page by addrress link path, also add bg to header based on link path
  useEffect(() => {
    let path = location.pathname.replaceAll("/", "");
    console.log(location.pathname);
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
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home getRandomRecipe={setrandomRecipe} setIsLoading={setIsLoading} />
        }
      />
      <Route
        path="/recipes"
        element={
          <Recipes
            randomRecipe={randomRecipe}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AllRoutes;
