import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {searchKeyword} from '../../actions/menuActions';
import '../css/navbar.css';

export class Searchbar extends Component {
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
                <form className="search-bar-home">
                    <input  name="Find-Menu" type="text"  onChange={(e)=>this.searchSpace(e)} placeholder="Find-Menu..."/>   
                </form>
           </React.Fragment>
        )
    }
}

Searchbar.propTypes = {
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

export default  connect(mapStateToProps,{ searchKeyword })(Searchbar);
