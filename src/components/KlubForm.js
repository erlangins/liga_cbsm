'use client';

import { useState } from "react";
import axios from "axios";

export default function KlubForm({ onSuccess }) {
  const [nama, setNama] = useState("");
  const [anggota, setAnggota] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim() || !anggota.trim()) return;

    try {
      await axios.post("https://fanny.id/cbsm_add_club.php", { nama, anggota, logo });
      setNama("");
      setAnggota("");
      setLogo("");
      onSuccess(); // refresh
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan klub");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Team Players"
          value={anggota}
          style={{ border: '1px solid #CCC' }}
          onChange={(e) => setAnggota(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Club Name"
          value={nama}
          style={{ border: '1px solid #CCC' }}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="url club icon"
          value={logo}
          style={{ border: '1px solid #CCC' }}
          onChange={(e) => setLogo(e.target.value)}
        />
        <button className="btn btn-danger" type="submit">
          Add Team
        </button>
      </div>
    </form>
  );
}
