import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import EventsGrid from "./components/EventsGrid";
import Stats from "./components/Stats";
import FeaturedColleges from "./components/FeaturedColleges";
import FeaturedEvents from "./components/FeaturedEvents";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">

      <Navbar />

      <Hero />

      <SearchSection />

      <FeaturedEvents />

      <EventsGrid />

      <Stats />

      <FeaturedColleges />

      <HowItWorks />

      <CTA/>

      <Footer/>

      

    </div>
  );
}

export default App;