import React, { useState } from "react";
// import { FaHamburger } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/Bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function HamburgerIcon() {
  const [burgerClass, setBurgerClass] = useState("burger unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isMenuOpen) {
      setBurgerClass("burger clicked");
      setMenuClass("menu visible");
      setIsMenuOpen(true);
    } else {
      setBurgerClass("burger unclicked");
      setMenuClass("menu hidden");
      setIsMenuOpen(false);
    }

    // console.log("clicked");
  };

  // const navActive = (e: any) => {
  //   const heading = document.getElementById("heading");
  //   !heading?.classList.contains("navBgColor") &&
  //     heading?.classList.add("navBgColor");

  //   // add page current class for visability for what page user is on
  //   e.target.classList.add("p-current");
  //   const navList = document.querySelectorAll(".navbar-w a");
  //   navList.forEach((i) => {
  //     if (i != e.target) {
  //       i.classList.remove("p-current");
  //     }
  //   });
  //   toggleDropdown();
  // };

  const closeMenu = () => {
    toggleDropdown();
  };

  const stopEarlyClose = (e: React.MouseEvent<HTMLElement>) => {
    // stop early closing of menu
    e.stopPropagation();
  };

  return (
    <div className="menu-btn">
      <BiMenuAltRight
        onClick={toggleDropdown}
        className={burgerClass}
        size={30}
      />
      {/* <div className={`blur ${menuClass}`}></div> */}
      <div className={menuClass} onClick={closeMenu}>
        <AiOutlineClose onClick={toggleDropdown} className="close-icon" />
        <div className="navbar-a" onClick={stopEarlyClose}>
          <ul className="navbar">
            <li>
              <Link to={"recipes"} onClick={toggleDropdown}>
                Recipes
              </Link>
            </li>
            <li>
              <Link to={"about"} onClick={toggleDropdown}>
                About
              </Link>
            </li>
            <li>
              <Link to={"contact"} onClick={toggleDropdown}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HamburgerIcon;
