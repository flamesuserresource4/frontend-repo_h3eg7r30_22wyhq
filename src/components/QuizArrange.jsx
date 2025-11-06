import { useMemo, useState } from 'react';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizArrange() {
  // Contoh soal: menyusun kata menjadi kalimat yang benar
  const correctSentence = useMemo(
    () => ['Bahasa', 'Indonesia', 'adalah', 'bahasa', 'persatuan', 'kita.'],
    []
  );

  const [pool, setPool] = useState(() => shuffle(correctSentence));
  const [placed, setPlaced] = useState(Array(correctSentence.length).fill(null));
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null

  const reset = () => {
    setPool(shuffle(correctSentence));
    setPlaced(Array(correctSentence.length).fill(null));
    setResult(null);
  };

  const onDragStart = (e, word, origin, index) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ word, origin, index }));
  };

  const handleDropToSlot = (e, slotIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    // Jika slot sudah terisi, abaikan
    if (placed[slotIndex]) return;

    if (data.origin === 'pool') {
      // Ambil dari pool
      const newPool = [...pool];
      // Cari index kata yang sesuai (gunakan index dari dragStart agar akurat)
      newPool.splice(data.index, 1);
      const newPlaced = [...placed];
      newPlaced[slotIndex] = data.word;
      setPool(newPool);
      setPlaced(newPlaced);
      setResult(null);
    } else if (data.origin === 'slot') {
      // Pindahkan dari slot lain
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
  };

  return (
    <section id="quiz" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Kuis Menyusun Kata</h2>
          <p className="mt-2 text-slate-600">
            Seret satu per satu kata dari kotak bawah ke kotak urutan untuk membentuk kalimat yang benar.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-800">Susun Kalimat:</p>

          {/* Target Slots */}
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

          {/* Pool */}
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

          {/* Actions */}
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
              <RotateCcw size={16} /> Ulangi
            </button>
            {result === 'correct' && (
              <span className="inline-flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                <CheckCircle size={18} /> Benar! Kalimat sudah tersusun dengan tepat.
              </span>
            )}
            {result === 'wrong' && (
              <span className="inline-flex items-center gap-2 text-rose-600 text-sm font-semibold">
                <XCircle size={18} /> Belum tepat, coba periksa kembali urutannya.
              </span>
            )}
            {result === 'incomplete' && (
              <span className="text-amber-600 text-sm font-semibold">Susunan belum lengkap.</span>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Tips: Anda bisa menyeret kata dari slot kembali ke kotak kata untuk mengubah urutan.
        </div>
      </div>
    </section>
  );
}
