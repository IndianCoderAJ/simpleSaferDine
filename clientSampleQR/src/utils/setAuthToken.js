import axios from 'axios';

const setAuthToken = token => {
    if(token){
        // apply to ech req
        axios.defaults.headers.common['authtoken'] = token;
    } else {
        // delete auth hearder
        delete axios.defaults.headers.common['authtoken'];
    }
}

export default setAuthToken;