import React, { Component } from 'react'
import propTypes from 'prop-types';
import  Spinercust  from '../components/comman/spiner';
import'./css/scategory.css';
import { connect } from 'react-redux';

import CustomeNavbar from './CustomeNavbar';

import {getCategory } from '../actions/category';
import {getProductCategory} from '../actions/products';

export class Scategory extends Component {
    constructor(props) {
        super(props);
      // this.onClick = this.onClick.bind(this); 
    }

    componentDidMount() {
        this.props.getCategory(1,2);
      } 

      getProductDetailsByCategory(category){
          console.log(category._id);
        this.props.getProductCategory(1,3,category._id,this.props.history);
      }  

    render() {
        let loading = this.props.CategoryData.loading;
        let categories = this.props.CategoryData.categories;
        let categoryContent ;

        if(categories === null || loading ){
            categoryContent = <Spinercust />
        } else { 
            categoryContent = categories.map((item) => { 
                return(
                    <div key={item._id}  onClick={() => this.getProductDetailsByCategory(item)} className="col-6 col-md-3 pb-4">
                        <div className="card bg-white text-white border-0 card-category">
                            <img className="scat1-img" src={`${process.env.REACT_APP_NODE_API}${item.image}`}/>
                            <div className="card-img-overlay cat-over">
                             <h5 className="card-title cat-text">{item.categoryName}</h5>
                            </div>
                        </div>
                </div>
                )

            });
        }
        return (
                <React.Fragment>
                    <CustomeNavbar/>
                <div className="container-fluid pt-1 scategory">
                    <div className="cat-cusinerel">
                        <h5 className="cat-cuisines mx-auto pb-1">Cuisines</h5>
                    </div>
                    
                    <div className="py-1 cuisines-bor"></div>
                        <div className="mx-auto cat-widthsome">
                        <div className="row mx-0 pt-2">
                            {categoryContent}
                        </div>  
                        </div>
                </div>
                </React.Fragment>
        )
    }
}

Scategory.propTypes = {
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


export default connect(mapStateToProps,{getCategory,getProductCategory})(Scategory)

