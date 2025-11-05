import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="kontak" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-lg font-semibold text-slate-900">MA Hidayatul Islamiyah</p>
            <p className="mt-2 text-sm text-slate-600">
              Platform pembelajaran digital untuk mendukung proses belajar mengajar secara modern, efektif, dan menyenangkan.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Navigasi</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-emerald-700" href="#beranda">Beranda</a></li>
              <li><a className="hover:text-emerald-700" href="#program">Program</a></li>
              <li><a className="hover:text-emerald-700" href="#tentang">Tentang</a></li>
              <li><a className="hover:text-emerald-700" href="#kontak">Kontak</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Kontak</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><MapPin size={16} /> Alamat madrasah</li>
              <li className="flex items-center gap-2"><Phone size={16} /> 08xx-xxxx-xxxx</li>
              <li className="flex items-center gap-2"><Mail size={16} /> info@mahidayatulislamiyah.sch.id</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Madrasah Aliyah Hidayatul Islamiyah. All rights reserved.</p>
          <p className="text-xs text-slate-500">Dibuat dengan ❤️ untuk pendidikan.</p>
        </div>
      </div>
    </footer>
  );
}
