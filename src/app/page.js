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
            <div className="card" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // 10% opacity (90% transparan)
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
              <div className="card-header fw-semibold">Daftar Kontestan</div>
              <div className="card-body overflow-auto">
                <KlubForm onSuccess={handleRefresh} />
                <hr />
                <KlubList key={refresh} />
              </div>
            </div>
          </section>
        );
      case 'skor':
        return (
          <section>
            <div className="card" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // 10% opacity (90% transparan)
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
              <div className="card-header fw-semibold">Result</div>
              <div className="card-body overflow-auto">
                <JadwalForm onSuccess={handleRefresh} />                
                <hr />                
                <InputHasilForm onSubmitSuccess={handleRefresh} />
                <JadwalList refresh={refresh} />
              </div>
            </div>
          </section>
        );
      case 'hasil':
        return (
          <section>
            <div className="card" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // 10% opacity (90% transparan)
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
              <div className="card-header fw-semibold">Insert Score</div>
              <div className="card-body overflow-auto">
                <InputHasilForm onSubmitSuccess={handleRefresh} />
                <hr />
                <JadwalList refresh={refresh} />
              </div>
            </div>
          </section>
        );
      case 'klasemen':
        return (
          <section>
            <div className="card" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // 10% opacity (90% transparan)
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.9)'
              }}>
              <div className="card-header fw-semibold text-white">Klasemen Sementara</div>
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

        {/* Header with Menu */}
        <header className="navbar navbar-expand-lg navbar-light p-3">
          <div className="container-fluid">
            <a className="navbar-brand text-white fw-bold" href="#">⚽️ CBSM SUPER LEAGUE</a>

            {/* Menu for mobile */}
            <button
              className="btn btn-outline-secondary d-md-none"
              onClick={() => setShowSidebar(true)}
            >
              ☰ Menu
            </button>

            {/* Navbar links for large screens */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {['klub', 'skor', 'klasemen'].map((item) => (
                  <li key={item} className="nav-item">
                    <button
                      className={`nav-link btn btn-link text-white text-start ${activePage === item ? 'fw-bold text-primary' : 'text-secondary'}`}
                      onClick={() => setActivePage(item)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        {/* Sidebar Offcanvas for mobile */}
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

        {/* Main Content */}
        <main className="col-md-12 ms-sm-auto col-lg-12 offset-md-2 px-md-4 pt-4 px-3">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
