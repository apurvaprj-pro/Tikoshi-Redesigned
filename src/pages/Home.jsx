import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InfoBar from "../components/InfoBar";
import CategoryGrid from "../components/CategoryGrid";
import BestDeal from "../components/BestDeal";
import Recommended from "../components/Recommended";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <InfoBar />
      <CategoryGrid />
      <BestDeal />
      <Recommended />
      <Footer />
    </>
  )
}

export default Home;