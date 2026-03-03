import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import About from './components/About';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Destinations />
      <Quiz />
      <About />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
