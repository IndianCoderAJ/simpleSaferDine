import { GET_ERRORS,GET_VERIFY,GET_CUSTOMER,GET_QRDATA } from "./types";

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';


export const registerCustomer = (customerData,history) =>  dispatch => {
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/home`,customerData)
    .then(res => { 
       dispatch({
           type:GET_CUSTOMER,
           payload:res.data
       });
       history.push('/verification')
    })
    .catch(err => 
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data.errors
        }));
};


// verification OTP
export const getVerification = (pinData,history) => dispatch => {
    axios
     .post(`${process.env.REACT_APP_NODE_API}/customer/verification`,pinData)
     .then(res => {
        // save to ls
        const { token} = res.data;
        // set tokent to ls
        localStorage.setItem('authtoken', token);
        // set to auth header
        setAuthToken(token);
        // decode token
        const decode = jwt_decode(token);
        //set current user
        dispatch(setCurrentCustomerbylogin(decode));
        history.push('/dashboard');    
     })
     .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data.errors
        })
     });
      
};

// scanData
export const getDetails = (QRcode,history) => dispatch => {
   let  QRData ={QRData:QRcode};
   console.log(QRData);
  axios
     .post(`${process.env.REACT_APP_NODE_API}/customer/QRData`,QRData)
     .then(res => {
         dispatch({
             type:GET_QRDATA,
             payload:res.data.QRData
         });
         history.push('/details');
     })
     .catch(err => {
         dispatch({
            type:GET_ERRORS,
            payload:err.response.data.errors
         })
     });

};


// set current user
export const  setCurrentCustomer = (decode)  => {
            return {
                type:GET_VERIFY,
                payload: decode
            }
}


export const   setCurrentCustomerbylogin = (decode)  => {
    return {
        type:GET_VERIFY,
        payload: decode
    }
}
