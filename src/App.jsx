import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import About from './components/About';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Preloader from './components/Preloader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar />
          <Hero />
          <Destinations />
          <Quiz />
          <About />
          <Footer />
          <Chatbot />
        </>
      )}
    </div>
  );
}

export default App;
