import { Link } from "react-router-dom";
import logo from "../assets/elemen5-paysage.png";

function Header() {
  return (
    <header id="header">
      <div className="container t-center">
        <Link to="/">
          <img className="header-logo" src={logo} alt="logo elemen5" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
