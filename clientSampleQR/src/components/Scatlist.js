import React, { Component } from 'react'
import { connect } from 'react-redux';
import  Spinercust  from '../components/comman/spiner';
import'./css/scatlist.css';
import propTypes from 'prop-types';


import {getProduct ,getSingleProduct} from '../actions/products';

import CustomeNavbar from './CustomeNavbar';

export class Scatlist extends Component {
    constructor(props) {
        super(props);
        // this.state = { 
        //     categoryList: null,
        //     pageNumber: 1,
        // }

        //this.onClick = this.onClick.bind(this); 
    }

    getSingleProduct(Product){
        this.props.getSingleProduct(Product._id,this.props.history);
    }

    componentDidMount() {
        if(this.props.ProductData.products === null) {
            this.props.getProduct(1,2);
         }
      } 

    render() {

        let loading = this.props.ProductData.loading;
        let Products = this.props.ProductData.products;
        let ProductsContent ;

        if(Products === null || loading ){
            ProductsContent = <Spinercust />
        } else { 
            ProductsContent = Products.map((item) => { 
                return(
                    <div key={item._id}>
                    <div className="row mx-0 pt-2 text-md-center" onClick={() => this.getSingleProduct(item)}>
                    <div class="col-7 col-md-3 pl-0 pr-0">
                        <img className="pureveg-icon" src={"images/pureveg2.png"}/>
                         <h5 class="pt-1 cold-coffee">{item.ProductName}</h5>
                         <p class="coffee-price">&#8377;{item.Price}</p>
                    </div>

                    <div class="col-5 col-md-3 pl-0 pr-0">
                        <img className="coffee-img"  src={`${process.env.REACT_APP_NODE_API}${item.image}`}/>
                    </div>
                </div>

                <div class="catlist1-bor pt-3"></div>
                </div>
                )

            });
        }

        return (


                <React.Fragment>
                    <CustomeNavbar/>
                    <div className="container-fluid py-2 scategory-list">
                    <h5 className="text-center cat-cuisines1 mx-auto pb-1 mb-0 pl-4">Beverages</h5>
                        <div className="py-1 cuisines2-bor"></div>
                       {ProductsContent}
                </div>
                </React.Fragment>
        )
    }
}

Scatlist.propTypes = {
    CategoryData:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    ProductData:propTypes.object.isRequired,
    getCategory:propTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    CategoryData:state.CategoryData,
    errors:state.errors,
    ProductData:state.ProductData
});


export default connect(mapStateToProps,{getProduct,getSingleProduct})(Scatlist)


