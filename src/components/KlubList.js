'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

export default function KlubList() {
  const [klub, setKlub] = useState([]);

  const fetchKlub = async () => {
    try {
      const res = await axios.get("https://fanny.id/cbsm_get_club.php");
      setKlub(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKlub();
  }, []);

  return (
    <div className="p-3">
      <Table striped={false} // Nonaktifkan stripe
            bordered={false} // Nonaktifkan border default
            size="sm" 
            className="text-white" 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
              border: '1px solid rgba(255, 255, 255, 0)',
              '--bs-table-bg': 'transparent' // Override CSS variable Bootstrap
            }}>
        <thead>
          <tr className="text-center text-white">
            <th className="text-white text-center">#</th>
            <th className="text-white text-start">Anggota</th>
            <th className="text-white text-start">Nama Klub</th>
          </tr>
        </thead>
        <tbody>
          {klub.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">Tidak ada data klub</td>
            </tr>
          ) : (
            klub.map((item, index) => (
              <tr key={item.id_klub}>
                <td className="ms-2 text-center text-white">{index + 1}</td>
                <td className="ms-2 text-white">{item.anggota}</td>                
                <td className="ms-2 text-white">
                  <img
                    src={`${item.logo}`}
                    width="20"
                    className="rounded-circle me-1"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-logo.png'; // fallback jika logo tidak ada
                    }}
                  /> 
                  {item.nama_klub}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
