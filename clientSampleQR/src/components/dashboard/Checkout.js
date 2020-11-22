import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { CheckoutServer , errorsset ,resetStore} from '../../actions/menuActions';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

export class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer:this.props.auth.customer,
            errors:null
        }
         this.CheckoutFunc = this.CheckoutFunc.bind(this);   
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors.checkout){
            console.log(nextProps.errors.checkout);
                this.setState({errors:nextProps.errors.checkout},( ) => {
                    console.log("hii");
                    store.addNotification({
                        title: "Danger!",
                        message: this.state.errors,
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
                })
            
           this.props.errorsset();       
        }
         // if token get expired then go to home page
         if(nextProps.errors.isAuthenticate) {
            this.props.resetStore(this.props.history);
        }
    }
    CheckoutFunc(customer){
        this.props.CheckoutServer(customer,this.props.history);
        
    }

    render() {
   let customer = this.props.auth.customer;
        return (
          <React.Fragment>
            <ReactNotification />
              <Navbar/>
              <button 
                type="button"
                onClick={() => this.CheckoutFunc(customer)} 
                className="login-btn btn-link">Checkout</button>	
          </React.Fragment>
        )
    }
}

Checkout.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    CheckoutServer:propTypes.func.isRequired,
    errorsset:propTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
});

export default connect (mapStateToProps, { CheckoutServer, errorsset,resetStore } )(Checkout)
