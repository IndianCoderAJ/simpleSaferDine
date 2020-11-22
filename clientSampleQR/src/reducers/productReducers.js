import {GET_PRODUCT,PRODUCT_lOADING,GET_PRODUCTSINGLE} from "../actions/types";

const initialState = {
    products:null,
    singleProduct:null,
    loading:false
}

export default function(state =  initialState, action){
    switch(action.type){
        case GET_PRODUCT:
            return {
                ...state,
                products: action.payload,
                loading:false,
            }
        case PRODUCT_lOADING:
             return {
                ...state,
                loading:true,
               
             }


        case GET_PRODUCTSINGLE:
            return {
                ...state,
            singleProduct: action.payload, 
            loading:false
            }  
               
        default: {
            return {
            ...state
            }   
        }
    }

}
