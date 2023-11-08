import { Outlet } from "react-router-dom";
import Headroom from "react-headroom";
import Navbar from "../../components/Navbar";
import { SearchContextProvider } from "../../contexts/SearchContext";

function DefaultTemplate() {
  return (
    <SearchContextProvider>
      <Headroom>
        <Navbar />
      </Headroom>
      <Outlet />
    </SearchContextProvider>
  );
}

export default DefaultTemplate;
