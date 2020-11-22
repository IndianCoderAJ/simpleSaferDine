import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import  Spinercust  from '../comman/spiner';
import {getBillserver} from '../../actions/menuActions';

export class Thankyou extends Component {
    // constructor() {
    //     super();

    // }

    createAndDownloadPdf = () => {
        let tempData = {
            name:"akshay",
            age:"20"
        }
        this.props.getBillserver(tempData);

      }
    render() {
        const { loading } = this.props.auth;
        let ThankyouContext;
        if(loading) {
            ThankyouContext = <Spinercust/>
        } else {
            return (
                <React.Fragment>
                    <h1 style={{textAlign:"center",margin:"20%",color:"red"}}>Thanks Your  Visiting.</h1>
                    <button 
                    type="button"
                    onClick={this.createAndDownloadPdf}
                    className="login-btn btn-link">Get Bill</button> 
                </React.Fragment>
            )

        }
        // const ref = React.createRef();
        return (
            <React.Fragment>
             {ThankyouContext}
            </React.Fragment>
        )
    }
}

Thankyou.propTypes = {
    auth:propTypes.object.isRequired,
    menuData:propTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth:state.auth,
    menuData:state.menuData
});

export default connect(mapStateToProps,{ getBillserver })(Thankyou)
