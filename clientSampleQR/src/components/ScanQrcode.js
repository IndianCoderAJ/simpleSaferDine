import React, { Component } from 'react'
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types';
import bellAudio from '../myaudio/beep-06.mp3'
import UIfx from 'uifx'
import ReactNotification from 'react-notifications-component'



import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import { getDetails } from '../actions/authActions';

 class ScanQrcode extends Component {
    constructor(props){
        super(props)
        this.state = {
            QRdata: 'No result',
            errors:{},
            auth:''
          }

        this.handleScan = this.handleScan.bind(this)
      }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }   
       

    handleScan(data){
        this.setState({
           QRdata: data,
        })

        let QRdata = data
        if(QRdata !== null){
            const bell = new UIfx(
                bellAudio,
                {
                volume: 0.4, 
                throttleMs: 100
                }
               )  
            bell.play(); 
            this.props.getDetails(QRdata,this.props.history); 
        } 
    }

    handleError(err){
        console.error(err)
    } 
   
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.QRcode) {
          this.setState({
              errors:nextProps.errors,
              auth:nextProps.auth
            }, () => { 
                store.addNotification({
                title: "Error!",
                message: this.state.errors.QRcode,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
              })});
        }

    }

    render() {
        
            return (
                <React.Fragment>  
                    <ReactNotification /> 
                <div className="main-container">
                    <div>
                       <img  className="front-logo" src="/images/saferDinelogo.PNG" alt="" />
                        <h1 className="headings">Scan QR menu Here</h1>
                    </div>
               </div>  
               <div className="QRreaderclass"> 
                      <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        /> 
                        
                <p> <a href="/demo">Click here For Demo QR code</a></p>
                </div>
                </React.Fragment>
            )
    }
}
ScanQrcode.propTypes = {
    
    getDetails:propTypes.func.isRequired,
    auth:propTypes.object.isRequired

} 

const mapStateToProps = (state) => ({
    errors:state.errors,
    auth: state.auth
   });

export default connect(mapStateToProps,{ getDetails })(withRouter(ScanQrcode));