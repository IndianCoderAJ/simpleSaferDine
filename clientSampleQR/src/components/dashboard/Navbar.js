import React, { Component } from 'react'

import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {searchKeyword} from '../../actions/menuActions';
import '../css/navbar.css';



 class Navbar extends Component {
        constructor() {
                super();
                this.state={
                        search:null
                      };

                this.searchSpace = this.searchSpace.bind(this);
        } 
    
        searchSpace(e) {
                let keyword = e.target.value;
               this.props.searchKeyword(keyword);
        }
    render() {
        return (
            <React.Fragment> 
                    <div className="main-nav-conatiner">
                        <nav className="navbar navbar-expand-lg nav-color navbar-light ">
                          <img  src="/images/saferDinelogo.PNG"  className="navbar-brand navbar-logo" alt='' />
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                <li className="nav-item">
                                            <a className="nav-link" href="/dashboard">Home </a>
                                    </li>
                                    <li className="nav-item">
                                            <a className="nav-link" href="/menulist">All Products</a>
                                    </li>
                                    <li className="nav-item">
                                            <a className="nav-link" href="/cart">Cart</a>
                                    </li>
                                    <li className="nav-item">
                                            <a className="nav-link" href="/MyOrder">MyOrder</a>
                                    </li>
                                    <li className="nav-item">
                                            <a className="nav-link" href="/MyOrder">Check Out</a>
                                    </li>
                                    <li className="nav-item">
                                            <a className="nav-link" href="/ShareOtp">Share Menu</a>
                                    </li>
                                </ul>
                                </div>
                         </nav>
                         
                         </div>
            </React.Fragment> 
        )
    }
}

Navbar.propTypes = {
        auth:propTypes.object.isRequired,
        menuData:propTypes.object.isRequired,
        errors:propTypes.object.isRequired,
        searchKeyword:propTypes.func.isRequired,
    }
     
    const mapStateToProps = (state) => ({
        auth:state.auth,
        errors:state.errors,
        menuData:state.menuData
       });

export default connect(mapStateToProps,{ searchKeyword })(Navbar);
