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
    <div className="mt-4">
      <div className="table-responsive">
        <Table striped bordered hover size="sm" className="text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>TEAM</th>
              <th>CLUB</th>
              <th>M</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
              <th>HISTORY</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={t.name}>
                <td>{i + 1}</td>
                <td className="text-start">{t.anggota}</td>
                <td className="text-start">
                  <img
                    src={`${t.logo}`}
                    width="20"
                    className="rounded-circle me-1"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-logo.png'; // fallback jika logo tidak ada
                    }}
                  />
                  {t.name}
                </td>
                <td>{t.played}</td>
                <td>{t.win}</td>
                <td>{t.draw}</td>
                <td>{t.lose}</td>
                <td>{t.gf}</td>
                <td>{t.ga}</td>
                <td>{t.gf - t.ga}</td>
                <td className="fw-bold">{t.points}</td>
                <td className="text-start">{renderFormIcons(t.form || [])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
