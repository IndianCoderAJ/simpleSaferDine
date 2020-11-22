
import axios from 'axios';
import { GET_PRODUCT,GET_PRODUCTSINGLE,GET_ERRORS,PRODUCT_lOADING } from './types';

// get category 
export const getProduct = (StartPageNumber,EndPageNumber) => dispatch => {  
    dispatch(setProductLoading());
    let data = {
        StartPageNumber:StartPageNumber,
        EndPageNumber:EndPageNumber,
    }
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/getProduct`, data)
    .then(res=>{
        dispatch({
            type:GET_PRODUCT,
            payload:res.data.product
        })
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
       })
    });
}


export const setProductLoading = () => {
    return {
        type:PRODUCT_lOADING
    }
}

export const getSingleProduct = (ProductID,history) => dispatch => {  
    dispatch(setProductLoading());
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/getSingleProduct`, {ProductID})
    .then(res=>{
        dispatch({
            type:GET_PRODUCTSINGLE,
            payload:res.data.SingleProduct
        })
        history.push('/Productdetails');
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
       })
    });
}

export const getProductCategory = (StartPageNumber,EndPageNumber,categoryID,history) => dispatch => {
    dispatch(setProductLoading());
    let data = {
        StartPageNumber:StartPageNumber,
        EndPageNumber:EndPageNumber,
        categoryID:categoryID 
    }
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/getProductByCategory`, data)
    .then(res=>{
        dispatch({
            type:GET_PRODUCT,
            payload:res.data.product
        });
        history.push('/scatlist');
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
       })
    });  
}


