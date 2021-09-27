
import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import Navbar from './components/layout/navbar'
import Navbar from './components/layout/navbar'
import Login from './components/auth/login'
import SignUp from './components/auth/register'
import Voitures from './components/voitures/voitures'
import Voiture from './components/voiture/voiture'
import Alert from './components/dashbord/alert'
import { loadUser } from './actions/auth'
import './App.css';
// redux
import {Provider} from 'react-redux'
import store from './store.js'
import setAuthToken from './tools/setAuthtoken'
import Landing from './components/layout/landing'
import PrivateRoute from './components/routing/PrivateRoute'
import VoitureHome from './components/layout/VoitureHome'


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const  App = () =>{
 useEffect(() => {
   store.dispatch(loadUser())
 },  [])

  return(
  <Provider store={store}>
    
  <Router>
<Fragment>
<Navbar/>

   <Alert/>
<Switch>
  <Route exact path="/register" component={SignUp}/>
  <Route exact path="/login" component={Login}/>
  <Route exact path="/voiture" component={VoitureHome}/>
  <Route exact path="/" component={Landing} />
  <PrivateRoute exact path="/List" component={Voitures} />
  <PrivateRoute exact path="/List/:id" component={Voiture} />


</Switch>
 
 
</Fragment>
</Router>
</Provider>

  )}
export default App;
