import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProofBar from "./components/ProofBar";
import Problem from "./components/Problem";
import ReviewOffer from "./components/ReviewOffer";
import Process from "./components/Process";
import Solutions from "./components/Solutions";
import CaseStudies from "./components/CaseStudies";
import Engagements from "./components/Engagements";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofBar />
        <Problem />
        <ReviewOffer />
        <Process />
        <Solutions />
        <CaseStudies />
        <Engagements />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
