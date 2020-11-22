import React, { Component } from 'react'
import propTypes from 'prop-types';
import  Spinercust  from '../components/comman/spiner';
import { connect } from 'react-redux';
import'./css/simpledescp.css';

import CustomeNavbar from './CustomeNavbar';

export class SimpleDescp extends Component {
    static propTypes = {

    }

    render() {
        let product = this.props.ProductData.singleProduct[0];
        return (
            <div>
                <React.Fragment>
                    <CustomeNavbar />
                    <div className="mob-descp">
                    <div className="container-fluid py-2 simple-descp">
                    {/* <h5 className="text-center  mx-auto pb-1 mb-0 pl-4">Beverages</h5> */}
                        {/* <div className="py-1 cuisines2-bor"></div> */}
                    </div>

                    <div className="descp-img">
                    <img className="descp1-img text-center" src={`${process.env.REACT_APP_NODE_API}${product.image}`}/>
                    <div className="pl-3 pr-3 pt-3">
                        <h5 className="pb-3 mb-0 descp-name">
                            {product.ProductName}
        <span className="float-right">&#x20B9;{product.Price}</span>
                        </h5>
                        <div className="row mx-0">
                            <div className="col-6 pl-0">
                            <p className="mb-0 pb-3"><i className="far fa-clock detail-clock"></i>15-20min</p>
                            </div>

                            <div className="">
                            
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            </div>
                        </div>
                       
                        <p className="mb-0 pb-1 desc-details">Details:</p>
                        <p className="mx-auto mb-0 pb-3 descp-details">
                         {product.Description}.
                        </p>
                        <h5 className="pb-1 mb-0 details-incer">Ingredients</h5>
        <p className="mx-auto decsp-inger">{product.Description}</p>
                
                      
                        
                    </div>
                    </div>
                    </div>

                    <div className="win-descp">
                    <div className="container-fluid py-2 simple-descp">
                    <h5 className="text-center nav-posn1  mx-auto pb-1 mb-0 pl-4">Beverages</h5>
                        <div className="py-1 cuisines2-bor"></div>
                    </div>
                        <div className="row mx-0">
                            <div className="col-4">

                            </div>

                            <div className="col-4">
                                <div className="descp-img">
                                <img className="descp1-img text-center" src={"images/sandwiches/main.jpg"}/>
                                 <div className="pl-3 pr-3 pt-3">
                                    <h5 className="pb-4 mb-0 descp-name">
                                    Veg Sandwich
                                        <span className="float-right">&#x20B9;80</span>
                                    </h5>
                                  <div className="row mx-0">
                            <div className="col-6 pl-0">
                            <p className="mb-0 descp-clock pb-3"><i className="far fa-clock detail-clock"></i>15-20min</p>
                            </div>

                            <div className=""><i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            <i className="fas fa-star desc-star"></i>
                            </div>
                        </div>
                                    <p className="mb-0 pb-1 desc-details">Details:</p>
                                    <p className="mx-auto mb-0 pb-4 descp-details">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </p>
                                </div>
                                <h5 className="pb-1 mb-0 pl-3 details-incer">Ingredients</h5>
                        <p className="mx-auto pl-3 decsp-inger">bread , cheese , tamatoes , onions , cucumbers, olives , tamatoes , onions , cucumbers , olives</p>

                       
                    </div>
                                
                    </div>

                        <div className="col-4">
                                
                        </div>
                        </div>
                    </div>
                </React.Fragment>
                
            </div>
        )
    }
}

SimpleDescp.propTypes = {
    CategoryData:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    ProductData:propTypes.object.isRequired,
  //  getCategory:propTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
    CategoryData:state.CategoryData,
    errors:state.errors,
    ProductData:state.ProductData
});

export default connect(mapStateToProps,{})(SimpleDescp)
