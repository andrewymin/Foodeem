import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

function Social() {
  return (
    <div id="social">
      <ul>
        <li title="Facebook">
          <a title="facebook" href="https://www.facebook.com">
            <FaFacebookF size={28} />
          </a>
        </li>
        <li title="Instagram">
          <a title="instagram" href="https://www.instagram.com">
            <BsInstagram size={28} />
          </a>
        </li>
        <li title="Twitter">
          <a title="twitter" href="https://twitter.com">
            <i className="fa-brands fa-x-twitter fa-xl"></i>{" "}
            {/* Once react-icons updates twitter icon, change to use that package*/}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Social;
