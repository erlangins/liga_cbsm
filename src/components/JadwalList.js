'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function JadwalList({ refresh }) {
  const [jadwal, setJadwal] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("https://fanny.id/cbsm_get_jadwal.php");
    setJadwal(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div>
      <h5 className="mb-3 fw-bold">Daftar Jadwal Pertandingan</h5>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-secondary">
            <tr className="text-center">
                <th className="p-2">#</th>
                <th className="p-2">Tanggal</th>
                <th className="text-end p-2">Klub A</th>
                <th className="p-2">Skor</th>
                <th className="text-start p-2">Klub B</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((j, index) => (
              <tr className="text-center" key={j.id_jadwal}>
                <td>{index + 1}</td>
                <td>{j.tanggal}</td>
                <td className="text-end">{j.anggota_a} ({j.klub_a})</td>
                <td>
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
                <td className="text-start">{j.anggota_b} ({j.klub_b})</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
