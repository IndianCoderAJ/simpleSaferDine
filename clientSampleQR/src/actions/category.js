
import axios from 'axios';
import {GET_CATEGORY,GET_ERRORS,CATEGORY_lOADING} from './types';

// get category 
export const getCategory = (StartPageNumber,EndPageNumber) => dispatch => {  
    dispatch(setCategotyLoading());
    let data = {
        StartPageNumber:StartPageNumber,
        EndPageNumber:EndPageNumber 
    }
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/getCategory`, data)
    .then(res=>{
        dispatch({
            type:GET_CATEGORY,
            payload:res.data.category
        })
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
       })
    });
}


export const setCategotyLoading =() => {
    return {
        type:CATEGORY_lOADING
    }
}

