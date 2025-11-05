import { BookOpen, Clock, Shield } from 'lucide-react';

const courses = [
  {
    title: "Al-Qur'an Hadits",
    level: 'Kelas X - XII',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Fiqh',
    level: 'Kelas X - XII',
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Bahasa Arab',
    level: 'Kelas X - XII',
    color: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Matematika',
    level: 'Kelas X - XII',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    title: 'Bahasa Inggris',
    level: 'Kelas X - XII',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    title: 'Sejarah Kebudayaan Islam',
    level: 'Kelas X - XII',
    color: 'from-lime-500 to-green-600',
  },
];

export default function CoursesGrid() {
  return (
    <section id="program" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Program & Mata Pelajaran</h2>
            <p className="mt-2 text-slate-600">Kurikulum terpadu untuk mendukung pembelajaran di Madrasah Aliyah.</p>
          </div>
          <a href="#" className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Lihat semua
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <a
              key={course.title}
              href="#"
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-28 w-full bg-gradient-to-r ${course.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{course.title}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <Shield size={14} /> MIH Official
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{course.level}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><BookOpen size={14} /> Materi</span>
                  <span className="inline-flex items-center gap-1"><Clock size={14} /> Self-paced</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
