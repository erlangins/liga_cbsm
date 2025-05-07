'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form } from "react-bootstrap";

export default function JadwalList({ refresh }) {
  const [jadwal, setJadwal] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const res = await axios.get("https://fanny.id/cbsm_get_jadwal.php");
    setJadwal(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Filter data berdasarkan searchQuery
  const filteredJadwal = jadwal.filter((j) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      j.tanggal.toLowerCase().includes(searchLower) || 
      j.klub_a.toLowerCase().includes(searchLower) || 
      j.klub_b.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container-fluid">
      {/* ✅ Banner Image Row */}
      <div className="row mb-4">
        <div className="col-12">
          <img
            src="/images/header.png" // pastikan file ada di public/images/banner.jpg
            alt="Banner Jadwal"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: '330px',
              objectFit: 'cover',
              objectPosition: '50% 10%',
              width: '100%',
            }}
          />
        </div>
      </div>
      
      {/* Filter Search Input */}
      <div className="mb-3 text-white">
        <Form.Control 
          type="text"           
          className="search-jadwal"
          placeholder="Cari berdasarkan Tanggal, Nama Klub atau Nama Team..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // hitam transparan
            color: 'white',
            border: '0px solid white'            
          }}
        />
      </div>

      <div
        className="table-responsive"
        style={{
          maxHeight: '400px',          // Atur tinggi maksimum (bisa disesuaikan)
          overflowY: 'auto',           // Scroll vertikal aktif jika konten melebihi tinggi
          border: '1px solid rgba(255, 255, 255, 0.2)', // Tambahan opsional agar terlihat batasnya
        }}
      >
        <Table striped={false} // Nonaktifkan stripe
          bordered={false} // Nonaktifkan border default
          size="sm" 
          className="text-white text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
            border: '1px solid rgba(255, 255, 255, 0)',
            '--bs-table-bg': 'transparent' // Override CSS variable Bootstrap
          }}
        >
          <thead>
            <tr className="text-center">
                <th className="p-2 text-white">#</th>
                <th className="p-2 text-white">Tanggal</th>
                <th className="text-end p-2 text-white">Klub A</th>
                <th className="p-2 text-white">Skor</th>
                <th className="text-start p-2 text-white">Klub B</th>
            </tr>
          </thead>
          <tbody>
            {filteredJadwal.map((j, index) => (
              <tr className="text-center" key={j.id_jadwal}>
                <td className="text-white">{index + 1}</td>
                <td className="text-white">{j.tanggal}</td>
                <td className="text-end text-white">{j.anggota_a} ({j.klub_a})</td>
                <td className="text-white">
                    <img
                        src={`${j.logo_a}`}
                        width="20"
                        className="float-rounded-circle me-3"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-logo.png'; // fallback jika logo tidak ada
                        }}
                    />
                    {j.skor_a !== null ? j.skor_a : '-'} vs {j.skor_b !== null ? j.skor_b : '-'}

                    <img
                        src={`${j.logo_b}`}
                        width="20"
                        className="rounded-circle ms-3"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-logo.png'; // fallback jika logo tidak ada
                        }}
                    />
                </td>                
                <td className="text-start text-white">{j.anggota_b} ({j.klub_b})</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}