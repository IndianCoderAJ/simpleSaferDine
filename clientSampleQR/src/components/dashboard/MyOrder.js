import React, { Component } from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import  Spinercust  from '../comman/spiner';
import {getOrderDetails , setSingleOrder,CheckoutServer,errorsset ,resetStore} from '../../actions/menuActions';
import Navbar from './Navbar';


export class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myorder:null,
            finalCost:null
        }
        this.CheckoutFunc = this.CheckoutFunc.bind(this);      
     }
    
     componentDidMount(){
         this.props.getOrderDetails(this.props.auth.customer);
     }

     SingleOrderDetails(Mysingleorder) {
         this.props.setSingleOrder(Mysingleorder,this.props.history);

     }
     componentWillReceiveProps(nextProps) {
          // if token get expired then go to home page
        if(nextProps.errors.isAuthenticate) {
            this.props.resetStore(this.props.history);
        }

       if(nextProps.menuData.myorder) {
           this.setState({
            myorder:nextProps.menuData.myorder
           })
       }       
     
       if(nextProps.errors.checkout){
            this.setState({errors:nextProps.errors.checkout},( ) => {
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

     }

    CheckoutFunc() {
        this.props.CheckoutServer(this.props.auth.customer,this.props.history); 
     }  
    render() {
    const {loading} = this.props.menuData;
       let myorder = this.state.myorder;
       let myorderContext;        
       if(myorder ===null || loading) {
           myorderContext= <Spinercust />
       }else if(myorder.length === 0){
            return(
            <React.Fragment>
            <ReactNotification />
           <Navbar />
             <h1 style={{textAlign:"center",margin:"20%",color:"red"}}>My Order is Empty</h1> 
            </React.Fragment>    
             )  
       }else {
     
        myorderContext = myorder.map((item,i) => {
            return (
                <div className="b-recipes" key={item._id}>
                    <div className="row">			
                        <div className="col-lg-12 col-md-12 col-12">
                                <div className="login-form1">

                                    <div className="food-border">
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6">
                                        <div className="recipe-item1"  >
                                            <img src={`${this.props.auth.customer.hostname}${item.productDetails[0].product.image}`}  alt="" />

                                            <div className="overlay">
                                            <div className="recipes-title">	
                                                <h6>{item.Time}</h6>
                                            </div>
                                            </div>
                                            <div className="overlay1">
                                            <div className="recipes-title">	
                                        
                                            <h6>{item.OrderStatus}</h6>
                                            </div>
                                            </div>
                                            <div className="overlay1">
                                                <button type="button"   onClick={() => this.SingleOrderDetails(item)} className="cart-add  btn-link1">Detaails</button>

                                            </div>
                                            <div className="recipes-title">	 
                                                 <h6>{item.TotalCost} ₹</h6>
                                           </div>
                                            
                                    </div>	
                            </div>									
                        </div>
                    </div>
                    </div>
                    </div>	  
                </div>
            
            );
        });

       }
      
        return (
            <React.Fragment>
                 <ReactNotification />
                  <Navbar />
                {myorderContext}
                <div className="b-recipes">
                    <div className="row">			
                        <div className="col-lg-12 col-md-12 col-12">
                                <div className="login-form1">

                                    <div className="food-border">
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6">
                                        <div className="recipe-item1"  >
                                            <h3>Total</h3>
                                            <div className="overlay1">
                                               {this.props.menuData.finalCost}
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay1">
                <button 
                    type="button"
                    onClick={this.CheckoutFunc} 
                    className="login-btn btn-link">Checkout</button>
                 </div>
                
            </React.Fragment>
        )
    }
}

MyOrder.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    tableData:propTypes.object.isRequired,
    getOrderDetails:propTypes.func.isRequired,
    CheckoutServer:propTypes.func.isRequired
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData,
    tableData:state.tableData
});

export default connect(mapStateToProps ,{resetStore, getOrderDetails , setSingleOrder,CheckoutServer,errorsset })(MyOrder)

