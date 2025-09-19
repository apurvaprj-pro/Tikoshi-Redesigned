import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InfoBar from "../components/InfoBar";
import CategoryGrid from "../components/CategoryGrid";
import OriginalBrands from "../components/OriginalBrands";
import Recommended from "../components/Recommended";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <InfoBar />
      <CategoryGrid />
      <OriginalBrands />
      <Recommended />
    </>
  )
}

export default Home;