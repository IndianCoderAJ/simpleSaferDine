import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Navbar from './Navbar';
import { ProductDetails , addToCartServer,errorsset, notificationset } from '../../actions/menuActions';

// for notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import { Button,Modal} from 'react-bootstrap';
import '../css/productsDertails.css'
export class ProductDetailsComp extends Component {
    constructor(){
        super();
        this.state = {
            quantity:1,
            errors:null,
            note:'',
            show:false,
            addTocartPrdouct: {},
            notification:null,
        }  
        this.handleShow = this.handleShow.bind(this);
       this.handleClose = this.handleClose.bind(this); 
       this.onSubmit = this.onSubmit.bind(this); 
       this.onChange = this.onChange.bind(this);
      
    }

     //for  quantity button
     addone(qut) {
        console.log(qut);
      this.setState ({
          quantity:parseInt(qut) +  1
      })
    }
    minusone(qut) {
        if(qut > 1) {
            this.setState ({
                quantity:parseInt(qut) -  1
            })
          }
        }

 // for modal
 handleClose(e) {
    this.setState({ show:false });
}
 handleShow(product) {
    this.setState({ show: true,
                   addTocartPrdouct: product 
                  });
}

onChange(e) {
    this.setState({[e.target.name]:e.target.value }); 
}




// for add to cart
onSubmit(e) {
    e.preventDefault(); 
     if(this.state.quantity  < 0) {
        store.addNotification({
            title: "Error!",
            message: "Quantity is Required.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });

     }
     else { 
        let customer = this.props.auth.customer;  
        let addtocartproductdetails = {
            product:this.state.addTocartPrdouct,
            quantity:this.state.quantity,
            note:this.state.note
        }
      this.props.addToCartServer(addtocartproductdetails,customer);
     this.setState({
         quantity:1,
         note:''
     });
     this.props.history.push('/menulist');
     }

}



    render() {
         let item = this.props.menuData.product
    const  { product , loading } = this.props.menuData;

        if(product === null || loading ){
           return (
               <h1>Products not selected</h1>
                          )
        } 
        return (
            <React.Fragment>
                <ReactNotification/>
                <Navbar />
                <div className="main-productDetails">
                  <img className='productImage' src={`${this.props.auth.customer.hostname}${item.image}`} alt=''></img>
                  <div className='description-products'>
                      <h1 className='price-product'>₹ {item.price}</h1>
                      <h3>Description:</h3>
                      {item.description}
                  </div>
                  <div className="Add-to-cart-product">         
                   <button type="button"  className="btn btn-success btn-add" onClick={() => this.handleShow(this.props.menuData.product)} >Add Cart</button>
                 </div>
                </div>
                <Modal  key={item._id}  centered   size="auto" show={this.state.show} onHide={this.handleClose}>
                            <form onSubmit = {this.onSubmit} >  
                                <Modal.Header closeButton>
                                <Modal.Title>{this.state.addTocartPrdouct.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                            
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" style={{color: "black"}}>Quantity</label>
                                    <div className="quantity buttons_added">
                                     <input 
                                     onClick ={() => this.minusone(this.state.quantity)}
                                     type="button" 
                                     name='minus'
                                     value="-"
                                      className="minus"
                                      /><input 
                                      onChange ={this.onChange}
                                      onClick ={this.onChange}
                                      type="number" 
                                      step="1" min="1" max="" 
                                      title="Qty"
                                      name="quantity"
                                      id="quantity"
                                      value={this.state.quantity}
                                      className="input-text qty text" 
                                      
                                      size="4" pattern="" 
                                      inputMode=""/>
                                    <input 
                                    type="button" 
                                    value="+" 
                                    className="plus"
                                    onClick ={() => this.addone(this.state.quantity)}
                                    />   
                                   </div> 
    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1"  style={{color: "black"}} >Note</label>
                                    <textarea 
                                    className="form-control" 
                                    value={this.state.note}
                                    name ="note"
                                    id="note" 
                                    onChange ={this.onChange}
                                    rows="3"></textarea>
                                </div>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button 
                                variant="primary" 
                                type="submit"
                                onClick={this.handleClose}
                                >
                                    Add to Cart
                                </Button>
                                </Modal.Footer>
                                </form> 
                            </Modal>
            </React.Fragment>
        )
    }
}



ProductDetailsComp.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    ProductDetails:propTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData
});

export default connect(mapStateToProps,{  ProductDetails , addToCartServer , errorsset, notificationset})(ProductDetailsComp)
