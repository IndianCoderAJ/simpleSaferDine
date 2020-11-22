import React, { Component } from 'react'
import PropTypes from 'prop-types'
import'./css/scatform.css';


export class Scatform extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <React.Fragment>
                <div className="scatform-one">
                    
                    <div className="scatform-main">
                        <h1 className="text-center scatform-head">Fill Details</h1>
                        <form method="POST">
                            <div className="text-field1">
				                <input type="number" required />
				                <span></span>
				                <label>Tabel Number</label>
			                </div>

                            <div className="text-field1">
				                <input type="text" required />
				                <span></span>
				                <label>Name</label>
			                </div>

                            <div className="text-field1">
				                <input type="number" required />
				                <span></span>
				                <label>Mobile Number</label>
			                </div>

                            <div className="text-center">
                            <div className="btnotp1 button-o1">Submit</div>
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

export default Scatform
