import React from 'react';
import { BrowserRouter as Router,Route ,Switch}  from 'react-router-dom'; 
import { Provider } from 'react-redux';
import jwt_decoder from 'jwt-decode';
import './App.css';

// import setAuthToken from './utils/setAuthToken';
// import {setCurrentCustomer } from './actions/authActions';
import  store  from './store';

import Scategory from'./components/Scategory';
import Scatlist from'./components/Scatlist';
import SimpleDescp from './components/SimpleDescp';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <Route exact path="/" component = { Scategory }/>
    <Route exact path="/scatlist" component = { Scatlist }/>
    <Route exact path="/Productdetails"component = {SimpleDescp} />
    </Router>
    </Provider>
  );
}

export default App;
