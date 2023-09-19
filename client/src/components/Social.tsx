import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

function Social() {
  return (
    <div id="social">
      <ul>
        <li title="Facebook">
          <a href="#">
            <FaFacebookF size={28} />
          </a>
        </li>
        <li title="Instagram">
          <a href="#">
            <BsInstagram size={28} />
          </a>
        </li>
        <li title="Twitter">
          <a href="#">
            <i className="fa-brands fa-x-twitter fa-xl"></i>{" "}
            {/* Once react-icons updates twitter icon, change to use that package*/}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Social;
