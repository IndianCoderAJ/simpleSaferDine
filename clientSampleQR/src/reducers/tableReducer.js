import {CARTDETAIL_LOADING,  CARTDETAIL, UPDATECART ,UPDATEQUANTITY, SINGLEMYORDER ,SINGLEORDERLOADING} from'../actions/types';


const initialState ={ 
    cart:null,
    customerName:null,
    singleorder:null,
    TableNo:false,
    TotalCost:0,
    loading:false

};

export default function (state = initialState, action) { 
    switch(action.type) {
        case SINGLEORDERLOADING:
            return {
                ...state,
                loading:true
            }
        case SINGLEMYORDER:
            return {
                ...state,
                singleorder:action.payload,
                loading:false
            }
        case UPDATEQUANTITY: 
        return {
            ...state,
            cart:action.payload.cart,
            loading:false,
            TotalCost:action.payload.quantity
            
        }
        case CARTDETAIL:
            return {
                ...state,
                cart:action.payload.cart,
                loading:false,
                TotalCost:action.payload.TotalCost
            }
        case UPDATECART:
            return {
                ...state,
                cart:action.payload.cart,
                loading:false,
                TotalCost:action.payload.TotalCost

            }    
        case CARTDETAIL_LOADING:
            return {
                ...state,
                loading:true
            }
        default:
                return {
                    ...state
                }
        }
}