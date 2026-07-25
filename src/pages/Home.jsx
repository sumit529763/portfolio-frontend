import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const Home = () => {
  return (
    <div className="bg-white pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Home;