// rafcp
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

// import redux functions
import {compose} from 'redux';
import { withFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layout/Spinner';

const Clients = ({ clients }) => {
  const [ totalOwed, changeTotal ] = useState(null);
  
// databse listener hook/ pass in the collection we made on console.firebase.google.com
useFirestoreConnect('clients');

useEffect(() => {
  //if we have clients get the total owed
  if (clients) {
    const total = clients.reduce((total, client) =>{
      return total + parseFloat(client.balance.toString())
    }, 0)
    changeTotal(total);
    console.log(total);
  } else{
    changeTotal(0);
  }  
}, [clients]);

if (clients) {
  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <h2>
            <FontAwesomeIcon icon='users' size='lg' />
            {' '}Clients
          </h2>
        </Col>
        <Col md={6}>
          <h5 className='text-right text-secondary'>
            Total Owed: {''}
            <span className="text-primary">
              ${parseFloat(totalOwed).toFixed(2)}
            </span>
          </h5>
        </Col>
      </Row>
      <Table striped>
        <thead className='thead-inverse'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { clients.map(client => (
            <tr key={client.id}>
              <td>{client.firstName}{' '}{client.lastName}</td>
              <td>{client.email}</td>
              <td>{client.balance}</td>
              <td>
                <Link to={`/client/${client.id}`}
                  className="btn btn-secondary text-light">
                  <FontAwesomeIcon icon='question-circle' size='lg' />
                  {' '}Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  )
}else{
  return <Spinner/>
}
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
}

const enhance = compose(
  withFirestore,
  connect((state) => ({
    clients: state.firestore.ordered.clients
  }))
);

export default enhance(Clients);