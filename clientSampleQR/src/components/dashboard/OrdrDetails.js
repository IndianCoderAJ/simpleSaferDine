import React, { Component } from 'react'
// import Navbar from './Navbar';
import  Spinercust  from '../comman/spiner';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {resetStore} from '../../actions/menuActions';

export class OrdrDetails extends Component {
   
 
    render() {

       let { singleorder , loading } = this.props.tableData;

         let myordercontext ;
        if(singleorder  === null || loading) {
            myordercontext = <Spinercust />
        } else {
            myordercontext = singleorder.customerName;
        }
        return (
            <React.Fragment>
              {myordercontext}
            </React.Fragment>
        )
    }
}

OrdrDetails.propTypes = {
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired,
    tableData:propTypes.object.isRequired,
    menuData:propTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors,
    tableData:state.tableData,
    menuData:state.menuData

});

export default connect(mapStateToProps,{ resetStore })(OrdrDetails)

