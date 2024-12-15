import { useEffect } from "react";
import { GET } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { usePharmacyStore } from "../store/pharmacyStore";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setPharmacy } = usePharmacyStore();
  useEffect(() => {
    async function getUser() {
      try {
        const response = await GET("/pharmacy/me");
        setPharmacy(response.data.pharmacy);
      } catch (error) {
        navigate("/login-pharmacy");
        console.log(error.message);
      }
    }
    getUser();
  }, [setPharmacy, navigate]);
  return <>{children}</>;
};

export default AuthProvider;
