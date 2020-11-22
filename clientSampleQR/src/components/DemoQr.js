import React, { Component } from 'react'

import './css/demoQrcode.css';
export class DemoQr extends Component {
    render() {
        return (
            <div className='image-main'>
                <img className="Qrimg"  src="/images/demoQrcode.PNG" alt="" />
            </div>
        )
    }
}

export default DemoQr
