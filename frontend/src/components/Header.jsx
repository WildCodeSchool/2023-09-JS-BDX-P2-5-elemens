import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/elemen5-paysage.png";
import { UseSearch } from "../contexts/SearchContext";

function Header() {
  const searchContext = UseSearch();
  const navigate = useNavigate();

  const handleBack = () => {
    searchContext.setPageNumber(1);
    navigate(-1);
  };

  return (
    <header id="header">
      <div className="container t-center">
        <Link to="/" onClick={handleBack}>
          <img className="header-logo" src={logo} alt="logo elemen5" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
