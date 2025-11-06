import { useMemo, useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Award, Star } from 'lucide-react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const bankSoal = [
  ['Bahasa', 'Indonesia', 'adalah', 'bahasa', 'persatuan', 'kita.'],
  ['Sumpah', 'Pemuda', 'menyatukan', 'semangat', 'bangsa', 'Indonesia.'],
  ['Puisi', 'menggunakan', 'bahasa', 'kias', 'yang', 'indah.'],
  ['Kalimat', 'efektif', 'itu', 'singkat', 'padat', 'jelas.'],
];

export default function QuizArrangeScored({ user, onScore }) {
  const correctSentence = useMemo(() => bankSoal[Math.floor(Math.random() * bankSoal.length)], []);

  const [pool, setPool] = useState(() => shuffle(correctSentence));
  const [placed, setPlaced] = useState(Array(correctSentence.length).fill(null));
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | 'incomplete' | null
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const reset = () => {
    const next = bankSoal[Math.floor(Math.random() * bankSoal.length)];
    setPool(shuffle(next));
    setPlaced(Array(next.length).fill(null));
    setResult(null);
  };

  const onDragStart = (e, word, origin, index) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ word, origin, index }));
  };

  const handleDropToSlot = (e, slotIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (placed[slotIndex]) return;

    if (data.origin === 'pool') {
      const newPool = [...pool];
      newPool.splice(data.index, 1);
      const newPlaced = [...placed];
      newPlaced[slotIndex] = data.word;
      setPool(newPool);
      setPlaced(newPlaced);
      setResult(null);
    } else if (data.origin === 'slot') {
      const newPlaced = [...placed];
      newPlaced[data.index] = null;
      newPlaced[slotIndex] = data.word;
      setPlaced(newPlaced);
      setResult(null);
    }
  };

  const handleDropToPool = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (data.origin === 'slot') {
      const newPlaced = [...placed];
      const word = newPlaced[data.index];
      newPlaced[data.index] = null;
      setPlaced(newPlaced);
      setPool([...pool, word]);
      setResult(null);
    }
  };

  const checkAnswer = () => {
    if (placed.some((p) => !p)) {
      setResult('incomplete');
      return;
    }
    const isCorrect = placed.every((w, i) => w === correctSentence[i]);
    setResult(isCorrect ? 'correct' : 'wrong');

    let points = 0;
    if (isCorrect) {
      points = 10 + Math.max(0, 2 * streak);
      setScore((s) => s + points);
      setStreak((s) => s + 1);
    } else {
      points = -2; // penalti kecil
      setScore((s) => Math.max(0, s - 2));
      setStreak(0);
    }
    onScore?.({ correct: isCorrect, points });
  };

  return (
    <section id="quiz" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Kuis Menyusun Kata</h2>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1 text-emerald-700 text-sm font-semibold">
            <Award size={16} /> Skor: {score}
          </div>
          <div className="inline-flex items-center gap-1 text-amber-600 text-sm font-semibold">
            <Star size={16} /> Streak: {streak}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">Seret kata ke slot untuk membentuk kalimat yang benar.</p>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {placed.map((word, idx) => (
          <div
            key={idx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDropToSlot(e, idx)}
            className="h-12 rounded-md border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm text-slate-600"
            aria-label={`Slot ${idx + 1}`}
          >
            {word && (
              <button
                draggable
                onDragStart={(e) => onDragStart(e, word, 'slot', idx)}
                className="max-w-full truncate rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                {word}
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropToPool}
      >
        <p className="text-xs font-medium text-slate-600 mb-2">Kata-kata:</p>
        <div className="flex flex-wrap gap-2">
          {pool.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              draggable
              onDragStart={(e) => onDragStart(e, word, 'pool', idx)}
              className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-100"
            >
              {word}
            </button>
          ))}
          {pool.length === 0 && (
            <span className="text-xs text-slate-500">Semua kata sudah dipindahkan ke atas.</span>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={checkAnswer}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Cek Jawaban
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RotateCcw size={16} /> Soal Baru
        </button>
        {result === 'correct' && (
          <span className="inline-flex items-center gap-2 text-emerald-700 text-sm font-semibold">
            <CheckCircle size={18} /> Benar! +10 poin{streak > 1 ? ` (bonus ${2 * (streak - 1)})` : ''}
          </span>
        )}
        {result === 'wrong' && (
          <span className="inline-flex items-center gap-2 text-rose-600 text-sm font-semibold">
            <XCircle size={18} /> Belum tepat. -2 poin
          </span>
        )}
        {result === 'incomplete' && (
          <span className="text-amber-600 text-sm font-semibold">Susunan belum lengkap.</span>
        )}
      </div>

      {user?.stats && (
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Skor Total</p>
            <p className="text-xl font-semibold text-slate-900">{user.stats.score}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Percobaan</p>
            <p className="text-xl font-semibold text-slate-900">{user.stats.attempts}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-500">Jawaban Benar</p>
            <p className="text-xl font-semibold text-slate-900">{user.stats.correct}</p>
          </div>
        </div>
      )}
    </section>
  );
}
