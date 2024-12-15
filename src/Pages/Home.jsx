import Feature1 from "../components/Feature1";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";
import WhyUsSection from "../components/WhyUsSection";

const Home = () => {
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
