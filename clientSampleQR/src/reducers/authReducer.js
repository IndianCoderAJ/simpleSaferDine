import { GET_VERIFY,GET_CUSTOMER,GET_QRDATA,GET_CATIGORY ,CHECKOUT , CHECKOUTLOADING ,LOADINGCARTBILL,BILLCALL,SET_AUTH } from '../actions/types';

const initialState = {
    isAuthenticated:false,
    customer:null,
    QRdata:null,
    menuData: {},
    loading:null,
    bill:null
};

export default function(state =  initialState, action){
    switch(action.type){
        case SET_AUTH:
            return {
                ...state,
             customer:null,
             isAuthenticated:false
            }
        case LOADINGCARTBILL:
            return {
                loading:true
            }
        case BILLCALL:
            return {
                loading:false
            }
        case CHECKOUTLOADING: 
         return {
             ...state,
             loading:true
         }
        case CHECKOUT:
            return {
               ...state,
               loading:false,
               bill:action.payload
            }
        case GET_CATIGORY:
            return {
                ...state,
                menuData:action.payload
            }
        case GET_QRDATA:
            return {
             ...state,
             QRdata:action.payload
            }
        case GET_VERIFY:
            return {
             ...state,
             customer:action.payload,
             isAuthenticated:true
            }
        case GET_CUSTOMER:
            const { customer } = action.payload;
            return {
                ...state,
                customer:customer
            }    
        default: {
            return {
            ...state
            }   
        }
    }

}