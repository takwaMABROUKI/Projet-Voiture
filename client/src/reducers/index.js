import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import voiture from './voiture'


export default combineReducers({
    alert, 
    auth,
    voiture

  });