import Hero from "./components/Hero";
import Demo from "./components/Demo";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <main className="main">
      <div className="app">
        <Hero />
        <Demo />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
};

export default App;
