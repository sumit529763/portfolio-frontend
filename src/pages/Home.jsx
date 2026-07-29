import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import SparkGame from '../components/IgniteGame';
import IgniteGame from '../components/IgniteGame';

const Home = () => {
  return (
    <div className="bg-white pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <IgniteGame />
      <Contact />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Home;