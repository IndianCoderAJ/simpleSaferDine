import React, { Component } from 'react'
import PropTypes from 'prop-types'
import'./css/scanqr.css';
export class Scanqr extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                 <React.Fragment>
                 <div className="container-fluid pl-0 pr-0 scan-main">
		            <div className="scan-over">
		                <div className="d-flex justify-content-center align-items-center text-center scan-height">
		                    <div className="scan-box d-flex justify-content-center align-items-center">
			                    <div>
			                        <h1 className="pb-2 scan-menu">Menu</h1>
			                        <p className="mx-auto pb-2 scan-text">For a contactless menu, Scan the QR code</p>
			                        <div className="text-center mx-auto scan-code "> 
			                    </div>
		                    </div>
		                </div>
		            </div>
	            </div>
	        </div>

                 </React.Fragment>
                
            </div>
        )
    }
}

export default Scanqr
