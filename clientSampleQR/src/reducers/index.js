import { combineReducers } from 'redux'
import categoryReducer from './categorieReducer';
import errorReducer from './errorReducer';
import ProductReducer  from './productReducers';


export default combineReducers({
    errors:errorReducer,
    CategoryData:categoryReducer,
    ProductData:ProductReducer
});