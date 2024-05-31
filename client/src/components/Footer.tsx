import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link className="about" to={"about"}>
            About
          </Link>
        </li>
        <li>
          <Link className="contact" to={"contact"}>
            Contact
          </Link>
        </li>
      </ul>
      <p className="copyright">© 2024 Foodiem. All rights reserved</p>
    </footer>
  );
}

export default Footer;
