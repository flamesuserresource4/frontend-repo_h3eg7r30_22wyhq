import { BookOpen, Star, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 text-xs font-semibold">
              <Star size={14} /> Platform Belajar Madrasah
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              E-Learning Madrasah Aliyah Hidayatul Islamiyah
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Belajar kapan saja dan di mana saja. Akses materi, tugas, dan ujian
              secara terstruktur dengan bimbingan guru-guru terbaik.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#program"
                className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Mulai Belajar
              </a>
              <a
                href="#tentang"
                className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Lihat Program
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">30+</p>
                <p className="text-xs text-slate-500">Guru</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-xs text-slate-500">Siswa Aktif</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-slate-900">1000+</p>
                <p className="text-xs text-slate-500">Materi & Tugas</p>
              </div>
            </div>
          </div>

          <div>
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-emerald-400/10" />
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <div className="flex items-center gap-3 rounded-lg bg-white/90 px-4 py-3 shadow">
                  <div className="rounded-md bg-emerald-600 p-2 text-white">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Kelas Digital Interaktif</p>
                    <p className="text-xs text-slate-500">Materi, video, dan kuis terintegrasi</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow">
                <Users size={14} /> Akses untuk Siswa & Guru
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
