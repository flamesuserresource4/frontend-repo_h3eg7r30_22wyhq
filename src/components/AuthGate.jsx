import { useEffect, useMemo, useState } from 'react';
import { User, Shield, LogIn, UserPlus, LogOut } from 'lucide-react';
import HomeContent from './HomeContent';

// Local storage helpers
const LS_USERS = 'elearn_users';
const LS_CURRENT = 'elearn_current_user';

function loadUsers() {
  try {
    const raw = localStorage.getItem(LS_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function loadCurrent() {
  try {
    const raw = localStorage.getItem(LS_CURRENT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCurrent(user) {
  if (user) localStorage.setItem(LS_CURRENT, JSON.stringify(user));
  else localStorage.removeItem(LS_CURRENT);
}

export default function AuthGate() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [users, setUsers] = useState(() => loadUsers());
  const [current, setCurrent] = useState(() => loadCurrent());

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveCurrent(current);
  }, [current]);

  // Forms state
  const [regData, setRegData] = useState({ name: '', email: '', role: 'siswa', password: '' });
  const [logData, setLogData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const hasUsers = users.length > 0;

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (regData.password !== 'admin') {
      setError('Kata sandi harus "admin".');
      return;
    }
    if (!regData.name.trim() || !regData.email.trim()) {
      setError('Nama dan email wajib diisi.');
      return;
    }
    if (users.some((u) => u.email.toLowerCase() === regData.email.toLowerCase())) {
      setError('Email sudah terdaftar. Silakan login.');
      return;
    }
    const newUser = {
      id: crypto.randomUUID(),
      name: regData.name.trim(),
      email: regData.email.trim().toLowerCase(),
      role: regData.role,
      // password is always 'admin' (not stored for simplicity)
      stats: { score: 0, attempts: 0, correct: 0 },
    };
    const next = [...users, newUser];
    setUsers(next);
    setInfo('Pendaftaran berhasil. Silakan masuk dengan email terdaftar dan password "admin".');
    setTab('login');
    setRegData({ name: '', email: '', role: 'siswa', password: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!hasUsers) {
      setError('Belum ada akun terdaftar. Silakan daftar terlebih dahulu.');
      setTab('register');
      return;
    }
    if (logData.password !== 'admin') {
      setError('Kata sandi salah. Gunakan "admin".');
      return;
    }
    const user = users.find((u) => u.email.toLowerCase() === logData.email.toLowerCase());
    if (!user) {
      setError('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      setTab('register');
      return;
    }
    setCurrent(user);
  };

  const logout = () => {
    setCurrent(null);
    setLogData({ email: '', password: '' });
  };

  const updateUserStats = (delta) => {
    // delta: { scoreChange, correctIncrement, attemptsIncrement }
    setUsers((prev) => {
      const next = prev.map((u) =>
        u.id === current.id
          ? {
              ...u,
              stats: {
                score: Math.max(0, (u.stats?.score || 0) + (delta.scoreChange || 0)),
                attempts: (u.stats?.attempts || 0) + (delta.attemptsIncrement || 0),
                correct: (u.stats?.correct || 0) + (delta.correctIncrement || 0),
              },
            }
          : u
      );
      const updated = next.find((u) => u.id === current.id);
      setCurrent(updated);
      return next;
    });
  };

  if (current) {
    return (
      <section id="beranda" className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Selamat datang</p>
                <p className="font-semibold text-slate-900">{current.name} • <span className="capitalize">{current.role}</span></p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>

          <HomeContent
            user={current}
            onScore={(payload) => {
              // payload: { correct: boolean, points: number }
              updateUserStats({
                scoreChange: payload.points,
                correctIncrement: payload.correct ? 1 : 0,
                attemptsIncrement: 1,
              });
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="masuk" className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <LogIn size={18} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Masuk</h2>
            </div>
            {!hasUsers && (
              <p className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
                Belum ada akun terdaftar. Silakan daftar terlebih dahulu di sebelah kanan.
              </p>
            )}
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  value={logData.email}
                  onChange={(e) => setLogData({ ...logData, email: e.target.value })}
                  placeholder="nama@sekolah.sch.id"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Kata Sandi</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  value={logData.password}
                  onChange={(e) => setLogData({ ...logData, password: e.target.value })}
                  placeholder="admin"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Gunakan password: <span className="font-semibold">admin</span></p>
              </div>
              {error && <p className="text-sm text-rose-600">{error}</p>}
              {info && <p className="text-sm text-emerald-700">{info}</p>}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                disabled={!hasUsers}
              >
                <LogIn size={16} /> Masuk
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <UserPlus size={18} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Daftar</h2>
            </div>
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  placeholder="Nama lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  placeholder="nama@sekolah.sch.id"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Peran</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <label className={`flex items-center gap-2 rounded-md border p-2 cursor-pointer ${regData.role === 'siswa' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="siswa"
                      checked={regData.role === 'siswa'}
                      onChange={(e) => setRegData({ ...regData, role: e.target.value })}
                    />
                    <span className="text-sm">Siswa</span>
                  </label>
                  <label className={`flex items-center gap-2 rounded-md border p-2 cursor-pointer ${regData.role === 'guru' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="guru"
                      checked={regData.role === 'guru'}
                      onChange={(e) => setRegData({ ...regData, role: e.target.value })}
                    />
                    <span className="text-sm">Guru</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Kata Sandi</label>
                <div className="relative">
                  <input
                    type="password"
                    className="mt-1 w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    placeholder="admin"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500">admin</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Untuk demo, password wajib: <span className="font-semibold">admin</span></p>
              </div>

              {error && <p className="text-sm text-rose-600">{error}</p>}
              {info && <p className="text-sm text-emerald-700">{info}</p>}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                <Shield size={16} /> Daftar
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-3">Sudah punya akun? Silakan masuk di panel sebelah kiri.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
