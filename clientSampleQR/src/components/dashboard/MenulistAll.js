import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactNotification from 'react-notifications-component'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Button,Modal} from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import Navbar from './Navbar';
import  Spinercust  from '../comman/spiner';
import { getProductFromServer } from '../../actions/menuActions';

export class MenuListAll extends Component {
    constructor(){
        super();
       this.state = {
           Products: {},
           show: false,
           addTocartPrdouct: {},
           quantity: '',
           note:'',
       }

       this.handleShow = this.handleShow.bind(this);
       this.handleClose = this.handleClose.bind(this); 
       this.onSubmit = this.onSubmit.bind(this); 
       this.onChange = this.onChange.bind(this);
       this.singleProductDetails = this.singleProductDetails.bind(this);   
    }
   
    handleClose() {
      
		this.setState({ show: false });
    }
    
    onChange(e) {
        this.setState({[e.target.name]:e.target.value }); 
    }
   

// for add to cart
    onSubmit(e) {
        e.preventDefault();
         if(this.state.quantity == '') {
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
                
            let addtocartproductdetails = {
                product:this.state.addTocartPrdouct,
                quantity:this.state.quantity,
                note:this.state.note
            }
         console.log(addtocartproductdetails);
         this.setState({
             quantity:'',
             note:''
         });
         }

    }

    singleProductDetails(product) {
        this.props.history.push({
            pathname : '/singleProduct',
            product:product
            } 
          );
    }

    // for modal
	handleShow(product) {
        this.setState({ show: true,
                       addTocartPrdouct: product 
                      });
    }
    
   componentDidMount() {
      this.props.getProductFromServerAll();
   } 

    render() {
        const  { products , loading } = this.props.menuData;
        let menuContent ;
        if(products === null || loading ){
            menuContent = <Spinercust />
        } else {
            
            menuContent =products.map((item) => {
                return (
           <div className="b-recipes" key={item._id}>
   <div className="row">			
      <div className="col-lg-12 col-md-12 col-12">
            <div className="login-form1">

                <div className="food-border">
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6">
                    <div className="recipe-item1"  >
                        <img src="images/homepage/recipes/recipe_02.jpg" alt="" onClick={() =>this.singleProductDetails(item)} />

                        <div className="overlay">
                        <div className="recipes-title">	
                            <h6>{item.name}</h6>
                        </div>
                        </div>
                        <div className="overlay1">
                        <div className="recipes-title">	
                        <h6>{item.price} ₹</h6>
                        </div>
                        </div>

                        <div className="overlay1">
                            <button type="button"   onClick={() => this.handleShow(item)} className="cart-add  btn-link1">Add Cart</button>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                            <form onSubmit = {this.onSubmit} >  
                                <Modal.Header closeButton>
                                <Modal.Title>{this.state.addTocartPrdouct.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                               
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" style={{color: "black"}}>Quantity</label>
                                    <input 
                                    type="number" 

                                    value={this.state.quantity}
                                    className="form-control" 
                                    name="quantity"
                                    id="quantity"
                                    onChange ={this.onChange} 
                                    placeholder=" "/>
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
                         {menuContent} 
                         <div className="pagination">
                            <a href="#">&laquo;</a>
                                <a href="#">1</a>
                                <a className="active" href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                                <a href="#">5</a>
                                <a href="#">6</a>
                                <a href="#">&raquo;</a>
                            </div>	
         </React.Fragment>
        )
    }
}

MenuListAll.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    getProductFromServer:propTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData
});

export default connect(mapStateToProps,{ getProductFromServer })(MenuListAll)
