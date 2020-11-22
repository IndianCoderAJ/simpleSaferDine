import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// for notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

// import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Button,Modal} from 'react-bootstrap';


import '../css/menulist.css';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import  Spinercust  from '../comman/spiner';
import { getProductFromServer , ProductDetails  , addToCartServer ,errorsset , notificationset,resetStore} from '../../actions/menuActions';

export class MenuList extends Component {
    constructor(){
        super();
       this.state = {
           pager: {},
           pageOfItems: [],
           Products: null,
           show: false,
           errors:null,
           addTocartPrdouct: {},
           quantity: 1,
           note:'',
           loading:true,
           notification:null,
           currentpage:1
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

    //for quantity button
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
         }

    }

    singleProductDetails(product) {
        this.props.ProductDetails(product, this.props.history);
    }

    // for modal
	handleShow(product) {
        this.setState({ show: true,
                       addTocartPrdouct: product 
                      });
    }
    
   componentDidMount() {
    
     if(this.props.menuData.products === null) {
        this.props.getProductFromServer("all",this.props.history);
     } else {
         this.setState({
             Products:this.props.menuData.products,
             loading:this.props.menuData.loading
         })
     }

   } 

   componentWillReceiveProps(nextProps) {
        // if token get expired then go to home page
        if(nextProps.errors.isAuthenticate) {
            this.props.resetStore(this.props.history);
        }

        if(nextProps.menuData) {
            this.setState({
                Products:nextProps.menuData.products,
                loading:nextProps.menuData.loading
            })
        }
    
    if(nextProps.errors.addcartsatatus) {
        this.setState({errors:nextProps.errors}, () => {
            store.addNotification({
                title: "Danger!",
                message: this.state.errors.addcartsatatus,
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


    if(nextProps.errors.orderPlace){
        this.setState({errors:nextProps.errors.orderPlace}, () => {
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
      
        })
        this.props.errorsset();  

     } 
     if(nextProps.menuData.notification) {

        this.setState({notification:nextProps.menuData.notification}, () => {
            if(this.state.notification.productadd) {
                store.addNotification({
                    title: "Success!",
                    message: this.state.notification.productadd,
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
                  this.props.notificationset();   
            }
            if(this.state.notification.orderPlace){
                store.addNotification({
                    title: "Success!",
                    message: this.state.notification.orderPlace,
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
                  this.props.notificationset();     

            }
       

        }) 
     }
    
    
   }

    render() {
        let loading = this.state.loading;
        let products = this.state.Products;

        let menuContent ;
        if(products === null || loading ){
            menuContent = <Spinercust />
        } else {
            
            menuContent =  products.filter((data) => {
                let filterData;
             if(this.props.menuData.searchKey == null){
                  filterData = data; 
             }   
             else if(data.name.toLowerCase().includes(this.props.menuData.searchKey.toLowerCase())){
                filterData = data;
             }

             return filterData;
           }) 
            .map((item) => {
                return (
                    <div className="menulist-main" key={item._id}>
                     <img className="product-img" src= {`${this.props.auth.customer.hostname}${item.image}`}  alt="" onClick={() =>this.singleProductDetails(item)} />
                      <div className="product-inf">
                          <div className='product-info-name'>
                             <h6>{item.name}</h6>
                             <h6>Category</h6>
                          </div>
                          <div className='product-info-name'>
                           <h6 id="price-info">{item.price} ₹</h6>
                           <button type="button"  className="btn btn-success btn-add"  onClick={() => this.handleShow(item)} >Add Cart</button>
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
                                    <div class="quantity buttons_added">
                                     <input 
                                     onClick ={() => this.minusone(this.state.quantity)}
                                     type="button" 
                                     name='minus'
                                     value="-"
                                      class="minus"
                                      /><input 
                                      onChange ={this.onChange}
                                      onClick ={this.onChange}
                                      type="number" 
                                      step="1" min="1" max="" 
                                      title="Qty"
                                      name="quantity"
                                      id="quantity"
                                      value={this.state.quantity}
                                      class="input-text qty text" 
                                      
                                      size="4" pattern="" 
                                      inputmode=""/>
                                    <input 
                                    type="button" 
                                    value="+" 
                                    class="plus"
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
                   </div>
                
                );
            });
        }
        return (
           <React.Fragment>
            <ReactNotification />
              <Navbar />	
               <Searchbar /> 
                {menuContent} 	
         </React.Fragment>
        )
    }
}

MenuList.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    menuData:propTypes.object.isRequired,
    getProductFromServer:propTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData
});

export default connect(mapStateToProps,{resetStore, getProductFromServer , ProductDetails , addToCartServer , errorsset, notificationset})(MenuList)
