import MissionSection from '../components/MissionSection';
import HeroSection from '../components/herosec';
import StateSection from '../components/StateSection';
import TestimonialSection from '../components/TestimonialSection';
import SchoolTestBanner from '../components/CountryTestBanner';
import CombinedSection from '../components/CombinedSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SchoolTestBanner />
      <MissionSection />
      <StateSection />
      <CombinedSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;