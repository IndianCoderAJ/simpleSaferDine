import {GET_CATEGORY,CATEGORY_lOADING} from "../actions/types";

const initialState = {
    categories:null,
    loading:false
}

export default function(state =  initialState, action){
    switch(action.type){
        case GET_CATEGORY:
            return {
                categories: action.payload,
                loading:false
            }
        case CATEGORY_lOADING:
             return {
                loading:true,
                ...state
             }
        default: {
            return {
            ...state
            }   
        }
    }

}
