import React from 'react'
import {  Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const  PrivateRoute = ({component: Component, auth , ...rest}) => {
  return (
    <Route {...rest} render={props => 
       auth.isAuthenticated === true ?(<Component {...props} />):( <Redirect to="/"/> )} />
  );

};
 

PrivateRoute.propTypes = {  
  auth:propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth:state.auth
});

export  default  connect(mapStateToProps)(PrivateRoute);