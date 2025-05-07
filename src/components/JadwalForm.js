'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function JadwalForm({ onSuccess }) {
  const [klubs, setKlubs] = useState([]);
  const [form, setForm] = useState({
    tanggal: '',
    klub_a_id: '',
    klub_b_id: ''
  });

  useEffect(() => {
    axios.get("https://fanny.id/cbsm_get_club.php").then(res => {
      setKlubs(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.klub_a_id === form.klub_b_id) {
      return alert("Tidak boleh lawan diri sendiri!");
    }

    try {
      await axios.post("https://fanny.id/cbsm_add_jadwal.php", form);
      setForm({ tanggal: '', klub_a_id: '', klub_b_id: '' });
      onSuccess();
    } catch (err) {
      console.error("Error saat submit:", err.response?.data || err.message);
      alert("Gagal menyimpan jadwal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2 align-items-center">
        <div className="col-auto">
          <input
            type="date"
            name="tanggal"
            className="form-control input-dark"
            value={form.tanggal}
            onChange={handleChange}
            required
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // hitam transparan
              color: 'white',
              border: '1px solid grey'
            }}
          />
        </div>

        <div className="col">
          <select
            name="klub_a_id"
            className="form-select"
            value={form.klub_a_id}
            onChange={handleChange}
            required
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // hitam transparan
              color: 'white',
              border: '1px solid grey'
            }}
          >
            <option selected>Club (Home)</option>
            {klubs.map(k => (
              <option key={k.id_klub} value={k.id_klub}>
                {k.anggota} - {k.nama_klub}
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto fw-bold text-center text-white">VS</div>

        <div className="col">
          <select
            name="klub_b_id"
            className="form-select"
            value={form.klub_b_id}
            onChange={handleChange}
            required
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // hitam transparan
              color: 'white',
              border: '1px solid grey'
            }}
          >
            <option value="">Club (Away)</option>
            {klubs.map(k => (
              <option key={k.id_klub} value={k.id_klub}>
                {k.anggota} - {k.nama_klub}
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-success">
            Tambah
          </button>
        </div>
      </div>
    </form>
  );
}
