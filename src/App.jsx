import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGate from './components/AuthGate';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <AuthGate />
      </main>
      <Footer />
    </div>
  );
}
