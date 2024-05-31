import { Link } from "react-router-dom";
import HamburgerIcon from "./Menu";
import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";

function Nav() {
  const { login, register } = useAuth();

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
            <button type="button" onClick={login}>
              Login
            </button>
          </li>
          <li>
            <button type="button" onClick={register}>
              Sign-up
            </button>
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
