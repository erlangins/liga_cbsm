'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

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
    <Container fluid className="p-3">
      <Row>
        {/* Left Column - Banner */}
        <Col md={4} className="mb-3 mb-md-0">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <img 
              src="/images/banner_kotak.jpeg" 
              alt="Banner"
              className="img-fluid rounded shadow"
              style={{                
                objectFit: 'cover',
                objectPosition: '50% 10%',
                width: '100%',
              }}
            />
          </div>
        </Col>
        
        {/* Right Column - Table */}
        <Col md={8}>
          <Table striped={false}
                bordered={false}
                size="sm" 
                className="text-white" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
                  border: '1px solid rgba(255, 255, 255, 0)',
                  '--bs-table-bg': 'transparent'
                }}>
            <thead>
              <tr className="text-center text-white">
                <th className="text-white text-center">#</th>
                <th className="text-white text-start">TEAM</th>
                <th className="text-white text-start">CLUB</th>
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
                          e.target.src = '/images/default-banner.png';
                        }}
                      /> 
                      {item.nama_klub}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}