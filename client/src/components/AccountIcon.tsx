import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { closeOnClickOutside } from "../hooks/modalRefs";
import { useAuth } from "../context/AuthContext";

function AccountIcon() {
  const { logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [accountClass, setAccountClass] = useState("acct-menu hidden");
  const modalRef = useRef<HTMLUListElement>(null);

  const closeDropdown = () => {
    setAccountClass("acct-menu hidden");
    setDropdown(false);
  };

  const openDropdown = () => {
    if (dropdown) {
      setAccountClass("acct-menu hidden");
      setDropdown(false);
    } else {
      setAccountClass("acct-menu visible");
      setDropdown(true);
    }
  };

  // this will run before the onClick
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
      </ul>
    </>
  );
}

export default AccountIcon;
