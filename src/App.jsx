import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoursesGrid from './components/CoursesGrid';
import Footer from './components/Footer';
import { ShieldCheck } from 'lucide-react';

function About() {
  return (
    <section id="tentang" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Tentang Platform</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              E-Learning MA Hidayatul Islamiyah dirancang untuk memfasilitasi proses belajar
              mengajar yang efektif dan kolaboratif. Siswa dapat mengakses materi, mengumpulkan
              tugas, berdiskusi dengan guru, serta mengikuti evaluasi secara daring.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600" size={18}/> Materi terkurasi sesuai kurikulum</li>
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600" size={18}/> Penilaian berbasis tugas dan kuis</li>
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600" size={18}/> Akses aman untuk siswa dan guru</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-white" />
              <div className="relative z-10 flex h-full items-center justify-center p-6">
                <div className="rounded-lg bg-white p-5 shadow border border-slate-100 text-center max-w-sm">
                  <p className="text-sm font-semibold text-slate-900">Belajar Lebih Fokus</p>
                  <p className="mt-1 text-xs text-slate-600">Semua materi, tugas, dan nilai terorganisir dalam satu tempat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <CoursesGrid />
        <About />
      </main>
      <Footer />
    </div>
  );
}
