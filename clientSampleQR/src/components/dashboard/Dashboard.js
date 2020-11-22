import React, { Component } from 'react'
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


import { getCategory } from '../../actions/menuActions';
import { getProductFromServer ,resetStore} from '../../actions/menuActions';
import  Spinercust  from '../comman/spiner';

import '../css/dashboard.css'
class Dashboard extends Component {
     constructor(props) {
        super(props);
        this.state = {
            errors:{},
            categories:null,
            success: {},
            defaultCatID:"all"
        };
        this.getproducts = this.getproducts.bind(this);
     } 
     

     getproducts(id) {
        this.props.getProductFromServer(id,this.props.history);
     }
//    get category ajax call
    componentDidMount() {
        this.props.getCategory();
    }
   
    componentWillReceiveProps(nextProps) {
        if(nextProps.menuData.categories) {
            this.setState({
                categories:nextProps.menuData.categories
            })
        }
         // if token get expired then go to home page
         if(nextProps.errors.isAuthenticate) {
            this.props.resetStore(this.props.history);
        }
    }
    render() {

      let loading  = this.state.loading;
      let dashboardContent ;
      let categories = this.state.categories;
      if(categories === null || loading ) {
          dashboardContent =  <Spinercust />
          return (
              <div style={ {margin :"50%"}}>
                {dashboardContent}    
               </div>
          )
      } else {
           dashboardContent = categories.filter((data)=>{
            let filterData;
            if(this.props.menuData.searchKey == null) {
              filterData =  data;
            }
            else if(data.name.toLowerCase().includes(this.props.menuData.searchKey.toLowerCase())){
                filterData =  data;
            }
            return filterData;
          })
            .map((item) => {
                        return (
                            <div className='main-product-container' onClick={() => this.getproducts(item._id)} key = {item._id} >
                               <img className="img-category"  src = {`${this.props.auth.customer.hostname}${item.image}`}  alt=""/>
                               <div className="img-text">
                                    <h6>{item.name}</h6>
                                </div>
                                </div>
                           
                          
                        );
                    });
    
           }
     
        return (
            <React.Fragment>
                <Navbar />
                <Searchbar />
                <h5 className="msg-category">Select the Category</h5>
               <div className="full-category" >
               {dashboardContent}
               </div> 
               
                {/* <section className="login_register">			
                    <div className="container">					
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 col-12">
                                <h1>Select Category</h1>
                                <div className="b-recipes">
                                    <div className="row">			
                                        <div className="col-lg-12 col-md-12 col-12">
                                                <div className="login-form1">   
                                                {dashboardContent}                                
                                        </div>
                                    </div>
                                    </div>						
                                </div>
                                						
                            </div>				
                        </div>			
                    </div>
                    <div className="b-recipes" style={{ textAlign:"center"}}>
                    <button  type="button" onClick={() => this.getproducts(this.state.defaultCatID)} className="find-recipe-btn btn-link" >
                          
                           See All
                     </button>
                    </div>
                </section> */}
                   
               
                   </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    auth:propTypes.object.isRequired,
    menuData:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    getCategory:propTypes.func.isRequired,
}
 
const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors,
    menuData:state.menuData
   });

export default connect(mapStateToProps,{ getCategory , getProductFromServer,resetStore})(Dashboard);