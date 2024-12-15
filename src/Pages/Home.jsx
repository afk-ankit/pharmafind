import { useNavigate } from "react-router-dom";
import Feature1 from "../components/Feature1";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import WhyUsSection from "../components/WhyUsSection";
import { usePharmacyStore } from "../store/pharmacyStore";

const Home = () => {
  const navigate = useNavigate();
  const { pharmacy } = usePharmacyStore();
  if (pharmacy) navigate("/inventory");
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Feature1 />
      <WhyUsSection />
      <TeamSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
