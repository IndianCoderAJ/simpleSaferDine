import { GET_ERRORS ,ERRORNULL,RESET_STORE} from "../actions/types";

const initialState = null;

export default function(state =  initialState, action){
    switch(action.type){
        case RESET_STORE:
            return action.payload
        case ERRORNULL:
             return action.payload
        case GET_ERRORS:
          return action.payload
        default: {
            return {
            ...state
            }   
        }
    }

}