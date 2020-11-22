import React, { Component } from 'react'

export default class SingleProduct extends Component {
     constructor(){
         super();
     }
    render() {
            const {name,id,description,price,image,vag_VS_non } = this.props.location.product          
        return (
            <div>
                {name}
            </div>
        )
    }
}
