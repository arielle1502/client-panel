import React, { useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

// redux imports
import { compose } from 'redux';
import { withFirestore, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddClient = (props, { clients }) => {
  
  const [clientDetails, setClientDetails ] = useState ({
    firstName: '',
    lastName: '',
    balance: '',
    email: '',
    phone: ''
  });
  
  const { firstName, lastName, balance, email, phone } = clientDetails;
  
//add in database config and listeners
const firestore = useFirestore();
useFirestoreConnect('clients');
const history = useHistory();

  const onChange = e => setClientDetails({
    ...clientDetails, [e.target.name]: e.target.value
  });
  
  const onSubmit = e => {
    e.preventDefault();
    // console.log('Submit clicked');
    // console.log(clientDetails);
    const newClient = clientDetails;

    // if balance is not entered, make it 0
    if (newClient.balance === ''){
      newClient.balance = 0;
    }

    // add the new client to the databse
    firestore.collection('clients').add(newClient)
    .then(()=> console.log('Cleint Added'));
    //redirect user to the dashboard after adding a client
    history.push('/')
  }
  
  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <Link to='/' className="btn btn-secondary mb-2">
            <FontAwesomeIcon icon='arrow-circle-left' size='lg' />
            {' '}Go to Dashboard
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Header>Add Client</Card.Header>
        <Card.Body>
          <Form onSubmit= { e => onSubmit(e)}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your first name'
                name='firstName'
                value={firstName}
                minLength="2"
                onChange={ e => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your last name'
                name='lastName'
                value={lastName}
                minLength="2"
                onChange={ e => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='balance'>
              <Form.Label>Balance:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter the balance'
                name='balance'
                value={balance}
                onChange={ e => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                name='email'
                value={email}
                onChange={ e => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your phone'
                name='phone'
                value={phone}
                onChange={ e => onChange(e)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='btn-block'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

const enhance = compose(
  withFirestore
);

export default enhance(AddClient);