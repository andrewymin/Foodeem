import { useEffect } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./Menu";
import { useAuth } from "../context/AuthContext";
// import { FaRegUser } from "react-icons/fa";
import AccountIcon from "./AccountIcon";

function Nav() {
  const { state, authCheck } = useAuth();

  // useEffect(() => {
  //   authCheck();
  // }, []);

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
            <Link className="recipes underline" to={"recipes"}>
              Recipes
            </Link>
          </li>
          {!state.isAuth ? (
            <>
              <li>
                <Link to={"login"}>Login</Link>
              </li>
            </>
          ) : (
            <>
              <AccountIcon />
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
