import Hero from "./components/Hero";
import ArticleSummarizer from "./components/ArticleSummarizer";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <main className="main">
      <div className="app">
        <Hero />
        <ArticleSummarizer />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
};

export default App;
