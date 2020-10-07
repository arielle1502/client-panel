import { createFirestoreInstance } from 'redux-firestore';
import firebase from './db';
import rrfConfig from './rrfConfig';
import store from '../store';

const rrfProps ={
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default rrfProps;