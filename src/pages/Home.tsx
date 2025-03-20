
import MissionSection from '../components/MissionSection';
import HeroSection from '../components/herosec';
import StateSection from '../components/StateSection';
import StudentSection from '../components/StudentSection';
import InstitutionSection from '../components/InstitutionSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div>
      <HeroSection />
      <MissionSection />
      <StateSection />
      <StudentSection />
      <InstitutionSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;