'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge, Card, Modal, Button } from "react-bootstrap";

export default function KlasemenTable() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [opponents, setOpponents] = useState({ alreadyPlayed: [], notYetPlayed: [] });
  const [loadingOpponents, setLoadingOpponents] = useState(false);

  useEffect(() => {
    axios.get("https://fanny.id/cbsm_get_klasemen.php").then(res => {
      setTeams(res.data);
    });
  }, []);

  const getTeamWithHighestGD = () => {
    if (teams.length === 0) return null;
    return teams.reduce((prev, current) => {
      const prevGD = prev.gf - prev.ga;
      const currentGD = current.gf - current.ga;
      return currentGD > prevGD ? current : prev;
    });
  };

  const highestGDTeam = getTeamWithHighestGD();

  const renderFormIcons = (formArray) => {
    return formArray.map((f, idx) => {
      let color = '';
      if (f === 'W') color = 'success';
      else if (f === 'D') color = 'secondary';
      else if (f === 'L') color = 'danger';

      return (
        <span
          key={idx}
          className={`bg-${color} text-white d-inline-flex align-items-center justify-content-center rounded-circle me-1`}
          style={{
            width: 18,
            height: 18,
            fontSize: '0.6rem',
            fontWeight: 'normal',
            lineHeight: 1,
          }}
          title={f}
        >
          {f}
        </span>
      );
    });
  };

  const handleTeamClick = async (team) => {
    setSelectedTeam(team);
    setLoadingOpponents(true);
    setShowModal(true);
    
    try {
      const response = await axios.get(`https://fanny.id/cbsm_get_lawan.php?klub_id=${team.id_klub}`);
      
      // Ekstrak nama klub dari array objects
      const alreadyPlayed = response.data.sudah_dilawan?.map(opponent => opponent.nama_klub) || [];
      const notYetPlayed = response.data.belum_dilawan?.map(opponent => opponent.nama_klub) || [];
      
      setOpponents({
        alreadyPlayed,
        notYetPlayed
      });
    } catch (error) {
      console.error("Error fetching opponents:", error);
      setOpponents({
        alreadyPlayed: [],
        notYetPlayed: []
      });
    } finally {
      setLoadingOpponents(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
    setOpponents({ alreadyPlayed: [], notYetPlayed: [] });
  };

  return (
    <div className="row mt-4">
      {/* Kartu GD tertinggi */}
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
                  <span className="fw-bold text-warning">{highestGDTeam.anggota}</span>
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

      {/* Tabel Klasemen */}
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
            <thead>
              <tr>
                <th className="text-warning">#</th>
                <th className="text-start text-warning">TEAM PLAYERS</th>
                <th className="text-start text-warning">OPPORTUNIST CLUB</th>
                <th className="text-start text-warning">CTR</th>
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
                  <td className="text-white align-middle">{i + 1}</td>
                  <td className="text-white text-start align-middle">{t.anggota}</td>
                  <td className="text-white text-start align-middle">
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
                    <span
                      className="text-decoration-none cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleTeamClick(t)}
                    >
                      {t.name}
                    </span>
                  </td>
                  <td className="text-white align-middle pe-3">
                    <img
                      src={`${t.negara}`}
                      width="18"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/public/images/default-banner.png';
                      }}
                    />
                  </td>
                  <td className="text-white align-middle">{t.played}</td>
                  <td className="text-white align-middle">{t.win}</td>
                  <td className="text-white align-middle">{t.draw}</td>
                  <td className="text-white align-middle">{t.lose}</td>
                  <td className="text-white align-middle">{t.gf}</td>
                  <td className="text-white align-middle">{t.ga}</td>
                  <td className="text-white align-middle">{t.gf - t.ga}</td>
                  <td className="text-white fw-bold align-middle">{t.points}</td>
                  <td className="text-white text-start pt-0">
                    {renderFormIcons(t.form || [])}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal Dialog */}
      {/* Modal Dialog */}
<Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title style={{ fontSize: '16px' }}>Info Pertandingan: {selectedTeam?.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {loadingOpponents ? (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading opponent data...</p>
      </div>
    ) : (
      <>
        <h6>Sudah Dilawan:</h6>
        <ul className="list-unstyled">
          {opponents.alreadyPlayed.length > 0 ? (
            opponents.alreadyPlayed.map((teamName, idx) => {
              const team = teams.find(t => t.name === teamName);
              return (
                <li key={idx} className="d-flex align-items-center mb-2">
                  {idx + 1}.
                  <img
                    src={team?.logo || '/public/images/default-banner.png'}
                    width="20"
                    height="20"
                    className="rounded-circle me-2"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/public/images/default-banner.png';
                    }}
                  />
                  {teamName} - {team?.anggota}
                </li>
              );
            })
          ) : (
            <li>Tidak ada data</li>
          )}
        </ul>
        
        <h6 className="mt-3">Belum Dilawan:</h6>
        <ul className="list-unstyled">
          {opponents.notYetPlayed.length > 0 ? (
            opponents.notYetPlayed.map((teamName, idx) => {
              const team = teams.find(t => t.name === teamName);
              return (
                <li key={idx} className="d-flex align-items-center mb-2">
                  {idx + 1}.
                  <img
                    src={team?.logo || '/public/images/default-banner.png'}
                    width="20"
                    height="20"
                    className="rounded-circle me-2"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/public/images/default-banner.png';
                    }}
                  />
                  {teamName}
                </li>
              );
            })
          ) : (
            <li>Semua tim sudah dilawan</li>
          )}
        </ul>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Tutup
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}