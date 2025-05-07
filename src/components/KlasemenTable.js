'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge } from "react-bootstrap";

export default function KlasemenTable() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("https://fanny.id/cbsm_get_klasemen.php").then(res => {
      setTeams(res.data);
    });
  }, []);

  // Fungsi render ikon berdasarkan huruf W/D/L
  const renderFormIcons = (formArray) => {
    return formArray.map((f, idx) => {
      let icon = '';
      let color = '';
      if (f === 'W') {
        icon = '';
        color = 'success';
      } else if (f === 'D') {
        icon = '';
        color = 'secondary';
      } else if (f === 'L') {
        icon = '';
        color = 'danger';
      }

      return (
        <span
          key={idx}
          className={`badge bg-${color} rounded-circle d-inline-flex align-items-center justify-content-center me-1`}
          style={{ width: 15, height: 15, fontSize: '0.75rem' }}
          title={f}
        >
          {icon}
        </span>
      );
    });
  };

  return (
    <div className="row mt-4">
      {/* Kolom kiri (4 kolom) */}
      <div className="col-md-4 mb-3">
        {/* Tambahkan konten di sini jika ada */}
        <div className="card bg-dark text-white">
          <img
            src="/images/banner_kotak.jpeg"
            className="card-img-top"
            alt="Banner"
            style={{
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-banner.jpg'; // fallback jika URL error
            }}
          />
        </div>
      </div>

      {/* Kolom kanan (8 kolom) */}
      <div className="col-md-8">
        <div className="table-responsive">
          <Table
            striped={false}
            bordered={false}
            size="sm"
            className="text-white text-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
              border: '1px solid rgba(255, 255, 255, 0)',
              '--bs-table-bg': 'transparent'
            }}
          >
            {/* Tabel klasemen seperti sebelumnya */}
            <thead>
              <tr>
                <th className="text-white">#</th>
                <th className="text-start text-white">TEAM</th>
                <th className="text-start text-white">CLUB</th>
                <th className="text-white">M</th>
                <th className="text-white">W</th>
                <th className="text-white">D</th>
                <th className="text-white">L</th>
                <th className="text-white">GF</th>
                <th className="text-white">GA</th>
                <th className="text-white">GD</th>
                <th className="text-white">PTS</th>
                <th className="text-white text-start">LAST 5</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={t.name}>
                  <td className="text-white">{i + 1}</td>
                  <td className="text-white text-start">{t.anggota}</td>
                  <td className="text-white text-start">
                    <img
                      src={`${t.logo}`}
                      width="20"
                      className="rounded-circle me-1"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-logo.png';
                      }}
                    />
                    {t.name}
                  </td>
                  <td className="text-white">{t.played}</td>
                  <td className="text-white">{t.win}</td>
                  <td className="text-white">{t.draw}</td>
                  <td className="text-white">{t.lose}</td>
                  <td className="text-white">{t.gf}</td>
                  <td className="text-white">{t.ga}</td>
                  <td className="text-white">{t.gf - t.ga}</td>
                  <td className="text-white fw-bold">{t.points}</td>
                  <td className="text-white text-start">
                    {renderFormIcons(t.form || [])}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>

  );
}
