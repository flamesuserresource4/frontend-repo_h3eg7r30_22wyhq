import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuizArrange from './components/QuizArrange';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <QuizArrange />
      </main>
      <Footer />
    </div>
  );
}
