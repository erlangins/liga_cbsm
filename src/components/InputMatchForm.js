'use client';
import { useState } from 'react';

const InputMatchForm = ({ teams, onSubmit }) => {
  const [teamA, setTeamA] = useState(teams[0]?.name || '');
  const [teamB, setTeamB] = useState(teams[1]?.name || '');
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamA === teamB) {
      alert("Tim A dan B tidak boleh sama!");
      return;
    }
    onSubmit({ teamA, teamB, scoreA: Number(scoreA), scoreB: Number(scoreB) });
    setScoreA(0);
    setScoreB(0);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="row g-2 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Tim A</label>
          <select className="form-select" value={teamA} onChange={(e) => setTeamA(e.target.value)}>
            {teams.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <label className="form-label">Skor</label>
          <input type="number" className="form-control" value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
        </div>
        <div className="col-md-1 text-center">vs</div>
        <div className="col-md-1">
          <label className="form-label">Skor</label>
          <input type="number" className="form-control" value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Tim B</label>
          <select className="form-select" value={teamB} onChange={(e) => setTeamB(e.target.value)}>
            {teams.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100" type="submit">Simpan</button>
        </div>
      </div>
    </form>
  );
};

export default InputMatchForm;