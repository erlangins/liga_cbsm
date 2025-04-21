// src/app/page.js
'use client';
import { useState } from 'react';
import KlubForm from '../components/KlubForm';
import KlubList from '../components/KlubList';
import JadwalForm from '../components/JadwalForm';
import JadwalList from '../components/JadwalList';
import InputHasilForm from '../components/InputHasilForm';
import KlasemenTable from '../components/KlasemenTable';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [activePage, setActivePage] = useState('klub');

  const handleRefresh = () => setRefresh(!refresh);

  const renderContent = () => {
    switch (activePage) {
      case 'klub':
        return (
          <section>
            <div className="card shadow">
              <div className="card-header fw-semibold">Manajemen Klub</div>
              <div className="card-body">
                <KlubForm onSuccess={handleRefresh} />
                <hr />
                <KlubList key={refresh} />
              </div>
            </div>
          </section>
        );
      case 'jadwal':
        return (
          <section>
            <div className="card shadow">
              <div className="card-header fw-semibold">Jadwal Pertandingan</div>
              <div className="card-body">
                <JadwalForm onSuccess={handleRefresh} />
                <hr />
                <JadwalList refresh={refresh} />
              </div>
            </div>
          </section>
        );
      case 'hasil':
        return (
          <section>
            <div className="card shadow">
              <div className="card-header fw-semibold">Input Hasil Pertandingan</div>
              <div className="card-body">
                <InputHasilForm onSubmitSuccess={handleRefresh} />
              </div>
            </div>
          </section>
        );
      case 'klasemen':
        return (
          <section>
            <div className="card shadow">
              <div className="card-header fw-semibold">Klasemen Sementara</div>
              <div className="card-body">
                <KlasemenTable />
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100 position-fixed">
          <div className="sidebar-sticky pt-4">
            <h5 className="text-center">Menu</h5>
            <ul className="nav flex-column px-3">
              <li className="nav-item">
                <button className={`nav-link btn btn-link text-secondary text-start ${activePage === 'klub' ? 'fw-bold' : ''}`} onClick={() => setActivePage('klub')}>Manajemen Klub</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn btn-link text-secondary text-start ${activePage === 'jadwal' ? 'fw-bold' : ''}`} onClick={() => setActivePage('jadwal')}>Jadwal</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn btn-link text-secondary text-start ${activePage === 'hasil' ? 'fw-bold' : ''}`} onClick={() => setActivePage('hasil')}>Hasil</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn btn-link text-secondary text-start ${activePage === 'klasemen' ? 'fw-bold' : ''}`} onClick={() => setActivePage('klasemen')}>Klasemen</button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 offset-md-2 pt-4">
          <h2 className="text-center mb-4 p-2 rounded-3 bg-secondary text-white fw-bold text-danger">⚽️ CBSM SUPER LEAGUE - APRIL 2025</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}