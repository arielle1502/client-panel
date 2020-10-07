import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Import custom components 
import Clients from '../clients/Clients';
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <Row>
      <Col md={10}>
        <Clients />
      </Col>
      <Col md={2}>
        <Sidebar />
      </Col>
    </Row>
  )
}

export default Dashboard;