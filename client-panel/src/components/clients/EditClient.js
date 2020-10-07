import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup, Button, FormControl, Row, Col, ButtonGroup, Card, ListGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClientDetails = () => {
  
  const client = { id: '1', firstName: 'Harry', lastName: 'Riney', email: 'harry@test.com', balance: 45 }
  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <Link to='/' className='btn btn-secondary mb-2'>
            <FontAwesomeIcon icon='arrow-circle-left' size='lg' />
            {' '}Go to Dashboard
          </Link>
        </Col>
        <Col md={6}>
          <ButtonGroup className='btn-group float-right'>
            <Button className='btn btn-info px-3'>
              <Link to={`/client/edit/${client.id}`} className='btn text-light'>Edit</Link>
            </Button>
            <Button className='btn btn-danger ml-1'>
              Delete
            </Button>
          </ButtonGroup>
        </Col>
        <hr />
        <Card>
          <Card.Header>
            <h3>{client.firstName}{' '}{client.lastName}</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8} sm={6}>
                <h4>
                  Client ID:{' '}
                  <span className='text-secondary'>
                    {client.id}
                  </span>
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Fragment>
  )
}

export default ClientDetails