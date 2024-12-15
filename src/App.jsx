import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import HeroSection from "./components/HeroSection";
import SearchResults from "./Pages/SearchResults";

import Register from "./Pages/Register";
import RegisterPharmacy from "./Pages/RegisterPharmacy";
import LoginPharmacy from "./Pages/LoginPharmacy";
import Inventory from "./Pages/Inventory";
import AuthProvider from "./components/AuthProvider";
import AddInventory from "./Pages/AddInventory";
import { usePharmacyStore } from "./store/pharmacyStore";
import { GET } from "./utils/axios";
import { useEffect } from "react";

const App = () => {
  const { setPharmacy } = usePharmacyStore();
  useEffect(() => {
    async function getUser() {
      try {
        const response = await GET("/pharmacy/me");
        setPharmacy(response.data.pharmacy);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, [setPharmacy]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<HeroSection />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register-pharmacy" element={<RegisterPharmacy />} />
        <Route path="/login-pharmacy" element={<LoginPharmacy />} />
        <Route
          path="/inventory"
          element={
            <AuthProvider>
              <Inventory />
            </AuthProvider>
          }
        />
        <Route
          path="/add-inventory"
          element={
            <AuthProvider>
              <AddInventory />
            </AuthProvider>
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
