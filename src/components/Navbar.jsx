import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { usePharmacyStore } from "../store/pharmacyStore";
import { GET } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pharmacy, removePharmacy } = usePharmacyStore();
  const navigate = useNavigate();
  return (
    <nav className="navbar sticky top-0 text-black">
      <div className="navbar-left">
        <img src={Logo} alt="PharmaFind Logo" className="navbar-logo" />
        <span className="navbar-brand text-black">PharmaFind</span>
      </div>
      <div className="navbar-right">
        {!pharmacy && (
          <>
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register-pharmacy" className="navbar-link">
              Pharmacy
            </Link>{" "}
          </>
        )}
        {pharmacy && (
          <>
            <Link to="/Inventory" className="navbar-link">
              Inventory
            </Link>
            <Link
              to="#"
              className="navbar-link text-red-500"
              onClick={async () => {
                await GET("/pharmacy/logout");
                removePharmacy();
                navigate("/");
              }}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
