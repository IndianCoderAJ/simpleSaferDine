import React, { Component } from 'react'
import Navbar from './Navbar';
import ReactNotification from 'react-notifications-component'
// import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';

export class ShareOtp extends Component {
    render() {
        return (
            <React.Fragment>
            <ReactNotification />
           <Navbar />
        <h1 style={{textAlign:"center",margin:"20%",color:"red"}}>{this.props.auth.customer.shareOTP}</h1> 
        </React.Fragment>    
        )
    }
}


const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData,
    tableData:state.tableData
});

export default connect(mapStateToProps)(ShareOtp)

