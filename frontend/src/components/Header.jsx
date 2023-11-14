import { Link } from "react-router-dom";
import logo from "../assets/elemen5-paysage.png";
import { UseSearch } from "../contexts/SearchContext";

function Header() {
  const searchContext = UseSearch();
  return (
    <header id="header">
      <div className="container t-center">
        <Link
          to="/"
          onClick={() => {
            searchContext.setPageNumber(1);
          }}
        >
          <img className="header-logo" src={logo} alt="logo elemen5" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
