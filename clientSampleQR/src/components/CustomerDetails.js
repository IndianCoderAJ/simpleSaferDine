import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';


import './css/CustomerDetails.css';
import { errorsset }from '../actions/menuActions';
import { registerCustomer } from '../actions/authActions';

class CustomerDetails extends Component {

    constructor(){
        super();
        this.state = {
            name:'',
            number:'',
            tablenum:'',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState( { [e.target.name]:e.target.value } );
    }
    
    onSubmit(e){
        e.preventDefault();
        let customer = {
            name:this.state.name,
            number:this.state.number,
            tablenum:this.props.auth.QRdata
        }
        //calling the Action
        this.props.registerCustomer(customer,this.props.history);       
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');

     } else if(this.props.auth.QRdata === null) {
        this.props.history.push('/')
      }  
  }   

  componentWillReceiveProps(nextProps) {

            if(nextProps.errors){
              this.setState({
                errors:nextProps.errors,
              },()=>{
               if(this.state.errors.name){
                store.addNotification({
                  title: "Danger!",
                  message: this.state.errors.name,
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
               if(this.state.errors.number){
                store.addNotification({
                  title: "Danger!",
                  message: this.state.errors.number,
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

              })
            }  

    }
    
    render() {
  
        return (
          <React.Fragment>
             <ReactNotification />
              <div className="details-main" >
                <div className='margin' >
                 <h1>Fill Details</h1>
                 <div className='login-form' >
                 <form onSubmit = {this.onSubmit}>									
                      <div className="form-group">
                      <input 
                      type="text"
                        className="signup-form"
                        name="name"
                        id="name" 
                        placeholder="Enter Full Name"
                        value={this.state.name}
                        onChange ={this.onChange}
                        /> 
                                
                      </div>
                      <div className="form-group">
                      <input 
                      type="tel" 
                      className="signup-form"
                      id="number"
                      name="number" 
                      placeholder=" Phone Number"
                      value={this.state.number}
                      onChange ={this.onChange}
                      />
                        </div>
                        <button  className="btn btn-success"
                          type="submit" 
                         >Login</button>									
              </form>	
            </div>
            </div>
        </div>        
          </React.Fragment>
        )
    }
}


CustomerDetails.propTypes = {
  registerCustomer : propTypes.func.isRequired,
  auth:propTypes.object.isRequired,  
  errors:propTypes.object.isRequired,
  errorsset:propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
 auth:state.auth,
 errors:state.errors
});

export default  connect(mapStateToProps,{ registerCustomer,errorsset})(withRouter(CustomerDetails));

