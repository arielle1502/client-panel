import React, { Fragment, useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore, useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EditClient = (props) => {

  const [clientDetails, setClientDetails] = useState({
    firstName: '',
    lastName: '',
    balance: '',
    email:'',
    phone:''
  })

  //Get our variables set up
  const { firstName, lastName, balance, email, phone } = clientDetails;
  const id = props.match.params.id;
  const firestore = useFirestore();
  const history = useHistory();

  useFirestoreConnect(props => [
    {
    collection: 'clients',
    doc: id
  }
  ], connect((state, props)=> ({
    clients: state.firestore.data.clients
  }))
  )
  const { clients } = props;

  useEffect(() => {
    if (clients) {
      //pulling out the client we need. as we have an ordered array, the doc with our id will be in the first element of the array
      const client = clients[0];
      //update the sate with the client data
      setClientDetails({
      firstName: client.firstName,
      lastName: client.lastName,
      balance: client.balance,
      email:client.email,
      phone:client.phone
      })
    }
  }, [clients])

  const onSubmit = (e) => {
    e.preventDefault();
    
    //update our client in teh databse
    firestore.collection('clients').doc(id).update(clientDetails)
    .then(() => console.log('client updated'));

    history.push('/');
  }

  const onChange = (e) =>  setClientDetails({
    ...clientDetails, [e.target.name]: e.target.value
  });

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
        <Card.Header>Edit Client</Card.Header>
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
  withFirestore,
  connect((state) => ({
    clients: state.firestore.ordered.clients
  }))
)

export default enhance(EditClient);
