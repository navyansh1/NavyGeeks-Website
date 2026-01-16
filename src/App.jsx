import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-16 md:pb-0">
      <Navbar />
      
      {/* Wrapping each component with divs and assigning ids */}
      <div id="hero">
        <Hero />
      </div>
      

      <div id="skills">
        <Skills />
      </div>
      

      <div id="experience">
        <Experience />
      </div>
      
      <div id="education">
        <Education />
      </div>
      
      <div id="portfolio">
        <Portfolio />
      </div>

      <div id="certifications">
        <Certifications />
      </div>
      

      <div id="contact">
        <Contact />
      </div>
      
      
      <Footer />
    </div>
  );
}
