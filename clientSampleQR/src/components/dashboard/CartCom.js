import React, { Component } from 'react'
import propTypes from 'prop-types';
import ReactNotification from 'react-notifications-component'
import { connect } from 'react-redux';
import Navbar from './Navbar';
import  Spinercust  from '../comman/spiner';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import '../css/cart.css'

import {getcartServer , updateQuantity , updateCart ,placeOrderServer ,errorsset ,resetStore} from '../../actions/menuActions';

 class CartCom extends Component {
    constructor(props) {
        super(props);
        this.state ={
            tempCart:null,
            TotalCost:0,
            errors:[],
            quantity:''
        }
        this.onChange = this.onChange.bind(this);
        this.placeOrder = this.placeOrder.bind(this);

    }
    

    onChange(e){
        let tempCart = this.state.tempCart ;
        let quantity = 0;
        tempCart[e.target.dataset.id][e.target.name] = e.target.value ;
        let TotalCost = 0 ;
        tempCart.forEach(function (arrayItem) {
            if(arrayItem.quantity ==='') {
                quantity = 1;
            } else {
                quantity = parseFloat(arrayItem.quantity)
            }
            TotalCost = parseFloat(TotalCost) +  (parseFloat(arrayItem.product.price) * parseFloat(quantity) );
            if(isNaN(TotalCost)) {
                TotalCost = this.state.TotalCost
            }
        });
        this.props.updateQuantity(tempCart,TotalCost)

    } 

     //for quantity button
     addone(qut) {
        let tempCart = this.state.tempCart ;
        let quantity = 0;
        let TotalCost = 0 ;
        tempCart[`${qut}`].quantity = parseInt(tempCart[`${qut}`].quantity) + 1; 
        tempCart.forEach(function (arrayItem) {
            if(arrayItem.quantity ==='') {
                quantity = 1;
            } else {
                quantity = parseFloat(arrayItem.quantity)
            }
            TotalCost = parseFloat(TotalCost) +  (parseFloat(arrayItem.product.price) * parseFloat(quantity) );
            if(isNaN(TotalCost)) {
                TotalCost = this.state.TotalCost
            }
        });
        this.props.updateQuantity(tempCart,TotalCost)   
    }
    minusone(qut) {
        let tempCart = this.state.tempCart ;
        if( tempCart[`${qut}`].quantity > 1) {
            let quantity = 0;
            let TotalCost = 0 ;
            tempCart[`${qut}`].quantity = parseInt(tempCart[`${qut}`].quantity) - 1; 
            tempCart.forEach(function (arrayItem) {
                if(arrayItem.quantity ==='') {
                    quantity = 1;
                } else {
                    quantity = parseFloat(arrayItem.quantity)
                }
                TotalCost = parseFloat(TotalCost) +  (parseFloat(arrayItem.product.price) * parseFloat(quantity) );
                if(isNaN(TotalCost)) {
                    TotalCost = this.state.TotalCost
                }
            });
            this.props.updateQuantity(tempCart,TotalCost) 
          }
        }

    Cartremove(productID,cart) {
        var removeIndex =cart.map(function(item) { return item._id; }).indexOf(productID);
        cart.splice(removeIndex, 1);
        // this.setState( { tempCart:cart });

        let tempCart = cart ;
        let TotalCost = 0 ;
        tempCart.forEach(function (arrayItem) {
            TotalCost = parseFloat(TotalCost) +  (parseFloat(arrayItem.product.price) * parseFloat(arrayItem.quantity) );
        });
        // this.setState( { 
        //     TotalCost:TotalCost} );
        this.props.updateCart(cart,TotalCost)
            store.addNotification({
                title: "Success",
                message: "Product Removed.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              });    
    }

    componentDidMount() {
        this.props.getcartServer(this.props.auth.customer.tablenumberber);

    }
     
    placeOrder() {

      let cart = [...this.state.tempCart];
      let TotalCost = this.state.TotalCost;
      let customer = this.props.auth.customer;
      this.props.placeOrderServer(cart,customer,this.props.history,TotalCost);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors}, () => {
                if(this.state.errors.orderPlace) {
                    store.addNotification({
                        title: "Danger!",
                        message: this.state.errors.orderPlace,
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
        
        // if token get expired then go to home page
        if(nextProps.errors.isAuthenticate) {
            this.props.resetStore(this.props.history);
        }

        if(nextProps.tableData.cart) {
            this.setState({
                tempCart:nextProps.tableData.cart,
                TotalCost:nextProps.tableData.TotalCost

            })
        }
    }
    render() {
        const  { loading } = this.props.tableData;

        let cartContent ;
        if(this.state.tempCart === null || loading ){
            cartContent = <Spinercust />
        } else if(this.state.tempCart === 'empty'){
                 return(
                    <React.Fragment>
                    <ReactNotification />
                   <Navbar />
                     <h1 style={{textAlign:"center",margin:"20%",color:"red"}}>Cart is Empty</h1> 
                </React.Fragment>    
                 )  
        } else {
            
            cartContent = this.state.tempCart.map((item,i) => {
                return (

               <div className="individual-cart-main" key={item.product._id} >
                 <div className="img-cart">
                  <img className="img-cart-src" src={`${this.props.auth.customer.hostname}${item.product.image}`}  alt="" />
                 </div>
                 <div className="cart-details">
                   <div className="name-cart">
                     {item.product.name}
                     <div className="quantity1 buttons_added1">
                        <input 
                        onClick ={() => this.minusone(`${i}`)}
                        type="button" 
                        name='minus'
                        value="-"
                        className="minus1"
                        /><input 
                        onChange ={this.onChange}
                        onClick ={this.onChange}
                        type="number" 
                        step="1" min="1" max="" 
                        title="Qty"
                        data-id = {i}
                        name="quantity"
                        id="quantity"
                        className="input-text qty text1" 
                        value={item.quantity}
                        onChange ={this.onChange}
                        size="4" pattern="" 
                        inputMode=""/>
                        <input 
                        type="button" 
                        value="+" 
                        className="plus1"
                        onClick ={() => this.addone(`${i}`)}
                        />   
                    </div> 
                   </div>
                   <div className="remove-cart">
                    <button type="button" className="remove-cart-button  btn btn-success"   onClick={() => this.Cartremove(item._id,this.state.tempCart)}>Remove</button>
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
                 <div className="cart-main">
                   {cartContent} 
                   <div className="total-main">
                     <h4 className="total-heading">Total</h4>
                     <h2 className="total-price">₹ {this.state.TotalCost}</h2>
                   </div> 
                   <div className="place-main">
                       <button 
                        type="button"
                        onClick={this.placeOrder} 
                        className="btn btn-success place-btn">Place Order
                        </button>
                   </div>  
               	 
                 </div> 
               	
            </React.Fragment>
        )
    }
}

CartCom.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    tableData:propTypes.object.isRequired,
    getcartServer:propTypes.func.isRequired,
    updateQuantity:propTypes.func.isRequired,
    updateCart:propTypes.func.isRequired
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData,
    tableData:state.tableData
});

export default connect(mapStateToProps,{ getcartServer , updateQuantity ,updateCart , placeOrderServer, errorsset , resetStore})(CartCom);