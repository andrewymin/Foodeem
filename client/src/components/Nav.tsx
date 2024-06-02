import { Link } from "react-router-dom";
import HamburgerIcon from "./Menu";
// import { useEffect } from "react";

function Nav() {
  return (
    <div id="heading">
      <nav>
        <div>
          <h3 className="brand">
            <Link to={"/"}>foodiem</Link>
          </h3>
        </div>
        <HamburgerIcon />
        <ul className="navbar-w navbar">
          <li>
            <Link className="recipes" to={"recipes"}>
              Recipes
            </Link>
          </li>
          <li>
            <Link to={"login"}>Login</Link>
          </li>
          <li>
            <Link to={"register"}>Sign up</Link>
          </li>
          {/* <li>
            <Link className="about" to={"about"}>
              About
            </Link>
          </li>
          <li>
            <Link className="contact" to={"contact"}>
              Contact
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
