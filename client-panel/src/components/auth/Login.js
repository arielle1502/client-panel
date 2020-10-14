import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';

const Login = ({ firebase }) => {
  const [ loginData, setLoginData ] = useState ({
    email: '',
    password: ''
  });
  
  const { email, password } = loginData;
  const history = useHistory();
  
  const onChange = e => setLoginData({
    ...loginData, [e.target.name]: e.target.value
  });
  
  const onSubmit = e => {
    e.preventDefault();
    console.log('Submit - auth');
    // authenticating with firebase - using email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( res => {
        if (res.user ) console.log('logged in');
        history.push('/');
      })
      .catch( e => {
        console.log(e.message);
      })
  }
  
  return (
    <Row>
      <Col md={6} className='mx-auto'>
        <Card>
          <Card.Body>
            <h1 className='text-center pb-4, pt-3'>
              <FontAwesomeIcon icon='lock' className='text-primary' />
              {' '}<span className='text-primary'>Login</span>
            </h1>
            <Form onSubmit={e => onSubmit(e)}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter your password" 
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Button type='submit' variant="primary" className="btn-block">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

const enhance = compose(
  withFirestore,
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))
)

export default enhance(Login);