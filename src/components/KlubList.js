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
      <h5 className="mb-3">Daftar Klub</h5>
      <Table bordered hover size="sm" responsive>
        <thead className="table-secondary">
          <tr className="text-center">
            <th>#</th>
            <th>Anggota</th>
            <th>Nama Klub</th>
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
                <td className="ms-2 text-center">{index + 1}</td>
                <td className="ms-2">{item.anggota}</td>                
                <td className="ms-2">
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
