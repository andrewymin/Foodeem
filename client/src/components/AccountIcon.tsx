import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import closeOnClickOutside from "../hooks/closeOnClickOutside";
import { useAuth } from "../context/AuthContext";

function AccountIcon() {
  const { logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [accountClass, setAccountClass] = useState("acct-menu hidden");
  const modalRef = useRef<HTMLUListElement>(null);

  const closeDropdown = () => {
    if (dropdown) {
      setAccountClass("acct-menu hidden");
      setDropdown(false);
    }
  };

  const openDropdown = () => {
    if (!dropdown) {
      setAccountClass("acct-menu visible");
      setDropdown(true);
    }
  };

  //   const test = () => {
  //     console.log("testing");
  //   };

  closeOnClickOutside(modalRef, () => closeDropdown());

  return (
    <>
      <FaRegUser className="profile-icon" onClick={openDropdown} />
      <ul ref={modalRef} className={accountClass}>
        <li>
          <Link to={"dashboard"}>View Profile</Link>
        </li>
        <hr />
        <li>
          <Link to={"saved-recipes"}>Saved Recipes</Link>
        </li>
        <hr />
        <li className="logout" onClick={logout}>
          Logout
        </li>
        {/* <li className="logout" onClick={test}>
          Logout
        </li> */}
      </ul>
    </>
  );
}

export default AccountIcon;
