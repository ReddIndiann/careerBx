import HeroSection from '../components/herosec';
import MissionSection from '../components/MissionSection';
import StateSection from '../components/StateSection';
// import StudentSection from '../components/StudentSection';
// import InstitutionSection from '../components/InstitutionSection';
import TestimonialSection from '../components/TestimonialSection';
import SchoolTestBanner from '../components/SchoolTestBanner';
import BlogPreview from '../components/BlogPreview';
// import Footer from '../components/Footer';
import CombinedSection from '../components/CombinedSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SchoolTestBanner />
      <MissionSection />
      <StateSection />
      <CombinedSection />
      {/* <StudentSection />
      <InstitutionSection /> */}
      <TestimonialSection />
  
      <BlogPreview />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;