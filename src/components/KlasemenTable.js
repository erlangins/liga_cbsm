'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge, Card } from "react-bootstrap";

export default function KlasemenTable() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("https://fanny.id/cbsm_get_klasemen.php").then(res => {
      setTeams(res.data);
    });
  }, []);

  // Find team with highest GD
  const getTeamWithHighestGD = () => {
    if (teams.length === 0) return null;
    
    return teams.reduce((prev, current) => {
      const prevGD = prev.gf - prev.ga;
      const currentGD = current.gf - current.ga;
      return currentGD > prevGD ? current : prev;
    });
  };

  const highestGDTeam = getTeamWithHighestGD();

  // Fungsi render ikon berdasarkan huruf W/D/L
  const renderFormIcons = (formArray) => {
    return formArray.map((f, idx) => {
      let color = '';
      if (f === 'W') {
        color = 'success';
      } else if (f === 'D') {
        color = 'secondary';
      } else if (f === 'L') {
        color = 'danger';
      }

      return (
        <span
        key={idx}
        className={`bg-${color} text-white d-inline-flex align-items-center justify-content-center rounded-circle me-1`}
        style={{
          width: 18,
          height: 18,
          fontSize: '0.6rem',         // Ukuran huruf kecil
          fontWeight: 'normal',       // Tidak bold
          lineHeight: 1,
        }}
        title={f}
      >
        {f}
      </span>
      );
    });
  };

  return (
    <div className="row mt-4">
      {/* Kolom kiri (4 kolom) - Team with highest GD */}
      <div className="col-md-4 mb-3">
        <Card className="bg-transparent text-white border-0 shadow">
          <Card.Body className="text-center">
            <Card.Title className="mb-3">Best Goal Difference</Card.Title>
            
            {highestGDTeam ? (
              <div>
                <img
                  src={highestGDTeam.logo}
                  width="250"
                  className="rounded-circle mb-2"
                  style={{ objectFit: 'cover', border: '2px solid #fff' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/public/images/default-banner.png';
                  }}
                />
                <h5 className="mb-1">
                  {highestGDTeam.name} <br /> 
                  <span className="fw-bold text-warning">{highestGDTeam.anggota} </span>
                </h5>
                <Badge bg="danger" className="fs-5 mt-2">
                  GD: {highestGDTeam.gf - highestGDTeam.ga}
                </Badge>
                <div className="mt-2">
                  <small className="d-block">{highestGDTeam.gf} Goals & {highestGDTeam.points} Points</small>
                </div>
              </div>
            ) : (
              <div className="text-muted">Loading team data...</div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Kolom kanan (8 kolom) - Main table */}
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
            {/* Rest of your table code remains the same */}
            <thead>
              <tr>
                <th className="text-warning">#</th>
                <th className="text-start text-warning">TEAM PLAYERS</th>
                <th className="text-start text-warning">OPPORTUNIST CLUB</th>
                <th className="text-warning">M</th>
                <th className="text-warning">W</th>
                <th className="text-warning">D</th>
                <th className="text-warning">L</th>
                <th className="text-warning">GF</th>
                <th className="text-warning">GA</th>
                <th className="text-warning">GD</th>
                <th className="text-warning">PTS</th>
                <th className="text-warning text-start">LAST 5 MATCH</th>
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
                        e.target.src = '/public/images/default-banner.png';
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
                  <td className="text-white text-start pt-0">
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