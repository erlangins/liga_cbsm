'use client';
import { useEffect, useState } from "react";
import axios from "axios";

export default function InputHasilForm({ onSubmitSuccess }) {
  const [jadwal, setJadwal] = useState([]);
  const [tanggalList, setTanggalList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://fanny.id/cbsm_get_jadwal.php").then(res => {
      const belumMain = res.data.filter(j => j.skor_a === null || j.skor_b === null);
      setJadwal(belumMain);

      // Ambil daftar tanggal unik
      const tanggalUnik = [...new Set(belumMain.map(j => j.tanggal))];
      setTanggalList(tanggalUnik);
    });
  }, [onSubmitSuccess]);

  const filteredMatches = selectedDate
    ? jadwal.filter(j => j.tanggal === selectedDate)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMatchId || scoreA === '' || scoreB === '') {
      alert("Lengkapi semua input.");
      return;
    }

    if (parseInt(scoreA) < 0 || parseInt(scoreB) < 0) {
      alert("Skor tidak boleh negatif.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://fanny.id/cbsm_submit_hasil.php", {
        id: selectedMatchId,
        skor_a: parseInt(scoreA),
        skor_b: parseInt(scoreB),
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.success) {
        alert("Hasil pertandingan berhasil disimpan.");
        setSelectedMatchId('');
        setScoreA('');
        setScoreB('');
        setSelectedDate('');
        onSubmitSuccess();
      } else {
        alert("Gagal menyimpan hasil: " + (response.data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Terjadi kesalahan: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Pilih Tanggal */}
      <div className="row g-2 mb-2">
        <div className="col">
          <select className="form-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Pilih Tanggal Pertandingan</option>
            {tanggalList.map((tgl, i) => (
              <option key={i} value={tgl}>{tgl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dropdown Pertandingan */}
      {selectedDate && (
        <div className="row g-2 mb-2">
          <div className="col">
            <select className="form-select" value={selectedMatchId} onChange={(e) => setSelectedMatchId(e.target.value)} required>
              <option value="">Pilih Pertandingan</option>
              {filteredMatches.map((j) => {
                if (!j.anggota_a || !j.anggota_b) return null;
                return (
                  <option key={j.id_jadwal} value={j.id_jadwal}>
                    {j.klub_a} vs {j.klub_b}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}

      {/* Input Skor */}
      {selectedMatchId && (
        <>
          <div className="row g-2 mb-2">
            <div className="col">
              <input type="number" className="form-control" placeholder="Skor Klub A" value={scoreA} onChange={(e) => setScoreA(e.target.value)} required />
            </div>
            <div className="col text-center fw-bold align-self-center">vs</div>
            <div className="col">
              <input type="number" className="form-control" placeholder="Skor Klub B" value={scoreB} onChange={(e) => setScoreB(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Menyimpan..." : "Submit Hasil"}
          </button>
        </>
      )}
    </form>
  );
}
