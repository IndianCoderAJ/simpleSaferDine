import axios from 'axios';
import { GET_CATIGORY, CATEGORY_LOADING, GET_PRODUCT, PRODUCT_LOADING, 
         PRODUCTDETAIL_LOADING, GET_PRODUCTDETAILS ,CARTDETAIL_LOADING ,GET_ERRORS,CARTDETAIL,
          UPDATECART ,SEARCHBAR ,UPDATEQUANTITY, ADDTOCART ,PLACEORDER , MYORDER , ORDER_lOADING ,SINGLEMYORDER 
          ,SINGLEORDERLOADING ,CHECKOUT ,CHECKOUTLOADING ,LOADINGCARTBILL,BILLCALL ,ERRORNULL,NOTIFICATIONSET ,RESET_STORE} from './types';

//   notification set
export const notificationset =( ) => dispatch =>{
    dispatch({
        type:NOTIFICATIONSET
    })
}
//   errorset
export const errorsset = ( ) => dispatch => {
        dispatch({
            type:ERRORNULL,
            payload:{}
        })
}


// reset the store
export const resetStore = ( history) => dispatch => {
    localStorage.removeItem('authtoken');  
  dispatch({
      type:RESET_STORE,
      payload:{}
  })

  history.push('/errorpage');
}
//   getbillpdf
export const getBillserver = (billdata) => dispatch => {
    dispatch(loadingbillpdf());
    axios.post(`${process.env.REACT_APP_NODE_API}/customer/create-pdf`,billdata)
      .then(() => axios.get('/customer/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        dispatch({
            type:BILLCALL
        })  
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
}

// get order
export const getOrderDetails = (customer) => dispatch => {
    dispatch(setOrderLoading());
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/myorder`, customer)
    .then(res => {
       dispatch({
           type:MYORDER,
           payload:res.data.data
       })
    })
    
}

// chekout server
export const CheckoutServer = ( customer ,history) => dispatch => {
  dispatch(CheckoutServerloading());
  axios
   .post(`${process.env.REACT_APP_NODE_API}/customer/checkout`, customer)
   .then( res => {  
       localStorage.removeItem('authtoken');  
    dispatch({
        type:CHECKOUT,
        payload:res.data.result
    })

   history.push('/logout'); 
 })
 .catch(err =>{ 
    dispatch({
        type:GET_ERRORS,
        payload: err.response.data.errors
    })});
 
}

// mysigleOrderget
export const setSingleOrder = (mysingleOrder,history) => dispatch => {
    dispatch(setMysingleOrder());
    dispatch({
        type:SINGLEMYORDER,
        payload:mysingleOrder
    })
    history.push('/orderdetails');
}
// placr Order
export const placeOrderServer = (cart, customer,history,TotalCost) => dispatch => {
    let data = { cart,customer,TotalCost};
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/order`, data)
    .then(res => {
       dispatch({
           type:PLACEORDER,
           payload:res.data.notification
       })
       history.push('/menulist')  
    })
    .catch(err =>{ 
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data.errors
        })});

}

// addtocart
export const addToCartServer = (cart ,customer) => dispatch => {
    let data = { cart,customer};
    axios
    .post(`${process.env.REACT_APP_NODE_API}/customer/addcart`, data)
    .then(res => {
       dispatch({
           type:ADDTOCART,
           payload:res.data.notification
       })
    })
    .catch(err =>{ 
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data.errors
        })});


}
// seachBar 
export const searchKeyword = ( keyword) => dispatch => { 
    dispatch({
        type:SEARCHBAR,
        payload:keyword
    })
  };

// get category
export const getCategory = ( ) => dispatch => { 
  dispatch(setCategoryLoading());
  console.log("hiit");
  axios
   .get(`${process.env.REACT_APP_NODE_API}/customer/category`)
   .then(res => {
       dispatch({
           type:GET_CATIGORY,
           payload:res.data.category
       })
   })
   .catch(err => {

       dispatch({
        type:GET_ERRORS,
        payload: err.response.data.errors
       })
   });

};


// update cart quentity
export const updateQuantity = (cart,quantity) => dispatch => {

    let data = {cart,quantity};
    dispatch({
        type:UPDATEQUANTITY,
        payload:data
    })
}

// // update cart
export const updateCart = (cart,TotalCost) => dispatch => { 
let data = {cart,TotalCost};
  dispatch({
      type:UPDATECART,
      payload:data 
  })  

  };



// get Products for category 
 export const getProductFromServer = (caregory_ID,history) => dispatch => {
    dispatch(setProductLoading());
    axios
     .get(`${process.env.REACT_APP_NODE_API}/customer/productList/${caregory_ID}`)
     .then(res => {
         dispatch({
             type:GET_PRODUCT,
             payload:res.data.productlist
         })
         history.push('/menulist') 
     })
     .catch(err  => {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data.errors
       })

     });   
 }

 
//  get Cart
export const getcartServer = (tableNumber ) => dispatch => {
    dispatch(setCartLoading());
   axios
    .get(`${process.env.REACT_APP_NODE_API}/customer/cart/${tableNumber}`)
    .then(res => {
        dispatch({
            type:CARTDETAIL,
            payload:res.data
        })

    })
    .catch(err => {
 
    });

}

// get single ProductDetails
export const ProductDetails = (product , history) => dispatch => {
        dispatch({
            type:GET_PRODUCTDETAILS,
            payload:product
        })
        history.push('/product');  

}


// set ProductDetail Loader
export const setProductDeatilLoading = ( ) => {
    return {
        type:PRODUCTDETAIL_LOADING
    }
}

export const setCartLoading = ( ) => {
    return {
        type:CARTDETAIL_LOADING
    }
}


// product loading
export const setProductLoading = ( ) => {
    return {
        type:PRODUCT_LOADING
    }
};

export const setOrderLoading =() => {
    return {
        type:ORDER_lOADING
    }
}
// catgegory loading
export const setCategoryLoading = () => {
    return {
        type:CATEGORY_LOADING
    }
}

// loading MySingle Order
export const setMysingleOrder = () => {
  return {
      type:SINGLEORDERLOADING
  }
}

// checkout loading
export const CheckoutServerloading = ( ) => {
    return {
        type:CHECKOUTLOADING
    }
}

// loading billpdf
export const loadingbillpdf = ( ) => {
    return {
        type:LOADINGCARTBILL
    }
}