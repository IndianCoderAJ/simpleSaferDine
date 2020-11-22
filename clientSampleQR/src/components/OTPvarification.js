import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

import './css/verification.css';
import { getVerification } from '../actions/authActions';
import { errorsset }from '../actions/menuActions';


 class OTPvarification extends Component {
    constructor(){
       super();
       this.state = {
        pin:'',
        customerID:'',
        requestId:'',
        email:'',
        tablenumber:'',
        auth:{},
        errors:{}
       };

    this.onChange = this.onChange.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);
    }

onChange(e) {
    this.setState({[e.target.name]:e.target.value }); 

 }


 componentDidMount(){
    //  check Authenticated or not 
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
    if(this.props.auth.customer === null){
        this.props.history.push('/');
    }
}   
 
 onSubmit(e) {
     e.preventDefault();
     let pinData = {
        pin:this.state.pin,
        customerID:this.props.auth.customer._id,
        requestId:this.props.auth.customer.requestId,
        tablenumber:this.props.auth.customer.tableNO
     }
     this.props.getVerification(pinData,this.props.history);
 }
 
 componentWillReceiveProps(nextProps) {
     if(nextProps) {
         this.setState({auth:nextProps.auth,errors:nextProps.errors}, () => {
             if(this.state.errors.pinError) {
                store.addNotification({
                    title: "Danger!",
                    message: this.state.errors.pinError,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 1000,
                      onScreen: true
                    }
                  });
                  this.props.errorsset();
             }
         });
     }
 }
 
    render() {

        return (
            <React.Fragment>
              <ReactNotification />
              <div className='verification-main'>
                  <div className="border-verifications">
                     <h1>Verification</h1>
                     <form onSubmit={this.onSubmit}>
                        <div className="login-form">
                        <label htmlFor="pinVerification">Enter the 4 digit PIN Send on Mobile Number/Email Address</label>   									
                            <div className="form-group">
                            <input 
                            type="text" 
                            className="signup-form"
                            name="pin" 
                            id="pin" 
                            placeholder="Enter PIN"
                            value={this.state.pin}
                            onChange ={this.onChange}
                            />
                            </div>
                            <button 
                            type="submit" 
                            className="btn btn-success">
                                Submit
                            </button>								
                        </div>	
                    </form>	
                    <label className="otp">OTP For Demo {this.props.auth.customer.OTP}</label> 	
                  </div>
              </div>
        </React.Fragment>
        )
    }
}

OTPvarification.propTypes = {
    
    getVerification:propTypes.func.isRequired,
    auth:propTypes.object.isRequired, 
    errors:propTypes.object.isRequired,
    errorsset:propTypes.func.isRequired

} 

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
   });

export default connect(mapStateToProps,{ getVerification, errorsset })(withRouter(OTPvarification));