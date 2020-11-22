import React, { Component } from 'react'

import './css/error.css'
export class Error extends Component {
    render() {
        return (
          <React.Fragment>
              <div className="error-main">
                 <img className='error-img' src='/images/wentwrong.PNG' alt=''></img>
                  <a className="go-to-home" href='/'>Go to Home</a>
              </div>
          </React.Fragment>
        )
    }
}

export default Error
