import React, { Component } from 'react'
import PropTypes from 'prop-types'
import'./css/cform.css';
export class Cform extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <React.Fragment>
                <div className="cform-one">
                    <div className="cform-main">
                        
                        <h1 className="text-center cform-head">Fill Details</h1>
                            <form method="POST">
                            <div className="text-field">
				                <input type="text" required />
				                <span></span>
				                <label>Username</label>
			                </div>

                            <div className="text-field">
				                <input type="text" required />
				                <span></span>
				                <label>Mobile Number</label>
			                </div>
				            
                            <div className="text-center">
                            <div className="btnotp button-o">Send otp</div>
			                    {/* <input type="submit" value="Send otp" className="submit" /> */}
		                    </div>
				                    
                            </form>
                        </div>
                        </div>
                    
                </React.Fragment>
            </div>
        )
    }
}

export default Cform
