import { GET_CATIGORY, CATEGORY_LOADING, PRODUCT_LOADING, GET_PRODUCT,
          PRODUCTDETAIL_LOADING, GET_PRODUCTDETAILS ,SEARCHBAR ,ADDTOCART ,
           PLACEORDER, MYORDER ,ORDER_lOADING,NOTIFICATIONSET } from '../actions/types';

const initialState ={ 
    categories:null,
    products:null,
    loading:false,
    myorder:null,
    product:null,
    notification:{},
    finalCost:null,
    searchKey:null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case NOTIFICATIONSET:
            return {
                ...state,
                notification:{}
            }   
        case ORDER_lOADING:
            return {
                ...state,
                loading:true
            }
        case MYORDER:
            return {
                ...state,
               myorder:action.payload.myorder,
               finalCost:action.payload.finalCost,
               loading:false
            }
        case PLACEORDER:
            return {
                ...state,
                notification:action.payload
            }
        case ADDTOCART:
            return {
                ...state,
                notification:action.payload
            }
        case SEARCHBAR:
            return {
              ...state,
              searchKey:action.payload
            }
        case PRODUCTDETAIL_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_PRODUCTDETAILS:
            return {
                ...state,
                product:action.payload,
                loading:false
            }
        case PRODUCT_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_PRODUCT:
            return {
                ...state,
                products:action.payload,
                loading:false
            }
        case GET_CATIGORY:
            return {
                ...state,
                categories:action.payload,
                loading:false
            }
        case CATEGORY_LOADING:
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