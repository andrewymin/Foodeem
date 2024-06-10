import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerIcon from "./Menu";
import { useAuth } from "../context/AuthContext";
import { FaRegUser } from "react-icons/fa";

function Nav() {
  const { state, logout, authCheck } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    authCheck();
  }, []);

  const account = () => {
    navigate("/dashboard");
  };

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
          {!state.isAuth ? (
            <>
              <li>
                <Link to={"login"}>Login</Link>
              </li>
              <li>
                <Link to={"register"}>Sign up</Link>
              </li>
            </>
          ) : (
            <>
              <button onClick={logout}>Logout</button>
              <button onClick={account}>
                <FaRegUser />
              </button>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
