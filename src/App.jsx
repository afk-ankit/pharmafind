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

const App = () => {
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
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
