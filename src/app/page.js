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
  const [showSidebar, setShowSidebar] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  const renderContent = () => {
    switch (activePage) {
      case 'klub':
        return (
          <section>
            <div className="card shadow">
              <div className="card-header fw-semibold">Manajemen Klub</div>
              <div className="card-body overflow-auto">
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
              <div className="card-body overflow-auto">
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
              <div className="card-body overflow-auto">
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
              <div className="card-body overflow-auto">
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

        {/* Toggle for mobile */}
        <button
          className="btn btn-outline-secondary d-md-none my-2 ms-3 w-auto"
          onClick={() => setShowSidebar(true)}
        >
          ☰ Menu
        </button>

        {/* Sidebar Offcanvas */}
        <div className={`offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`} tabIndex="-1" style={{ visibility: showSidebar ? 'visible' : 'hidden' }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button type="button" className="btn-close" onClick={() => setShowSidebar(false)}></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column">
              {['klub', 'jadwal', 'hasil', 'klasemen'].map((item) => (
                <li key={item} className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-start ${activePage === item ? 'fw-bold text-primary' : 'text-secondary'}`}
                    onClick={() => {
                      setActivePage(item);
                      setShowSidebar(false);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Desktop */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100 position-fixed">
          <div className="sidebar-sticky pt-4">
            <h5 className="text-center">Menu</h5>
            <ul className="nav flex-column px-3">
              {['klub', 'jadwal', 'hasil', 'klasemen'].map((item) => (
                <li key={item} className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-start ${activePage === item ? 'fw-bold text-primary' : 'text-secondary'}`}
                    onClick={() => setActivePage(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-10 ms-sm-auto col-lg-10 offset-md-2 px-md-4 pt-4">
          <h2 className="text-center mb-4 p-2 rounded-3 bg-secondary text-white fw-bold">
            ⚽️ CBSM SUPER LEAGUE - APRIL 2025
          </h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
